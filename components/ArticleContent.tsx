/**
 * Article Content Renderer
 * Renders TipTap JSON content as HTML
 */

'use client';

import { useMemo } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Link from '@tiptap/extension-link';
import Image from '@tiptap/extension-image';
import { Table } from '@tiptap/extension-table';
import TableRow from '@tiptap/extension-table-row';
import TableCell from '@tiptap/extension-table-cell';
import TableHeader from '@tiptap/extension-table-header';
import TextAlign from '@tiptap/extension-text-align';
import Underline from '@tiptap/extension-underline';

interface ArticleContentProps {
  content: string;
  className?: string;
}

export default function ArticleContent({ content, className }: ArticleContentProps) {
  // Try to parse JSON content
  const parsedContent = useMemo(() => {
    try {
      return JSON.parse(content);
    } catch (error) {
      return null;
    }
  }, [content]);

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3, 4],
        },
      }),
      Link.configure({
        openOnClick: true,
      }),
      Image,
      Table,
      TableRow,
      TableCell,
      TableHeader,
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
      Underline,
    ],
    content: parsedContent,
    editable: false,
    immediatelyRender: false,
  });

  // If content is not JSON, render as HTML string
  if (!parsedContent) {
    return <div className={className} dangerouslySetInnerHTML={{ __html: content }} />;
  }

  // If editor is not ready yet, return null (will render on next cycle)
  if (!editor) {
    return null;
  }

  return (
    <div className={className}>
      <EditorContent editor={editor} />
    </div>
  );
}
