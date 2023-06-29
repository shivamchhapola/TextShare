import './Editor.css';
import { useEditor, EditorContent, Editor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import { Color } from '@tiptap/extension-color';
import Highlight from '@tiptap/extension-highlight';
import Image from '@tiptap/extension-image';
import Link from '@tiptap/extension-link';
import Subscript from '@tiptap/extension-subscript';
import Superscript from '@tiptap/extension-superscript';
import Table from '@tiptap/extension-table';
import TableCell from '@tiptap/extension-table-cell';
import TableHeader from '@tiptap/extension-table-header';
import TableRow from '@tiptap/extension-table-row';
import TextAlign from '@tiptap/extension-text-align';
import Youtube from '@tiptap/extension-youtube';
import Placeholder from '@tiptap/extension-placeholder';
import React, { useState } from 'react';
import {
  RxFontBold,
  RxFontItalic,
  RxStrikethrough,
  RxTriangleDown,
  RxTriangleUp,
  RxUnderline,
} from 'react-icons/rx';
import {
  MdCode,
  MdFormatColorText,
  MdFormatListBulleted,
  MdFormatListBulletedAdd,
  MdFormatListNumbered,
  MdHorizontalRule,
  MdImage,
  MdLink,
  MdRedo,
  MdTerminal,
  MdUndo,
} from 'react-icons/md';
import { TbBlockquote, TbHighlight } from 'react-icons/tb';
import { VscNewline } from 'react-icons/vsc';
import { BsListNested } from 'react-icons/bs';
import { LuListTree } from 'react-icons/lu';
import TextStyle from '@tiptap/extension-text-style';
import { Level } from '@tiptap/extension-heading';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';

export default function RichEditor() {
  const [exMenuOpen, setExMenuOpen] = useState(false);

  const editor = useEditor({
    extensions: [
      Underline,
      Color,
      TextStyle,
      Image,
      Link.configure({
        openOnClick: false,
      }),
      StarterKit.configure({
        history: {
          depth: 30,
        },
        heading: {
          levels: [1, 2, 3, 4],
        },
      }),
      Highlight.configure({ multicolor: true }),
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
          ? ({ '--EditorMenuHeight': 'auto' } as React.CSSProperties)
          : ({ '--EditorMenuHeight': '2rem' } as React.CSSProperties)
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
  const [imageURL, setImageURL] = useState('');
  const [linkURL, setLinkURL] = useState('');
  return (
    <div className="EditorMenu">
      {/*Bold, Italic and underline*/}
      <Tippy content="Bold">
        <div
          onClick={() => editor?.chain().focus().toggleBold().run()}
          className={`EditorMenuButton ${
            editor?.isActive('bold') ? 'EditorMenuButtonActive' : ''
          }`}>
          <RxFontBold size="1.25rem" />
        </div>
      </Tippy>
      <Tippy content="Italic">
        <div
          onClick={() => editor?.chain().focus().toggleItalic().run()}
          className={`EditorMenuButton ${
            editor?.isActive('italic') ? 'EditorMenuButtonActive' : ''
          }`}>
          <RxFontItalic size="1.25rem" />
        </div>
      </Tippy>
      <Tippy content="Underline">
        <div
          onClick={() => editor?.chain().focus().toggleUnderline().run()}
          className={`EditorMenuButton ${
            editor?.isActive('underline') ? 'EditorMenuButtonActive' : ''
          }`}>
          <RxUnderline size="1.25rem" />
        </div>
      </Tippy>
      <Tippy content="Strikethrough">
        <div
          onClick={() => editor?.chain().focus().toggleStrike().run()}
          className={`EditorMenuButton ${
            editor?.isActive('strike') ? 'EditorMenuButtonActive' : ''
          }`}>
          <RxStrikethrough size="1.25rem" />
        </div>
      </Tippy>
      <Tippy content="Toggle Bullet List">
        <div
          onClick={() => editor?.chain().focus().toggleBulletList().run()}
          className={`EditorMenuButton ${
            editor?.isActive('bulletlist') ? 'EditorMenuButtonActive' : ''
          }`}>
          <MdFormatListBulleted size="1.25rem" />
        </div>
      </Tippy>
      <Tippy content="Toggle Ordered List">
        <div
          onClick={() => editor?.chain().focus().toggleOrderedList().run()}
          className={`EditorMenuButton ${
            editor?.isActive('orderedList') ? 'EditorMenuButtonActive' : ''
          }`}>
          <MdFormatListNumbered size="1.25rem" />
        </div>
      </Tippy>
      <Tippy content="Split List">
        <div
          onClick={() =>
            editor?.chain().focus().splitListItem('listItem').run()
          }
          className={`EditorMenuButton ${
            editor?.can().splitListItem('listItem')
              ? 'EditorMenuButtonActive'
              : ''
          }`}>
          <MdFormatListBulletedAdd size="1.25rem" />
        </div>
      </Tippy>
      <Tippy content="Sink List">
        <div
          onClick={() => editor?.chain().focus().sinkListItem('listItem').run()}
          className={`EditorMenuButton ${
            editor?.can().sinkListItem('listItem')
              ? 'EditorMenuButtonActive'
              : ''
          }`}>
          <BsListNested size="1.25rem" />
        </div>
      </Tippy>
      <Tippy content="Lift List">
        <div
          onClick={() => editor?.chain().focus().liftListItem('listItem').run()}
          className={`EditorMenuButton ${
            editor?.can().liftListItem('listItem')
              ? 'EditorMenuButtonActive'
              : ''
          }`}>
          <LuListTree size="1.25rem" />
        </div>
      </Tippy>
      <div className="EditorMenuDivider"></div>

      {/*Undo and Redo*/}
      <Tippy content="Undo">
        <div
          onClick={() => editor?.chain().focus().undo().run()}
          className={`EditorMenuButton ${
            !editor?.can().undo() ? 'EditorMenuButtonDeactive' : ''
          }`}>
          <MdUndo size="1.25rem" />
        </div>
      </Tippy>
      <Tippy content="Redo">
        <div
          onClick={() => editor?.chain().focus().redo().run()}
          className={`EditorMenuButton ${
            !editor?.can().redo() ? 'EditorMenuButtonDeactive' : ''
          }`}>
          <MdRedo size="1.25rem" />
        </div>
      </Tippy>
      <div className="EditorMenuDivider"></div>

      {/*Blockquote, Code and CodeBlock*/}
      <Tippy content="Blockquote">
        <div
          onClick={() => editor?.chain().focus().toggleBlockquote().run()}
          className={`EditorMenuButton ${
            editor?.isActive('blockquote') ? 'EditorMenuButtonActive' : ''
          }`}>
          <TbBlockquote size="1.25rem" />
        </div>
      </Tippy>
      <Tippy content="Code">
        <div
          onClick={() => editor?.chain().focus().toggleCode().run()}
          className={`EditorMenuButton ${
            editor?.isActive('code') ? 'EditorMenuButtonActive' : ''
          }`}>
          <MdCode size="1.25rem" />
        </div>
      </Tippy>
      <Tippy content="Codeblock">
        <div
          onClick={() => editor?.chain().focus().toggleCodeBlock().run()}
          className={`EditorMenuButton ${
            editor?.isActive('codeBlock') ? 'EditorMenuButtonActive' : ''
          }`}>
          <MdTerminal size="1.25rem" />
        </div>
      </Tippy>
      <Tippy content="Hardbreak">
        <div
          onClick={() => editor?.chain().focus().setHardBreak().run()}
          className={`EditorMenuButton`}>
          <VscNewline size="1.25rem" />
        </div>
      </Tippy>
      <Tippy content="Codeblock">
        <div
          onClick={() => editor?.chain().focus().setHorizontalRule().run()}
          className={`EditorMenuButton`}>
          <MdHorizontalRule size="1.25rem" />
        </div>
      </Tippy>
      <div className="EditorMenuDivider"></div>

      {/*Color */}
      <Tippy content="Text Color">
        <label className="EditorMenuButton" style={{ position: 'relative' }}>
          <input
            style={{ visibility: 'hidden', position: 'absolute', left: 0 }}
            type="color"
            onInput={(event: React.ChangeEvent<HTMLInputElement>) =>
              editor?.chain().focus().setColor(event.target.value).run()
            }
            value={editor?.getAttributes('textStyle').color ?? '#000'}
          />
          <MdFormatColorText size="1.2rem" />
        </label>
      </Tippy>
      <Tippy content="Highlight">
        <label className="EditorMenuButton" style={{ position: 'relative' }}>
          <input
            style={{ visibility: 'hidden', position: 'absolute', left: 0 }}
            type="color"
            onInput={(event: React.ChangeEvent<HTMLInputElement>) =>
              editor
                ?.chain()
                .focus()
                .setHighlight({ color: event.target.value })
                .run()
            }
            value={editor?.getAttributes('textStyle').color ?? '#000'}
          />
          <TbHighlight size="1.2rem" />
        </label>
      </Tippy>
      <Tippy content="Heading">
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
      </Tippy>
      <Tippy content="Insert Image URL">
        <div>
          <Popup
            trigger={
              <button className={`EditorMenuButton`}>
                <MdImage size="1.25rem" />
              </button>
            }
            nested
            modal>
            {(close: any) => {
              return (
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    padding: '2rem',
                  }}>
                  <input
                    style={{
                      width: '80%',
                    }}
                    type="text"
                    placeholder="Insert a valid Image URL..."
                    onChange={(e) => {
                      setImageURL(e.target.value);
                    }}
                  />
                  <button
                    onClick={() => {
                      editor?.chain().focus().setImage({ src: imageURL }).run();
                      close();
                    }}
                    className="InsertImgBtn">
                    Insert
                  </button>
                </div>
              ) as React.ReactNode;
            }}
          </Popup>
        </div>
      </Tippy>
      <Tippy content="Link">
        <div>
          <Popup
            trigger={
              <button className={`EditorMenuButton`}>
                <MdLink size="1.25rem" />
              </button>
            }
            nested
            modal>
            {(close: any) => {
              return (
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    padding: '2rem',
                  }}>
                  <input
                    style={{
                      width: '80%',
                    }}
                    type="text"
                    placeholder="Insert a valid Link..."
                    onChange={(e) => {
                      setLinkURL(e.target.value);
                    }}
                  />
                  <button
                    onClick={() => {
                      editor
                        ?.chain()
                        .focus()
                        .setLink({ href: linkURL, target: '_blank' })
                        .run();
                      close();
                    }}
                    className="InsertImgBtn">
                    Link
                  </button>
                </div>
              ) as React.ReactNode;
            }}
          </Popup>
        </div>
      </Tippy>

      {/*Extend menu*/}
      <Tippy content="More Stuff">
        <div
          onClick={() => setExMenuOpen(!exMenuOpen)}
          className="EditorMenuButton ExBtn">
          {exMenuOpen ? (
            <RxTriangleUp size="1.25rem" />
          ) : (
            <RxTriangleDown size="1.25rem" />
          )}
        </div>
      </Tippy>
    </div>
  );
}
