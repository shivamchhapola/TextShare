import React, { useEffect, useRef, useState } from 'react';

import Styles from '../styles/Editor.module.css'; //css styles

//tiptap editor stuff
import { useEditor, EditorContent } from '@tiptap/react';
import { Color } from '@tiptap/extension-color';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
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
import Typography from '@tiptap/extension-typography';
import TextStyle from '@tiptap/extension-text-style';

//Icons
import {
  RxFontBold,
  RxFontItalic,
  RxStrikethrough,
  RxTextAlignCenter,
  RxTextAlignJustify,
  RxTextAlignLeft,
  RxTextAlignRight,
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
import {
  TbBlockquote,
  TbBrandYoutube,
  TbHighlight,
  TbLayoutBoardSplit,
  TbTableFilled,
  TbTableOff,
  TbTableOptions,
  TbTablePlus,
} from 'react-icons/tb';
import { VscNewline } from 'react-icons/vsc';
import { BsListNested } from 'react-icons/bs';
import { LuListTree, LuSubscript, LuSuperscript } from 'react-icons/lu';
import {
  RiDeleteColumn,
  RiDeleteRow,
  RiInsertColumnLeft,
  RiInsertColumnRight,
  RiInsertRowBottom,
  RiInsertRowTop,
  RiLayoutColumnFill,
  RiLayoutRowFill,
} from 'react-icons/ri';

//Tooltip and Popup
import Tippy from '@tippyjs/react';
import Popup from 'reactjs-popup';

export default function RichEditor({ setHTML, initHTML }) {
  //open extened menu
  const [exMenuOpen, setExMenuOpen] = useState(false);

  //Editor config
  const editor = useEditor({
    extensions: [
      Underline,
      Color,
      TextStyle,
      Image,
      Subscript,
      Superscript,
      TableRow,
      TableHeader,
      TableCell,
      Typography,
      Youtube,
      Table.configure({
        resizable: true,
      }),
      Link.configure({
        openOnClick: false,
      }),
      StarterKit.configure({
        history: {
          depth: 30,
        },
        heading: {
          levels: [1, 2, 3, 4, 5, 6],
        },
      }),
      Highlight.configure({ multicolor: true }),
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
    ],
    content: initHTML,
    onUpdate({ editor }) {
      setHTML(editor.getHTML());
    },
  });

  useEffect(() => {
    editor?.commands.setContent(initHTML);
  }, [initHTML]);

  if (!editor) return null;

  return (
    <div
      className={Styles.Editor}
      style={
        exMenuOpen
          ? { '--EditorMenuHeight': 'auto' }
          : { '--EditorMenuHeight': '1.7rem' }
      }>
      <EditorMenu
        editor={editor}
        setExMenuOpen={setExMenuOpen}
        exMenuOpen={exMenuOpen}
      />
      <div className={Styles.Content}>
        <EditorContent editor={editor} />
      </div>
    </div>
  );
}

function EditorMenu({ editor, setExMenuOpen, exMenuOpen }) {
  const image = useRef(null);
  const link = useRef(null);
  const yt = useRef(null);
  const ytw = useRef(null);
  const yth = useRef(null);

  return (
    <div className={Styles.EditorMenu}>
      {/*Undo and Redo*/}
      <Tippy content="Undo">
        <div
          onClick={() => editor?.chain().focus().undo().run()}
          className={`${Styles.EditorMenuButton} ${
            !editor?.can().undo() ? Styles.EditorMenuButtonDeactive : ''
          }`}>
          <MdUndo size="1.25rem" />
        </div>
      </Tippy>
      <Tippy content="Redo">
        <div
          onClick={() => editor?.chain().focus().redo().run()}
          className={`${Styles.EditorMenuButton} ${
            !editor?.can().redo() ? Styles.EditorMenuButtonDeactive : ''
          }`}>
          <MdRedo size="1.25rem" />
        </div>
      </Tippy>
      <div className={Styles.EditorMenuDivider}></div>

      {/*Bold, Italic and underline*/}
      <Tippy content="Bold">
        <div
          onClick={() => editor?.chain().focus().toggleBold().run()}
          className={`${Styles.EditorMenuButton} ${
            editor?.isActive('bold') ? Styles.EditorMenuButtonActive : ''
          }`}>
          <RxFontBold size="1.25rem" />
        </div>
      </Tippy>

      <Tippy content="Italic">
        <div
          onClick={() => editor?.chain().focus().toggleItalic().run()}
          className={`${Styles.EditorMenuButton} ${
            editor?.isActive('italic') ? Styles.EditorMenuButtonActive : ''
          }`}>
          <RxFontItalic size="1.25rem" />
        </div>
      </Tippy>

      <Tippy content="Underline">
        <div
          onClick={() => editor?.chain().focus().toggleUnderline().run()}
          className={`${Styles.EditorMenuButton} ${
            editor?.isActive('underline') ? Styles.EditorMenuButtonActive : ''
          }`}>
          <RxUnderline size="1.25rem" />
        </div>
      </Tippy>
      <div className={Styles.EditorMenuDivider}></div>

      {/*Text Align*/}
      <Tippy content="Left">
        <div
          onClick={() => editor?.chain().focus().setTextAlign('left').run()}
          className={`${Styles.EditorMenuButton} ${
            editor?.isActive({ textAlign: 'left' })
              ? Styles.EditorMenuButtonActive
              : ''
          }`}>
          <RxTextAlignLeft size="1.2rem" />
        </div>
      </Tippy>

      <Tippy content="Center">
        <div
          onClick={() => editor?.chain().focus().setTextAlign('center').run()}
          className={`${Styles.EditorMenuButton} ${
            editor?.isActive({ textAlign: 'center' })
              ? Styles.EditorMenuButtonActive
              : ''
          }`}>
          <RxTextAlignCenter size="1.2rem" />
        </div>
      </Tippy>

      <Tippy content="Right">
        <div
          onClick={() => editor?.chain().focus().setTextAlign('right').run()}
          className={`${Styles.EditorMenuButton} ${
            editor?.isActive({ textAlign: 'right' })
              ? Styles.EditorMenuButtonActive
              : ''
          }`}>
          <RxTextAlignRight size="1.2rem" />
        </div>
      </Tippy>

      <Tippy content="Justify">
        <div
          onClick={() => editor?.chain().focus().setTextAlign('justify').run()}
          className={`${Styles.EditorMenuButton} ${
            editor?.isActive({ textAlign: 'justify' })
              ? Styles.EditorMenuButtonActive
              : ''
          }`}>
          <RxTextAlignJustify size="1.2rem" />
        </div>
      </Tippy>
      <div className={Styles.EditorMenuDivider}></div>

      {/*Strikethrough, Sub and Superscript*/}
      <Tippy content="Strikethrough">
        <div
          onClick={() => editor?.chain().focus().toggleStrike().run()}
          className={`${Styles.EditorMenuButton} ${
            editor?.isActive('strike') ? Styles.EditorMenuButtonActive : ''
          }`}>
          <RxStrikethrough size="1.25rem" />
        </div>
      </Tippy>

      <Tippy content="Subscript">
        <div
          onClick={() => editor?.chain().focus().toggleSubscript().run()}
          className={`${Styles.EditorMenuButton} ${
            editor?.isActive('subscript') ? Styles.EditorMenuButtonActive : ''
          }`}>
          <LuSubscript size="1.25rem" />
        </div>
      </Tippy>

      <Tippy content="Superscript">
        <div
          onClick={() => editor?.chain().focus().toggleSuperscript().run()}
          className={`${Styles.EditorMenuButton} ${
            editor?.isActive('superscript') ? Styles.EditorMenuButtonActive : ''
          }`}>
          <LuSuperscript size="1.25rem" />
        </div>
      </Tippy>
      <div className={Styles.EditorMenuDivider}></div>

      {/*Color and Text Heading*/}
      <Tippy content="Text Color">
        <label
          className={Styles.EditorMenuButton}
          style={{
            position: 'relative',
            color: editor?.getAttributes('textStyle').color ?? '#000',
          }}>
          <input
            style={{ visibility: 'hidden', position: 'absolute', left: 0 }}
            type="color"
            onChange={(event) =>
              editor?.chain().focus().setColor(event.target.value).run()
            }
          />
          <MdFormatColorText size="1.2rem" />
        </label>
      </Tippy>

      <Tippy content="Highlight">
        <label
          className={Styles.EditorMenuButton}
          style={{
            position: 'relative',
          }}>
          <input
            style={{ visibility: 'hidden', position: 'absolute', left: 0 }}
            type="color"
            onChange={(event) =>
              editor
                ?.chain()
                .focus()
                .setHighlight({ color: event.target.value })
                .run()
            }
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
                  .toggleHeading({ level: parseInt(e.target.value) })
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
          <option value={5} style={{ fontSize: 'small' }}>
            Heading 5
          </option>
          <option value={6} style={{ fontSize: 'x-small' }}>
            Heading 6
          </option>
        </select>
      </Tippy>
      <div className={Styles.EditorMenuDivider}></div>

      {/*Extend menu*/}
      <Tippy content="More Stuff">
        <div
          onClick={() => setExMenuOpen(!exMenuOpen)}
          className={`${Styles.EditorMenuButton} ${Styles.ExBtn}`}>
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
