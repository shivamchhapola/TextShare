//@ts-nocheck
import React, { useRef, useState, useEffect, forwardRef } from 'react';

import './Editor.css'; //css styles

//tiptap editor stuff
import { useEditor, EditorContent, Editor } from '@tiptap/react';
import { Level } from '@tiptap/extension-heading';
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
import 'tippy.js/dist/tippy.css';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';

export default function RichEditor({ setHTML }: any) {
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
    content: '<p>Start writing here...</p>',
    onUpdate({ editor }) {
      setHTML(editor.getHTML());
    },
  });

  if (!editor) return null;

  return (
    <div
      className="Editor"
      style={
        exMenuOpen
          ? ({ '--EditorMenuHeight': 'auto' } as React.CSSProperties)
          : ({ '--EditorMenuHeight': '1.7rem' } as React.CSSProperties)
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
  const image = useRef<HTMLInputElement>(null);
  const link = useRef<HTMLInputElement>(null);
  const yt = useRef<HTMLInputElement>(null);
  const ytw = useRef<HTMLInputElement>(null);
  const yth = useRef<HTMLInputElement>(null);

  return (
    <div className="EditorMenu">
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
      <div className="EditorMenuDivider"></div>

      {/*Text Align*/}
      <Tippy content="Left">
        <div
          onClick={() => editor?.chain().focus().setTextAlign('left').run()}
          className={`EditorMenuButton ${
            editor?.isActive({ textAlign: 'left' })
              ? 'EditorMenuButtonActive'
              : ''
          }`}>
          <RxTextAlignLeft size="1.2rem" />
        </div>
      </Tippy>

      <Tippy content="Center">
        <div
          onClick={() => editor?.chain().focus().setTextAlign('center').run()}
          className={`EditorMenuButton ${
            editor?.isActive({ textAlign: 'center' })
              ? 'EditorMenuButtonActive'
              : ''
          }`}>
          <RxTextAlignCenter size="1.2rem" />
        </div>
      </Tippy>

      <Tippy content="Right">
        <div
          onClick={() => editor?.chain().focus().setTextAlign('right').run()}
          className={`EditorMenuButton ${
            editor?.isActive({ textAlign: 'right' })
              ? 'EditorMenuButtonActive'
              : ''
          }`}>
          <RxTextAlignRight size="1.2rem" />
        </div>
      </Tippy>

      <Tippy content="Justify">
        <div
          onClick={() => editor?.chain().focus().setTextAlign('justify').run()}
          className={`EditorMenuButton ${
            editor?.isActive({ textAlign: 'justify' })
              ? 'EditorMenuButtonActive'
              : ''
          }`}>
          <RxTextAlignJustify size="1.2rem" />
        </div>
      </Tippy>
      <div className="EditorMenuDivider"></div>

      {/*Strikethrough, Sub and Superscript*/}
      <Tippy content="Strikethrough">
        <div
          onClick={() => editor?.chain().focus().toggleStrike().run()}
          className={`EditorMenuButton ${
            editor?.isActive('strike') ? 'EditorMenuButtonActive' : ''
          }`}>
          <RxStrikethrough size="1.25rem" />
        </div>
      </Tippy>

      <Tippy content="Subscript">
        <div
          onClick={() => editor?.chain().focus().toggleSubscript().run()}
          className={`EditorMenuButton ${
            editor?.isActive('subscript') ? 'EditorMenuButtonActive' : ''
          }`}>
          <LuSubscript size="1.25rem" />
        </div>
      </Tippy>

      <Tippy content="Superscript">
        <div
          onClick={() => editor?.chain().focus().toggleSuperscript().run()}
          className={`EditorMenuButton ${
            editor?.isActive('superscript') ? 'EditorMenuButtonActive' : ''
          }`}>
          <LuSuperscript size="1.25rem" />
        </div>
      </Tippy>
      <div className="EditorMenuDivider"></div>

      {/*Color and Text Heading*/}
      <Tippy content="Text Color">
        <label
          className="EditorMenuButton"
          style={{
            position: 'relative',
            color: editor?.getAttributes('textStyle').color ?? '#000',
          }}>
          <input
            style={{ visibility: 'hidden', position: 'absolute', left: 0 }}
            type="color"
            onInput={(event: React.ChangeEvent<HTMLInputElement>) =>
              editor?.chain().focus().setColor(event.target.value).run()
            }
          />
          <MdFormatColorText size="1.2rem" />
        </label>
      </Tippy>

      <Tippy content="Highlight">
        <label
          className="EditorMenuButton"
          style={{
            position: 'relative',
          }}>
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
          <option value={5} style={{ fontSize: 'small' }}>
            Heading 5
          </option>
          <option value={6} style={{ fontSize: 'x-small' }}>
            Heading 6
          </option>
        </select>
      </Tippy>
      <div className="EditorMenuDivider"></div>

      {/*Lists*/}
      <Tippy content="Toggle Bullet List">
        <div
          onClick={() => editor?.chain().focus().toggleBulletList().run()}
          className={`EditorMenuButton ${
            editor?.isActive('bulletList') ? 'EditorMenuButtonActive' : ''
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

      <Tippy content="Add Item">
        <div
          onClick={() =>
            editor?.chain().focus().splitListItem('listItem').run()
          }
          className={`EditorMenuButton`}>
          <MdFormatListBulletedAdd size="1.25rem" />
        </div>
      </Tippy>

      <Tippy content="Sink List">
        <div
          onClick={() => editor?.chain().focus().sinkListItem('listItem').run()}
          className={`EditorMenuButton`}>
          <BsListNested size="1.25rem" />
        </div>
      </Tippy>

      <Tippy content="Lift List">
        <div
          onClick={() => editor?.chain().focus().liftListItem('listItem').run()}
          className={`EditorMenuButton`}>
          <LuListTree size="1.25rem" />
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

      <Tippy content="Horizontal Rule">
        <div
          onClick={() => editor?.chain().focus().setHorizontalRule().run()}
          className={`EditorMenuButton`}>
          <MdHorizontalRule size="1.25rem" />
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
      <div className="EditorMenuDivider"></div>

      {/*Table Stuff*/}
      <Tippy content="Insert Table">
        <div
          onClick={() =>
            editor
              ?.chain()
              .focus()
              .insertTable({ rows: 3, cols: 3, withHeaderRow: true })
              .run()
          }
          className={`EditorMenuButton`}>
          <TbTablePlus size="1.125rem" />
        </div>
      </Tippy>

      <Tippy content="Add Column before">
        <div
          onClick={() => editor?.chain().focus().addColumnBefore().run()}
          className={`EditorMenuButton`}>
          <RiInsertColumnLeft size="1.2rem" />
        </div>
      </Tippy>

      <Tippy content="Add Column after">
        <div
          onClick={() => editor?.chain().focus().addColumnAfter().run()}
          className={`EditorMenuButton`}>
          <RiInsertColumnRight size="1.2rem" />
        </div>
      </Tippy>

      <Tippy content="Remove Column">
        <div
          onClick={() => editor?.chain().focus().deleteColumn().run()}
          className={`EditorMenuButton`}>
          <RiDeleteColumn size="1.2rem" />
        </div>
      </Tippy>

      <Tippy content="Add Row before">
        <div
          onClick={() => editor?.chain().focus().addRowBefore().run()}
          className={`EditorMenuButton`}>
          <RiInsertRowTop size="1.2rem" />
        </div>
      </Tippy>

      <Tippy content="Add Row after">
        <div
          onClick={() => editor?.chain().focus().addRowAfter().run()}
          className={`EditorMenuButton`}>
          <RiInsertRowBottom size="1.2rem" />
        </div>
      </Tippy>

      <Tippy content="Remove Row">
        <div
          onClick={() => editor?.chain().focus().deleteRow().run()}
          className={`EditorMenuButton`}>
          <RiDeleteRow size="1.2rem" />
        </div>
      </Tippy>

      <Tippy content="Remove Table">
        <div
          onClick={() => editor?.chain().focus().deleteTable().run()}
          className={`EditorMenuButton`}>
          <TbTableOff size="1.2rem" />
        </div>
      </Tippy>

      <Tippy content="Merge or Split Cell">
        <div
          onClick={() => editor?.chain().focus().mergeOrSplit().run()}
          className={`EditorMenuButton`}>
          <TbLayoutBoardSplit size="1.2rem" />
        </div>
      </Tippy>

      <Tippy content="Toggle Header Cell">
        <div
          onClick={() => editor?.chain().focus().toggleHeaderCell().run()}
          className={`EditorMenuButton`}>
          <TbTableFilled size="1.2rem" />
        </div>
      </Tippy>

      <Tippy content="Toggle Header Column">
        <div
          onClick={() => editor?.chain().focus().toggleHeaderColumn().run()}
          className={`EditorMenuButton`}>
          <RiLayoutColumnFill size="1.2rem" />
        </div>
      </Tippy>

      <Tippy content="Toggle Header Row">
        <div
          onClick={() => editor?.chain().focus().toggleHeaderRow().run()}
          className={`EditorMenuButton`}>
          <RiLayoutRowFill size="1.2rem" />
        </div>
      </Tippy>

      <Tippy content="Fix Table">
        <div
          onClick={() => editor?.chain().focus().fixTables().run()}
          className={`EditorMenuButton`}>
          <TbTableOptions size="1.2rem" />
        </div>
      </Tippy>
      <div className="EditorMenuDivider"></div>

      {/*image, link and Youtube*/}
      <Tippy content="Insert Image URL">
        <div className={`EditorMenuButton`}>
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
                <div className="PopupMain">
                  <input
                    style={{
                      width: '80%',
                    }}
                    ref={image}
                    type="text"
                    placeholder="Insert a valid Image URL..."
                  />
                  <button
                    onClick={() => {
                      editor
                        ?.chain()
                        .focus()
                        .setImage({ src: image.current?.value ?? '' })
                        .run();
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
        <div className={`EditorMenuButton`}>
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
                <div className="PopupMain">
                  <input
                    style={{
                      width: '80%',
                    }}
                    ref={link}
                    type="text"
                    placeholder="Insert a valid Link..."
                  />
                  <button
                    onClick={() => {
                      editor
                        ?.chain()
                        .focus()
                        .setLink({
                          href: link.current?.value ?? '',
                          target: '_blank',
                        })
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

      <Tippy content="Add Youtube Video">
        <div className={`EditorMenuButton`}>
          <Popup
            trigger={
              <button className={`EditorMenuButton`}>
                <TbBrandYoutube size="1.25rem" />
              </button>
            }
            nested
            modal>
            {(close: any) => {
              return (
                <div className="PopupMain">
                  <input
                    style={{
                      width: '80%',
                    }}
                    type="text"
                    placeholder="Insert a Youtube video URL..."
                    ref={yt}
                  />
                  <div
                    style={{
                      width: '80%',
                      display: 'flex',
                      justifyContent: 'space-around',
                      flexWrap: 'wrap',
                    }}>
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        marginTop: '0.25rem',
                      }}>
                      Width:
                      <input
                        type="number"
                        min="320"
                        max="1024"
                        placeholder="in px"
                        ref={ytw}
                      />
                    </div>
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        marginTop: '0.25rem',
                      }}>
                      Height:
                      <input
                        type="number"
                        min="180"
                        max="720"
                        placeholder="in px"
                        ref={yth}
                      />
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      editor
                        ?.chain()
                        .focus()
                        .setYoutubeVideo({
                          src: yt.current?.value ?? '',
                          width:
                            Math.max(
                              320,
                              parseInt(ytw.current?.value ?? '', 10)
                            ) || 640,
                          height:
                            Math.max(
                              180,
                              parseInt(yth.current?.value ?? '', 10)
                            ) || 480,
                        })
                        .run();
                      close();
                    }}
                    className="InsertImgBtn">
                    Add Youtube Video
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
