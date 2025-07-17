"use client";

import Link from "next/link";
import type React from "react";
import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Toggle } from "@/components/ui/toggle";
import { Separator } from "@/components/ui/separator";
import {
  Bold,
  Italic,
  UnderlineIcon,
  Strikethrough,
  AlignLeft,
  AlignCenter,
  AlignRight,
  List,
  ListOrdered,
  Quote,
  LinkIcon,
  ImageIcon,
  Code,
  Undo,
  Redo,
  Palette,
  ExternalLink,
  Download,
  Upload,
} from "lucide-react";
import { useTheme } from "next-themes";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import UnderlineExtension from "@tiptap/extension-underline";
import TextAlign from "@tiptap/extension-text-align";
import LinkExtension from "@tiptap/extension-link";
import ImageExtension from "@tiptap/extension-image";
import { TextStyle } from "@tiptap/extension-text-style";
import Color from "@tiptap/extension-color";
import Highlight from "@tiptap/extension-highlight";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Label } from "@/components/ui/label";

interface Props {
  value: string;
  onChange: (value: string) => void;
  height?: string;
  templateId?: string;
  showFullscreenButton?: boolean;
}

export default function WysiwygEditor({
  value,
  onChange,
  height = "400px",
  templateId,
  showFullscreenButton = true,
}: Props) {
  const { theme } = useTheme();
  const [linkUrl, setLinkUrl] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [isLinkPopoverOpen, setIsLinkPopoverOpen] = useState(false);
  const [isImagePopoverOpen, setIsImagePopoverOpen] = useState(false);

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3, 4, 5, 6],
        },
      }),
      UnderlineExtension,
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      LinkExtension.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: "text-blue-500 underline cursor-pointer",
        },
      }),
      ImageExtension.configure({
        HTMLAttributes: {
          class: "max-w-full h-auto rounded-lg",
        },
      }),
      TextStyle,
      Color,
      Highlight.configure({
        multicolor: true,
      }),
    ],
    content: value,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class: cn(
          "prose prose-sm sm:prose lg:prose-lg xl:prose-2xl mx-auto focus:outline-none",
          "min-h-[300px] p-4",
          theme === "dark" ? "prose-invert" : ""
        ),
      },
    },
    immediatelyRender: false
  });

  useEffect(() => {
    if (editor && value !== editor.getHTML()) {
      editor.commands.setContent(value);
    }
  }, [value, editor]);

  const handleAddLink = () => {
    if (linkUrl && editor) {
      editor.chain().focus().setLink({ href: linkUrl }).run();
      setLinkUrl("");
      setIsLinkPopoverOpen(false);
    }
  };

  const handleAddImage = () => {
    if (imageUrl && editor) {
      editor.chain().focus().setImage({ src: imageUrl }).run();
      setImageUrl("");
      setIsImagePopoverOpen(false);
    }
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && editor) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const src = e.target?.result as string;
        editor.chain().focus().setImage({ src }).run();
      };
      reader.readAsDataURL(file);
    }
  };

  const handleExport = () => {
    if (!editor) return;

    const html = editor.getHTML();
    const blob = new Blob([html], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "email-content.html";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast.success("Content exported successfully!");
  };

  const handleImport = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = ".html,.htm";
    input.onchange = (e: any) => {
      const file = e.target.files[0];
      if (!file) return;

      const reader = new FileReader();
      reader.onload = (e: any) => {
        const html = e.target.result;
        editor?.commands.setContent(html);
        toast.success("Content imported successfully!");
      };
      reader.readAsText(file);
    };
    input.click();
  };

  if (!editor) {
    return (
      <Card className="border rounded-md overflow-hidden">
        <div
          className="flex items-center justify-center p-8"
          style={{ height }}
        >
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-sm text-muted-foreground">Loading editor...</p>
          </div>
        </div>
      </Card>
    );
  }

  return (
    <Card className="border rounded-md overflow-hidden pt-0 gap-0">
      {/* Header */}
      <div className="flex items-center justify-between bg-muted/40 px-4 py-2 border-b">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
          <span className="ml-2 text-sm font-medium flex items-center gap-2">
            <Palette className="h-4 w-4" />
            Visual Editor
          </span>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleImport}
            className="text-xs flex items-center gap-1 h-8 px-2"
          >
            <Upload className="h-3.5 w-3.5" />
            Import
          </Button>

          <Button
            variant="ghost"
            size="sm"
            onClick={handleExport}
            className="text-xs flex items-center gap-1 h-8 px-2"
          >
            <Download className="h-3.5 w-3.5" />
            Export
          </Button>

          {templateId && showFullscreenButton && (
            <>
              <div className="w-px h-6 bg-border"></div>
              <Button
                variant="ghost"
                size="sm"
                asChild
                className="text-xs flex items-center gap-1 h-8 px-2"
              >
                <Link
                  href={`/dashboard/templates/${templateId}/edit`}
                  target="_blank"
                >
                  <ExternalLink className="h-3.5 w-3.5" />
                  Fullscreen
                </Link>
              </Button>
            </>
          )}
        </div>
      </div>

      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-1 p-2 border-b bg-muted/20">
        {/* Text Formatting */}
        <div className="flex items-center gap-1">
          <Toggle
            size="sm"
            pressed={editor.isActive("bold")}
            onPressedChange={() => editor.chain().focus().toggleBold().run()}
          >
            <Bold className="h-4 w-4" />
          </Toggle>
          <Toggle
            size="sm"
            pressed={editor.isActive("italic")}
            onPressedChange={() => editor.chain().focus().toggleItalic().run()}
          >
            <Italic className="h-4 w-4" />
          </Toggle>
          <Toggle
            size="sm"
            pressed={editor.isActive("underline")}
            onPressedChange={() =>
              editor.chain().focus().toggleUnderline().run()
            }
          >
            <UnderlineIcon className="h-4 w-4" />
          </Toggle>
          <Toggle
            size="sm"
            pressed={editor.isActive("strike")}
            onPressedChange={() => editor.chain().focus().toggleStrike().run()}
          >
            <Strikethrough className="h-4 w-4" />
          </Toggle>
          <Toggle
            size="sm"
            pressed={editor.isActive("code")}
            onPressedChange={() => editor.chain().focus().toggleCode().run()}
          >
            <Code className="h-4 w-4" />
          </Toggle>
        </div>

        <Separator orientation="vertical" className="h-6" />

        {/* Headings */}
        <div className="flex items-center gap-1">
          <Button
            variant={editor.isActive("paragraph") ? "default" : "ghost"}
            size="sm"
            onClick={() => editor.chain().focus().setParagraph().run()}
            className="h-8 px-2 text-xs"
          >
            P
          </Button>
          {[1, 2, 3].map((level) => (
            <Button
              key={level}
              variant={
                editor.isActive("heading", { level }) ? "default" : "ghost"
              }
              size="sm"
              onClick={() =>
                editor
                  .chain()
                  .focus()
                  .toggleHeading({ level: level as any })
                  .run()
              }
              className="h-8 px-2 text-xs"
            >
              H{level}
            </Button>
          ))}
        </div>

        <Separator orientation="vertical" className="h-6" />

        {/* Alignment */}
        <div className="flex items-center gap-1">
          <Toggle
            size="sm"
            pressed={editor.isActive({ textAlign: "left" })}
            onPressedChange={() =>
              editor.chain().focus().setTextAlign("left").run()
            }
          >
            <AlignLeft className="h-4 w-4" />
          </Toggle>
          <Toggle
            size="sm"
            pressed={editor.isActive({ textAlign: "center" })}
            onPressedChange={() =>
              editor.chain().focus().setTextAlign("center").run()
            }
          >
            <AlignCenter className="h-4 w-4" />
          </Toggle>
          <Toggle
            size="sm"
            pressed={editor.isActive({ textAlign: "right" })}
            onPressedChange={() =>
              editor.chain().focus().setTextAlign("right").run()
            }
          >
            <AlignRight className="h-4 w-4" />
          </Toggle>
        </div>

        <Separator orientation="vertical" className="h-6" />

        {/* Lists */}
        <div className="flex items-center gap-1">
          <Toggle
            size="sm"
            pressed={editor.isActive("bulletList")}
            onPressedChange={() =>
              editor.chain().focus().toggleBulletList().run()
            }
          >
            <List className="h-4 w-4" />
          </Toggle>
          <Toggle
            size="sm"
            pressed={editor.isActive("orderedList")}
            onPressedChange={() =>
              editor.chain().focus().toggleOrderedList().run()
            }
          >
            <ListOrdered className="h-4 w-4" />
          </Toggle>
          <Toggle
            size="sm"
            pressed={editor.isActive("blockquote")}
            onPressedChange={() =>
              editor.chain().focus().toggleBlockquote().run()
            }
          >
            <Quote className="h-4 w-4" />
          </Toggle>
        </div>

        <Separator orientation="vertical" className="h-6" />

        {/* Media */}
        <div className="flex items-center gap-1">
          <Popover open={isLinkPopoverOpen} onOpenChange={setIsLinkPopoverOpen}>
            <PopoverTrigger asChild>
              <Button variant="ghost" size="sm" className="h-8 px-2">
                <LinkIcon className="h-4 w-4" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80">
              <div className="space-y-2">
                <Label htmlFor="link-url">Link URL</Label>
                <div className="flex gap-2">
                  <Input
                    id="link-url"
                    placeholder="https://example.com"
                    value={linkUrl}
                    onChange={(e) => setLinkUrl(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleAddLink()}
                  />
                  <Button size="sm" onClick={handleAddLink}>
                    Add
                  </Button>
                </div>
              </div>
            </PopoverContent>
          </Popover>

          <Popover
            open={isImagePopoverOpen}
            onOpenChange={setIsImagePopoverOpen}
          >
            <PopoverTrigger asChild>
              <Button variant="ghost" size="sm" className="h-8 px-2">
                <ImageIcon className="h-4 w-4" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="image-url">Image URL</Label>
                  <div className="flex gap-2">
                    <Input
                      id="image-url"
                      placeholder="https://example.com/image.jpg"
                      value={imageUrl}
                      onChange={(e) => setImageUrl(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && handleAddImage()}
                    />
                    <Button size="sm" onClick={handleAddImage}>
                      Add
                    </Button>
                  </div>
                </div>
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-background px-2 text-muted-foreground">
                      Or
                    </span>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="image-upload">Upload Image</Label>
                  <Input
                    id="image-upload"
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                  />
                </div>
              </div>
            </PopoverContent>
          </Popover>
        </div>

        <Separator orientation="vertical" className="h-6" />

        {/* History */}
        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => editor.chain().focus().undo().run()}
            disabled={!editor.can().undo()}
            className="h-8 px-2"
          >
            <Undo className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => editor.chain().focus().redo().run()}
            disabled={!editor.can().redo()}
            className="h-8 px-2"
          >
            <Redo className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Editor Content */}
      <div className="relative" style={{ minHeight: height }}>
        <EditorContent
          editor={editor}
          className={cn(
            "min-h-full",
            "[&_.ProseMirror]:min-h-[300px] [&_.ProseMirror]:outline-none [&_.ProseMirror]:p-4",
            "[&_.ProseMirror_p.is-editor-empty:first-child::before]:content-['Start_writing_your_email_content...'] [&_.ProseMirror_p.is-editor-empty:first-child::before]:text-muted-foreground [&_.ProseMirror_p.is-editor-empty:first-child::before]:float-left [&_.ProseMirror_p.is-editor-empty:first-child::before]:pointer-events-none [&_.ProseMirror_p.is-editor-empty:first-child::before]:h-0"
          )}
        />
      </div>
    </Card>
  );
}
