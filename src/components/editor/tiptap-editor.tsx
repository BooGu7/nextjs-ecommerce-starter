"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import Placeholder from "@tiptap/extension-placeholder";
import TextAlign from "@tiptap/extension-text-align";

import ImageUpload from "./image-upload";

interface Props {
  value?: string;
  onChange: (content: string) => void;
}

export default function TiptapEditor({
  value,
  onChange,
}: Props) {

  const editor = useEditor({
    extensions: [
      StarterKit,
      Image,
      Link,
      Placeholder.configure({
        placeholder: "Write content...",
      }),
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
    ],

    content: value || "",

    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  if (!editor) return null;

  return (
    <div className="border rounded-lg p-4">

      <div className="flex gap-2 mb-4">

        <button
          type="button"
          onClick={() =>
            editor.chain().focus().toggleBold().run()
          }
        >
          Bold
        </button>

        <button
          type="button"
          onClick={() =>
            editor.chain().focus().toggleItalic().run()
          }
        >
          Italic
        </button>

        <ImageUpload
          onUploaded={(url) =>
            editor
              .chain()
              .focus()
              .setImage({ src: url })
              .run()
          }
        />

      </div>

      <EditorContent editor={editor} />

    </div>
  );
}