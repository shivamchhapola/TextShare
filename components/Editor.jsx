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
  RxEnterFullScreen,
  RxExitFullScreen,
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
import Popup from 'reactjs-popup';
import Tippy from '@tippyjs/react';

export default function RichEditor({ setHTML, initHTML }) {
  //open extened menu
  const [exMenuOpen, setExMenuOpen] = useState(false);

  //Editor ref for fullscreen
  const editorRef = useRef();

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
      ref={editorRef}
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
        editorRef={editorRef}
      />
      <div
        className={Styles.Content}
        onClick={() => {
          editor?.chain().focus().run();
        }}>
        <EditorContent editor={editor} />
      </div>
    </div>
  );
}

function EditorMenu({ editor, setExMenuOpen, exMenuOpen, editorRef }) {
  const image = useRef(null);
  const link = useRef(null);
  const yt = useRef(null);
  const ytw = useRef(null);
  const yth = useRef(null);

  const [isFullScreen, setIsFullScreen] = useState(false);

  const toggleFullScreen = () => {
    const element = editorRef.current;

    if (!isFullScreen) {
      if (element.requestFullscreen) {
        element.requestFullscreen();
      } else if (element.mozRequestFullScreen) {
        // Firefox
        element.mozRequestFullScreen();
      } else if (element.webkitRequestFullscreen) {
        // Chrome, Safari, and Opera
        element.webkitRequestFullscreen();
      } else if (element.msRequestFullscreen) {
        // Internet Explorer/Edge
        element.msRequestFullscreen();
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.mozCancelFullScreen) {
        // Firefox
        document.mozCancelFullScreen();
      } else if (document.webkitExitFullscreen) {
        // Chrome, Safari, and Opera
        document.webkitExitFullscreen();
      } else if (document.msExitFullscreen) {
        // Internet Explorer/Edge
        document.msExitFullscreen();
      }
    }
  };

  const handleFullScreenChange = () => {
    setIsFullScreen(
      document.fullscreenElement ||
        document.mozFullScreenElement ||
        document.webkitFullscreenElement ||
        document.msFullscreenElement
    );
  };

  useEffect(() => {
    document.addEventListener('fullscreenchange', handleFullScreenChange);
    document.addEventListener('mozfullscreenchange', handleFullScreenChange);
    document.addEventListener('webkitfullscreenchange', handleFullScreenChange);
    document.addEventListener('msfullscreenchange', handleFullScreenChange);

    return () => {
      document.removeEventListener('fullscreenchange', handleFullScreenChange);
      document.removeEventListener(
        'mozfullscreenchange',
        handleFullScreenChange
      );
      document.removeEventListener(
        'webkitfullscreenchange',
        handleFullScreenChange
      );
      document.removeEventListener(
        'msfullscreenchange',
        handleFullScreenChange
      );
    };
  }, []);

  return (
    <div className={Styles.EditorMenu}>
      {/*Undo and Redo*/}
      <div content="Undo">
        <div
          onClick={() => editor?.chain().focus().undo().run()}
          className={`${Styles.EditorMenuButton} ${
            !editor?.can().undo() ? Styles.EditorMenuButtonDeactive : ''
          }`}>
          <MdUndo size="1.25rem" />
        </div>
      </div>
      <div content="Redo">
        <div
          onClick={() => editor?.chain().focus().redo().run()}
          className={`${Styles.EditorMenuButton} ${
            !editor?.can().redo() ? Styles.EditorMenuButtonDeactive : ''
          }`}>
          <MdRedo size="1.25rem" />
        </div>
      </div>
      <div className={Styles.EditorMenuDivider}></div>

      {/*Bold, Italic and underline*/}
      <div content="Bold">
        <div
          onClick={() => editor?.chain().focus().toggleBold().run()}
          className={`${Styles.EditorMenuButton} ${
            editor?.isActive('bold') ? Styles.EditorMenuButtonActive : ''
          }`}>
          <RxFontBold size="1.25rem" />
        </div>
      </div>

      <div content="Italic">
        <div
          onClick={() => editor?.chain().focus().toggleItalic().run()}
          className={`${Styles.EditorMenuButton} ${
            editor?.isActive('italic') ? Styles.EditorMenuButtonActive : ''
          }`}>
          <RxFontItalic size="1.25rem" />
        </div>
      </div>

      <div content="Underline">
        <div
          onClick={() => editor?.chain().focus().toggleUnderline().run()}
          className={`${Styles.EditorMenuButton} ${
            editor?.isActive('underline') ? Styles.EditorMenuButtonActive : ''
          }`}>
          <RxUnderline size="1.25rem" />
        </div>
      </div>
      <div className={Styles.EditorMenuDivider}></div>

      {/*Text Align*/}
      <div content="Left">
        <div
          onClick={() => editor?.chain().focus().setTextAlign('left').run()}
          className={`${Styles.EditorMenuButton} ${
            editor?.isActive({ textAlign: 'left' })
              ? Styles.EditorMenuButtonActive
              : ''
          }`}>
          <RxTextAlignLeft size="1.2rem" />
        </div>
      </div>

      <div content="Center">
        <div
          onClick={() => editor?.chain().focus().setTextAlign('center').run()}
          className={`${Styles.EditorMenuButton} ${
            editor?.isActive({ textAlign: 'center' })
              ? Styles.EditorMenuButtonActive
              : ''
          }`}>
          <RxTextAlignCenter size="1.2rem" />
        </div>
      </div>

      <div content="Right">
        <div
          onClick={() => editor?.chain().focus().setTextAlign('right').run()}
          className={`${Styles.EditorMenuButton} ${
            editor?.isActive({ textAlign: 'right' })
              ? Styles.EditorMenuButtonActive
              : ''
          }`}>
          <RxTextAlignRight size="1.2rem" />
        </div>
      </div>

      <div content="Justify">
        <div
          onClick={() => editor?.chain().focus().setTextAlign('justify').run()}
          className={`${Styles.EditorMenuButton} ${
            editor?.isActive({ textAlign: 'justify' })
              ? Styles.EditorMenuButtonActive
              : ''
          }`}>
          <RxTextAlignJustify size="1.2rem" />
        </div>
      </div>
      <div className={Styles.EditorMenuDivider}></div>

      {/*Strikethrough, Sub and Superscript*/}
      <div content="Strikethrough">
        <div
          onClick={() => editor?.chain().focus().toggleStrike().run()}
          className={`${Styles.EditorMenuButton} ${
            editor?.isActive('strike') ? Styles.EditorMenuButtonActive : ''
          }`}>
          <RxStrikethrough size="1.25rem" />
        </div>
      </div>

      <div content="Subscript">
        <div
          onClick={() => editor?.chain().focus().toggleSubscript().run()}
          className={`${Styles.EditorMenuButton} ${
            editor?.isActive('subscript') ? Styles.EditorMenuButtonActive : ''
          }`}>
          <LuSubscript size="1.25rem" />
        </div>
      </div>

      <div content="Superscript">
        <div
          onClick={() => editor?.chain().focus().toggleSuperscript().run()}
          className={`${Styles.EditorMenuButton} ${
            editor?.isActive('superscript') ? Styles.EditorMenuButtonActive : ''
          }`}>
          <LuSuperscript size="1.25rem" />
        </div>
      </div>
      <div className={Styles.EditorMenuDivider}></div>

      {/*Color and Text Heading*/}
      <div content="Text Color">
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
      </div>

      <div content="Highlight">
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
      </div>

      <div content="Heading">
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
      </div>
      <div className={Styles.EditorMenuDivider}></div>

      {/*Lists*/}
      <div content="Toggle Bullet List">
        <div
          onClick={() => editor?.chain().focus().toggleBulletList().run()}
          className={`${Styles.EditorMenuButton} ${
            editor?.isActive('bulletList') ? Styles.EditorMenuButtonActive : ''
          }`}>
          <MdFormatListBulleted size="1.25rem" />
        </div>
      </div>

      <div content="Toggle Ordered List">
        <div
          onClick={() => editor?.chain().focus().toggleOrderedList().run()}
          className={`${Styles.EditorMenuButton} ${
            editor?.isActive('orderedList') ? Styles.EditorMenuButtonActive : ''
          }`}>
          <MdFormatListNumbered size="1.25rem" />
        </div>
      </div>

      <div content="Add Item">
        <div
          onClick={() =>
            editor?.chain().focus().splitListItem('listItem').run()
          }
          className={Styles.EditorMenuButton}>
          <MdFormatListBulletedAdd size="1.25rem" />
        </div>
      </div>

      <div content="Sink List">
        <div
          onClick={() => editor?.chain().focus().sinkListItem('listItem').run()}
          className={Styles.EditorMenuButton}>
          <BsListNested size="1.25rem" />
        </div>
      </div>

      <div content="Lift List">
        <div
          onClick={() => editor?.chain().focus().liftListItem('listItem').run()}
          className={Styles.EditorMenuButton}>
          <LuListTree size="1.25rem" />
        </div>
      </div>
      <div className={Styles.EditorMenuDivider}></div>

      {/*Blockquote, Code and CodeBlock*/}
      <div content="Blockquote">
        <div
          onClick={() => editor?.chain().focus().toggleBlockquote().run()}
          className={`${Styles.EditorMenuButton} ${
            editor?.isActive('blockquote') ? Styles.EditorMenuButtonActive : ''
          }`}>
          <TbBlockquote size="1.25rem" />
        </div>
      </div>

      <div content="Horizontal Rule">
        <div
          onClick={() => editor?.chain().focus().setHorizontalRule().run()}
          className={Styles.EditorMenuButton}>
          <MdHorizontalRule size="1.25rem" />
        </div>
      </div>

      <div content="Code">
        <div
          onClick={() => editor?.chain().focus().toggleCode().run()}
          className={`${Styles.EditorMenuButton} ${
            editor?.isActive('code') ? Styles.EditorMenuButtonActive : ''
          }`}>
          <MdCode size="1.25rem" />
        </div>
      </div>

      <div content="Codeblock">
        <div
          onClick={() => editor?.chain().focus().toggleCodeBlock().run()}
          className={`${Styles.EditorMenuButton} ${
            editor?.isActive('codeBlock') ? Styles.EditorMenuButtonActive : ''
          }`}>
          <MdTerminal size="1.25rem" />
        </div>
      </div>

      <div content="Hardbreak">
        <div
          onClick={() => editor?.chain().focus().setHardBreak().run()}
          className={Styles.EditorMenuButton}>
          <VscNewline size="1.25rem" />
        </div>
      </div>
      <div className={Styles.EditorMenuDivider}></div>

      {/*Table Stuff*/}
      <div content="Insert Table">
        <div
          onClick={() =>
            editor
              ?.chain()
              .focus()
              .insertTable({ rows: 3, cols: 3, withHeaderRow: true })
              .run()
          }
          className={Styles.EditorMenuButton}>
          <TbTablePlus size="1.125rem" />
        </div>
      </div>

      <div content="Add Column before">
        <div
          onClick={() => editor?.chain().focus().addColumnBefore().run()}
          className={Styles.EditorMenuButton}>
          <RiInsertColumnLeft size="1.2rem" />
        </div>
      </div>

      <div content="Add Column after">
        <div
          onClick={() => editor?.chain().focus().addColumnAfter().run()}
          className={Styles.EditorMenuButton}>
          <RiInsertColumnRight size="1.2rem" />
        </div>
      </div>

      <div content="Remove Column">
        <div
          onClick={() => editor?.chain().focus().deleteColumn().run()}
          className={Styles.EditorMenuButton}>
          <RiDeleteColumn size="1.2rem" />
        </div>
      </div>

      <div content="Add Row before">
        <div
          onClick={() => editor?.chain().focus().addRowBefore().run()}
          className={Styles.EditorMenuButton}>
          <RiInsertRowTop size="1.2rem" />
        </div>
      </div>

      <div content="Add Row after">
        <div
          onClick={() => editor?.chain().focus().addRowAfter().run()}
          className={Styles.EditorMenuButton}>
          <RiInsertRowBottom size="1.2rem" />
        </div>
      </div>

      <div content="Remove Row">
        <div
          onClick={() => editor?.chain().focus().deleteRow().run()}
          className={Styles.EditorMenuButton}>
          <RiDeleteRow size="1.2rem" />
        </div>
      </div>

      <div content="Remove Table">
        <div
          onClick={() => editor?.chain().focus().deleteTable().run()}
          className={Styles.EditorMenuButton}>
          <TbTableOff size="1.2rem" />
        </div>
      </div>

      <div content="Merge or Split Cell">
        <div
          onClick={() => editor?.chain().focus().mergeOrSplit().run()}
          className={Styles.EditorMenuButton}>
          <TbLayoutBoardSplit size="1.2rem" />
        </div>
      </div>

      <div content="Toggle Header Cell">
        <div
          onClick={() => editor?.chain().focus().toggleHeaderCell().run()}
          className={Styles.EditorMenuButton}>
          <TbTableFilled size="1.2rem" />
        </div>
      </div>

      <div content="Toggle Header Column">
        <div
          onClick={() => editor?.chain().focus().toggleHeaderColumn().run()}
          className={Styles.EditorMenuButton}>
          <RiLayoutColumnFill size="1.2rem" />
        </div>
      </div>

      <div content="Toggle Header Row">
        <div
          onClick={() => editor?.chain().focus().toggleHeaderRow().run()}
          className={Styles.EditorMenuButton}>
          <RiLayoutRowFill size="1.2rem" />
        </div>
      </div>

      <div content="Fix Table">
        <div
          onClick={() => editor?.chain().focus().fixTables().run()}
          className={Styles.EditorMenuButton}>
          <TbTableOptions size="1.2rem" />
        </div>
      </div>
      <div className={Styles.EditorMenuDivider}></div>

      {/*image, link and Youtube*/}
      <div content="Insert an Image">
        <div className={Styles.EditorMenuButton}>
          <Popup
            trigger={
              <button className={Styles.EditorMenuButton}>
                <MdImage size="1.25rem" />
              </button>
            }
            nested
            modal>
            {(close) => {
              return (
                <div className={Styles.PopupMain}>
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
                    className={Styles.InsertImgBtn}>
                    Insert
                  </button>
                </div>
              );
            }}
          </Popup>
        </div>
      </div>

      <div content="Add a Link">
        <div className={Styles.EditorMenuButton}>
          <Popup
            trigger={
              <button className={Styles.EditorMenuButton}>
                <MdLink size="1.25rem" />
              </button>
            }
            nested
            modal>
            {(close) => {
              return (
                <div className={Styles.PopupMain}>
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
                    className={Styles.InsertImgBtn}>
                    Link
                  </button>
                </div>
              );
            }}
          </Popup>
        </div>
      </div>

      <div content="Insert Youtube Video">
        <div className={Styles.EditorMenuButton}>
          <Popup
            trigger={
              <button className={Styles.EditorMenuButton}>
                <TbBrandYoutube size="1.25rem" />
              </button>
            }
            nested
            modal>
            {(close) => {
              return (
                <div className={Styles.PopupMain}>
                  <input
                    style={{
                      width: '80%',
                      borderRadius: '0.25rem',
                    }}
                    type="text"
                    placeholder="Insert a valid Youtube video URL..."
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
                    className={Styles.InsertImgBtn}>
                    Add Youtube Video
                  </button>
                </div>
              );
            }}
          </Popup>
        </div>
      </div>
      <div className={Styles.EditorMenuDivider}></div>

      {/*Fullscreen*/}
      <div content="Fullscreen Toggle">
        <div
          onClick={toggleFullScreen}
          className={`${Styles.EditorMenuButton}`}>
          {isFullScreen ? (
            <RxExitFullScreen size="1.2rem" />
          ) : (
            <RxEnterFullScreen size="1.2rem" />
          )}
        </div>
      </div>

      {/*Extend menu*/}
      <div content="More Stuff">
        <div
          onClick={() => setExMenuOpen(!exMenuOpen)}
          className={`${Styles.EditorMenuButton} ${Styles.ExBtn}`}>
          {exMenuOpen ? (
            <RxTriangleUp size="1.25rem" />
          ) : (
            <RxTriangleDown size="1.25rem" />
          )}
        </div>
      </div>
    </div>
  );
}
