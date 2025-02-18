import { FC } from 'react';
import { Bold, Italic, List, ListOrdered } from 'lucide-react';
import { Button } from '../../ui/button';
import { Editor } from '@tiptap/react';

interface NoteToolbarProps {
  editor: Editor;
}

export const NoteToolbar: FC<NoteToolbarProps> = ({ editor }) => {
  return (
    <div className="flex gap-1 p-2 border-b bg-muted">
      <Button
        size="sm"
        variant="ghost"
        onClick={() => editor.chain().focus().toggleBold().run()}
        className={editor.isActive('bold') ? 'bg-secondary' : ''}
      >
        <Bold className="h-4 w-4" />
      </Button>
      <Button
        size="sm"
        variant="ghost"
        onClick={() => editor.chain().focus().toggleItalic().run()}
        className={editor.isActive('italic') ? 'bg-secondary' : ''}
      >
        <Italic className="h-4 w-4" />
      </Button>
      <Button
        size="sm"
        variant="ghost"
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={editor.isActive('bulletList') ? 'bg-secondary' : ''}
      >
        <List className="h-4 w-4" />
      </Button>
      <Button
        size="sm"
        variant="ghost"
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={editor.isActive('orderedList') ? 'bg-secondary' : ''}
      >
        <ListOrdered className="h-4 w-4" />
      </Button>
    </div>
  );
};
