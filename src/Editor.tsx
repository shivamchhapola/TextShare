import './Editor.css';
import { useEditor, EditorContent, Editor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import React, { useState } from 'react';
import {
  RxFontBold,
  RxFontItalic,
  RxTriangleDown,
  RxTriangleUp,
} from 'react-icons/rx';

export default function RichEditor() {
  const [exMenuOpen, setExMenuOpen] = useState(false);

  const editor = useEditor({
    extensions: [StarterKit, Underline],
    content: `
        Hello
      `,
  });

  if (!editor) {
    return null;
  }

  return (
    <div
      className="Editor"
      style={
        exMenuOpen
          ? ({ '--EditorMenuHeight': '3rem' } as React.CSSProperties)
          : ({ '--EditorMenuHeight': '1.5rem' } as React.CSSProperties)
      }>
      <EditorMenu
        editor={editor}
        setExMenuOpen={setExMenuOpen}
        exMenuOpen={exMenuOpen}
      />
      <EditorContent editor={editor} />
    </div>
  );
}

function EditorMenu({
  editor,
  setExMenuOpen,
  exMenuOpen,
}: {
  editor: Editor | null;
  setExMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
  exMenuOpen: boolean;
}) {
  return (
    <div className="EditorMenu">
      <div
        onClick={() => editor?.chain().focus().toggleBold().run()}
        className={`EditorMenuButton ${
          editor?.isActive('bold') ? 'EditorMenuButtonActive' : ''
        }`}>
        <RxFontBold size="1.25rem" />
      </div>
      <div
        onClick={() => editor?.chain().focus().toggleItalic().run()}
        className={`EditorMenuButton ${
          editor?.isActive('italic') ? 'EditorMenuButtonActive' : ''
        }`}>
        <RxFontItalic size="1.25rem" />
      </div>
      <div
        onClick={() => setExMenuOpen(!exMenuOpen)}
        className="EditorMenuButton ExBtn">
        {exMenuOpen ? (
          <RxTriangleUp size="1.25rem" />
        ) : (
          <RxTriangleDown size="1.25rem" />
        )}
      </div>
    </div>
  );
}
