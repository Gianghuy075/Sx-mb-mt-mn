/**
 * TipTap Editor Toolbar Component
 */

'use client';

import { Editor } from '@tiptap/react';
import { useState } from 'react';
import styles from './EditorToolbar.module.css';

interface EditorToolbarProps {
  editor: Editor;
}

export default function EditorToolbar({ editor }: EditorToolbarProps) {
  const [showImageDialog, setShowImageDialog] = useState(false);
  const [showLinkDialog, setShowLinkDialog] = useState(false);
  const [imageUrl, setImageUrl] = useState('');
  const [linkUrl, setLinkUrl] = useState('');

  const addImage = async () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';

    input.onchange = async (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (!file) return;

      const formData = new FormData();
      formData.append('file', file);

      try {
        const response = await fetch('/api/admin/upload', {
          method: 'POST',
          body: formData,
        });

        const data = await response.json();

        if (response.ok) {
          editor.chain().focus().setImage({ src: data.url }).run();
        } else {
          alert('Upload failed: ' + data.error);
        }
      } catch (error) {
        alert('Upload failed');
      }
    };

    input.click();
  };

  const addImageFromUrl = () => {
    if (imageUrl) {
      editor.chain().focus().setImage({ src: imageUrl }).run();
      setImageUrl('');
      setShowImageDialog(false);
    }
  };

  const addLink = () => {
    if (linkUrl) {
      editor.chain().focus().setLink({ href: linkUrl }).run();
      setLinkUrl('');
      setShowLinkDialog(false);
    }
  };

  const insertTable = () => {
    editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run();
  };

  return (
    <div className={styles.toolbar}>
      {/* Text Formatting */}
      <div className={styles.toolbarGroup}>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={`${styles.toolbarButton} ${editor.isActive('bold') ? styles.active : ''}`}
          title="Bold (Ctrl+B)"
        >
          <strong>B</strong>
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={`${styles.toolbarButton} ${editor.isActive('italic') ? styles.active : ''}`}
          title="Italic (Ctrl+I)"
        >
          <em>I</em>
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          className={`${styles.toolbarButton} ${editor.isActive('underline') ? styles.active : ''}`}
          title="Underline (Ctrl+U)"
        >
          <u>U</u>
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleStrike().run()}
          className={`${styles.toolbarButton} ${editor.isActive('strike') ? styles.active : ''}`}
          title="Strikethrough"
        >
          <s>S</s>
        </button>
      </div>

      {/* Headings */}
      <div className={styles.toolbarGroup}>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
          className={`${styles.toolbarButton} ${editor.isActive('heading', { level: 1 }) ? styles.active : ''}`}
          title="Heading 1"
        >
          H1
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          className={`${styles.toolbarButton} ${editor.isActive('heading', { level: 2 }) ? styles.active : ''}`}
          title="Heading 2"
        >
          H2
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
          className={`${styles.toolbarButton} ${editor.isActive('heading', { level: 3 }) ? styles.active : ''}`}
          title="Heading 3"
        >
          H3
        </button>
      </div>

      {/* Lists */}
      <div className={styles.toolbarGroup}>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={`${styles.toolbarButton} ${editor.isActive('bulletList') ? styles.active : ''}`}
          title="Bullet List"
        >
          •
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={`${styles.toolbarButton} ${editor.isActive('orderedList') ? styles.active : ''}`}
          title="Numbered List"
        >
          1.
        </button>
      </div>

      {/* Alignment */}
      <div className={styles.toolbarGroup}>
        <button
          type="button"
          onClick={() => editor.chain().focus().setTextAlign('left').run()}
          className={`${styles.toolbarButton} ${editor.isActive({ textAlign: 'left' }) ? styles.active : ''}`}
          title="Align Left"
        >
          ⬅
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().setTextAlign('center').run()}
          className={`${styles.toolbarButton} ${editor.isActive({ textAlign: 'center' }) ? styles.active : ''}`}
          title="Align Center"
        >
          ⬌
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().setTextAlign('right').run()}
          className={`${styles.toolbarButton} ${editor.isActive({ textAlign: 'right' }) ? styles.active : ''}`}
          title="Align Right"
        >
          ➡
        </button>
      </div>

      {/* Insert */}
      <div className={styles.toolbarGroup}>
        <button
          type="button"
          onClick={() => setShowLinkDialog(true)}
          className={styles.toolbarButton}
          title="Insert Link"
        >
          🔗
        </button>
        <button type="button" onClick={addImage} className={styles.toolbarButton} title="Upload Image">
          🖼️
        </button>
        <button
          type="button"
          onClick={() => setShowImageDialog(true)}
          className={styles.toolbarButton}
          title="Insert Image URL"
        >
          📷
        </button>
        <button type="button" onClick={insertTable} className={styles.toolbarButton} title="Insert Table">
          ⊞
        </button>
      </div>

      {/* Link Dialog */}
      {showLinkDialog && (
        <div className={styles.dialog}>
          <input
            type="url"
            placeholder="Enter URL"
            value={linkUrl}
            onChange={(e) => setLinkUrl(e.target.value)}
            className={styles.dialogInput}
          />
          <button type="button" onClick={addLink} className={styles.dialogButton}>
            Add
          </button>
          <button type="button" onClick={() => setShowLinkDialog(false)} className={styles.dialogButton}>
            Cancel
          </button>
        </div>
      )}

      {/* Image URL Dialog */}
      {showImageDialog && (
        <div className={styles.dialog}>
          <input
            type="url"
            placeholder="Enter Image URL"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            className={styles.dialogInput}
          />
          <button type="button" onClick={addImageFromUrl} className={styles.dialogButton}>
            Add
          </button>
          <button type="button" onClick={() => setShowImageDialog(false)} className={styles.dialogButton}>
            Cancel
          </button>
        </div>
      )}
    </div>
  );
}
