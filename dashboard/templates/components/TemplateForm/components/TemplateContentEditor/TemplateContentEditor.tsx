import dynamic from "next/dynamic";

const AdvancedEditor = dynamic(() => import("./components/AdvancedEditor"), {
  ssr: false,
});

const WysiwygEditor = dynamic(() => import("./components/WysiwygEditor"), {
  ssr: false,
});

interface Props {
  value: string;
  onChange: (value: string) => void;
  editorMode: "advanced" | "wysiwyg";
}

export function TemplateContentEditor({ value, onChange, editorMode }: Props) {
  return (
    <>
      {editorMode === "advanced" ? (
        <AdvancedEditor value={value} onChange={onChange} height="400px" />
      ) : (
        <WysiwygEditor value={value} onChange={onChange} height="400px" />
      )}
    </>
  );
}
