"use client"

import { useEffect, useRef, useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Copy, Check, Maximize2, Minimize2, ExternalLink } from "lucide-react"
import { cn } from "@/lib/utils"
import { useTheme } from "next-themes"
import Link from "next/link"

interface Props {
  value: string
  onChange: (value: string) => void
  height?: string
  templateId?: string
  showFullscreenButton?: boolean
}

export default function AdvancedEditor({ value, onChange, height = "400px", templateId, showFullscreenButton = true }: Props) {
  const { theme } = useTheme()
  const [copied, setCopied] = useState(false)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [editorView, setEditorView] = useState<any>(null)
  const [themeCompartment, setThemeCompartment] = useState<any>(null)
  const editorRef = useRef<HTMLDivElement>(null)
  const isInitializedRef = useRef(false)

  useEffect(() => {
    // Prevenir múltiples inicializaciones
    if (isInitializedRef.current || !editorRef.current) return

    let view: any = null

    const initializeEditor = async () => {
      try {
        const { EditorView, basicSetup } = await import("codemirror")
        const { html } = await import("@codemirror/lang-html")
        const { oneDark } = await import("@codemirror/theme-one-dark")
        const { EditorState, Compartment } = await import("@codemirror/state")

        // Verificar que el contenedor esté disponible y vacío
        if (!editorRef.current) return

        // Limpiar cualquier contenido previo
        editorRef.current.innerHTML = ""

        // Crear compartimento para el tema
        const themeComp = new Compartment()
        setThemeCompartment(themeComp)

        const extensions = [
          basicSetup,
          html(),
          EditorView.theme({
            "&": {
              fontSize: "14px",
              fontFamily: "ui-monospace, SFMono-Regular, 'SF Mono', Consolas, 'Liberation Mono', Menlo, monospace",
            },
            ".cm-content": {
              padding: "16px",
              minHeight: height,
            },
            ".cm-focused": {
              outline: "none",
            },
            ".cm-editor": {
              borderRadius: "0 0 8px 8px",
            },
            ".cm-scroller": {
              fontFamily: "inherit",
            },
          }),
          EditorView.updateListener.of((update) => {
            if (update.docChanged) {
              onChange(update.state.doc.toString())
            }
          }),
          themeComp.of(theme === "dark" ? oneDark : []),
        ]

        const state = EditorState.create({
          doc: value,
          extensions,
        })

        view = new EditorView({
          state,
          parent: editorRef.current,
        })

        setEditorView(view)
        isInitializedRef.current = true
      } catch (error) {
        console.error("Error initializing CodeMirror:", error)
      }
    }

    initializeEditor()

    return () => {
      if (view) {
        view.destroy()
        view = null
      }
      isInitializedRef.current = false
      setEditorView(null)
      setThemeCompartment(null)
    }
  }, []) // Solo ejecutar una vez al montar

  // Efecto separado para actualizar el tema
  useEffect(() => {
    if (!editorView || !themeCompartment || !isInitializedRef.current) return

    const updateTheme = async () => {
      try {
        const { oneDark } = await import("@codemirror/theme-one-dark")

        // Reconfigurar el tema usando el compartimento
        editorView.dispatch({
          effects: themeCompartment.reconfigure(theme === "dark" ? oneDark : []),
        })
      } catch (error) {
        console.error("Error updating theme:", error)
      }
    }

    updateTheme()
  }, [theme, editorView, themeCompartment])

  // Efecto separado para actualizar el contenido
  useEffect(() => {
    if (!editorView) return

    const currentContent = editorView.state.doc.toString()
    if (value !== currentContent) {
      const transaction = editorView.state.update({
        changes: {
          from: 0,
          to: editorView.state.doc.length,
          insert: value,
        },
      })
      editorView.dispatch(transaction)
    }
  }, [value, editorView])

  const copyToClipboard = () => {
    navigator.clipboard.writeText(value)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen)
  }

  return (
    <Card
      className={cn("border rounded-md overflow-hidden h-full pt-0", isFullscreen && "fixed inset-0 z-50 bg-background")}
    >
      <div className="flex items-center justify-between bg-muted/40 px-4 py-2 border-b">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
          <span className="ml-2 text-sm font-medium">HTML Editor</span>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={copyToClipboard}
            className={cn("text-xs flex items-center gap-1 h-8 px-2", copied && "text-green-500")}
          >
            {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
            {copied ? "Copied!" : "Copy"}
          </Button>

          {templateId && showFullscreenButton && (
            <Button variant="ghost" size="sm" asChild className="text-xs flex items-center gap-1 h-8 px-2">
              <Link href={`/dashboard/templates/${templateId}/html`} target="_blank">
                <ExternalLink className="h-3.5 w-3.5" />
                Fullscreen
              </Link>
            </Button>
          )}

          <Button
            variant="ghost"
            size="sm"
            onClick={toggleFullscreen}
            className="text-xs flex items-center gap-1 h-8 px-2"
          >
            {isFullscreen ? <Minimize2 className="h-3.5 w-3.5" /> : <Maximize2 className="h-3.5 w-3.5" />}
            {isFullscreen ? "Exit" : "Expand"}
          </Button>
        </div>
      </div>

      <div ref={editorRef} className={cn("w-full", isFullscreen ? "h-[calc(100vh-60px)]" : `min-h-[${height}]`)} />
    </Card>
  )
}
