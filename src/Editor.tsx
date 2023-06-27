import './Editor.css';
import { useEditor, EditorContent, Editor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import { Color } from '@tiptap/extension-color';
import React, { useState } from 'react';
import {
  RxFontBold,
  RxFontItalic,
  RxTriangleDown,
  RxTriangleUp,
  RxUnderline,
} from 'react-icons/rx';
import { MdCode, MdRedo, MdTerminal, MdUndo } from 'react-icons/md';
import { TbBlockquote } from 'react-icons/tb';
import { VscNewline } from 'react-icons/vsc';
import TextStyle from '@tiptap/extension-text-style';
import { Level } from '@tiptap/extension-heading';

export default function RichEditor() {
  const [exMenuOpen, setExMenuOpen] = useState(false);

  const editor = useEditor({
    extensions: [
      Underline,
      Color,
      TextStyle,
      StarterKit.configure({
        history: {
          depth: 30,
        },
        heading: {
          levels: [1, 2, 3, 4],
        },
      }),
    ],
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
      {/*Bold, Italic and underline*/}
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
        onClick={() => editor?.chain().focus().toggleUnderline().run()}
        className={`EditorMenuButton ${
          editor?.isActive('underline') ? 'EditorMenuButtonActive' : ''
        }`}>
        <RxUnderline size="1.25rem" />
      </div>
      <div className="EditorMenuDivider"></div>

      {/*Undo and Redo*/}
      <div
        onClick={() => editor?.chain().focus().undo().run()}
        className={`EditorMenuButton ${
          !editor?.can().undo() ? 'EditorMenuButtonDeactive' : ''
        }`}>
        <MdUndo size="1.25rem" />
      </div>
      <div
        onClick={() => editor?.chain().focus().redo().run()}
        className={`EditorMenuButton ${
          !editor?.can().redo() ? 'EditorMenuButtonDeactive' : ''
        }`}>
        <MdRedo size="1.25rem" />
      </div>
      <div className="EditorMenuDivider"></div>

      {/*Blockquote, Code and CodeBlock*/}
      <div
        onClick={() => editor?.chain().focus().toggleBlockquote().run()}
        className={`EditorMenuButton ${
          editor?.isActive('blockquote') ? 'EditorMenuButtonActive' : ''
        }`}>
        <TbBlockquote size="1.25rem" />
      </div>
      <div
        onClick={() => editor?.chain().focus().toggleCode().run()}
        className={`EditorMenuButton ${
          editor?.isActive('code') ? 'EditorMenuButtonActive' : ''
        }`}>
        <MdCode size="1.25rem" />
      </div>
      <div
        onClick={() => editor?.chain().focus().toggleCodeBlock().run()}
        className={`EditorMenuButton ${
          editor?.isActive('codeBlock') ? 'EditorMenuButtonActive' : ''
        }`}>
        <MdTerminal size="1.25rem" />
      </div>
      <div
        onClick={() => editor?.chain().focus().setHardBreak().run()}
        className={`EditorMenuButton`}>
        <VscNewline size="1.25rem" />
      </div>
      <div className="EditorMenuDivider"></div>

      {/*Color */}
      <input
        type="color"
        onInput={(event: React.ChangeEvent<HTMLInputElement>) =>
          editor?.chain().focus().setColor(event.target.value).run()
        }
        value={editor?.getAttributes('textStyle').color}
      />
      <select
        defaultValue={0}
        onChange={(e) => {
          parseInt(e.target.value) === 0
            ? editor?.chain().focus().setParagraph().run()
            : editor
                ?.chain()
                .focus()
                .toggleHeading({ level: parseInt(e.target.value) as Level })
                .run();
        }}>
        <option value={0} style={{ fontWeight: 'normal' }}>
          Paragraph
        </option>
        <option value={1} style={{ fontSize: 'xx-large' }}>
          Heading 1
        </option>
        <option value={2} style={{ fontSize: 'x-large' }}>
          Heading 2
        </option>
        <option value={3} style={{ fontSize: 'large' }}>
          Heading 3
        </option>
        <option value={4} style={{ fontSize: 'medium' }}>
          Heading 4
        </option>
      </select>

      {/*Extend menu*/}
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
