"use client";

import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import Underline from "@tiptap/extension-underline";
import Code from "@tiptap/extension-code";
import CodeBlock from "@tiptap/extension-code-block";
import { FC } from "react";

interface IProps {
  editorContent: string;
  onChange: (content: string) => void;
}

export const TipTapTelegramMessage: FC<IProps> = ({
  editorContent,
  onChange,
}) => {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        bulletList: {},
        orderedList: {},
        listItem: {},
      }),
      Link.configure({
        openOnClick: false,
      }),
      Underline,
      Code,
      CodeBlock,
    ],
    content: editorContent,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class:
          "shadow appearance-none min-h-[150px] border rounded w-full py-2 px-3 bg-white text-black text-sm mt-0 md:mt-3 leading-tight focus:outline-none focus:shadow-outline max-h-[30vh]",
      },
    },
  });

  const toggleBold = () => {
    if (!editor) return;
    editor.chain().focus().toggleBold().run();
  };

  const toggleitalic = () => {
    if (!editor) return;
    editor.chain().focus().toggleItalic().run();
  };

  const toggleBulletList = () => {
    if (!editor) return;
    editor.chain().focus().toggleBulletList().run();
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <div className="flex items-center gap-2 mb-2">
        <button
          type="button"
          onClick={toggleBold}
          className={`p-2 rounded ${editor?.isActive("bold") ? "bg-gray-200" : ""}`}
          title="Bold (Ctrl+B)"
        >
          <b>B</b>
        </button>
        <button
          type="button"
          onClick={toggleitalic}
          className={`p-2 rounded ${editor?.isActive("italic") ? "bg-gray-200" : ""}`}
          title="Italic (Ctrl+I)"
        >
          <i>I</i>
        </button>
        <button
          type="button"
          onClick={toggleBulletList}
          className={`p-2 rounded ${editor?.isActive("bulletList") ? "bg-gray-200" : ""}`}
          title="Bullet List"
        >
          • List
        </button>
      </div>
      <div className="border p-2 w-full min-h-[30vh] max-h-[30vh] overflow-y-auto">
        <EditorContent editor={editor} />
      </div>
    </div>
  );
};
