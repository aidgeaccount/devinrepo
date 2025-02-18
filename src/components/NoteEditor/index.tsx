import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { EditorContent, useEditor } from '@tiptap/react';
import { ReminderPicker } from './ReminderPicker';
import { NoteToolbar } from '../Note/NoteToolbar';
import { DialogHeader, DialogTitle } from '../ui/dialog';

interface NoteEditorProps {
  title: string;
  onTitleChange: (title: string) => void;
  reminderDate: Date | undefined;
  reminderTime: string;
  onReminderDateChange: (date: Date | undefined) => void;
  onReminderTimeChange: (time: string) => void;
  onSave: () => void;
  isEditing: boolean;
  editor: ReturnType<typeof useEditor> | null;
}

export const NoteEditor = ({
  title,
  onTitleChange,
  reminderDate,
  reminderTime,
  onReminderDateChange,
  onReminderTimeChange,
  onSave,
  isEditing,
  editor,
}: NoteEditorProps) => {
  if (!editor) return null;

  return (
    <>
      <DialogHeader>
        <DialogTitle>{isEditing ? 'Edit Note' : 'Create New Note'}</DialogTitle>
      </DialogHeader>
      <div className="grid gap-4 py-4">
        <div className="space-y-4">
          <Input
            placeholder="Note Title"
            value={title}
            onChange={(e) => onTitleChange(e.target.value)}
          />
          <ReminderPicker
            date={reminderDate}
            time={reminderTime}
            onDateChange={onReminderDateChange}
            onTimeChange={onReminderTimeChange}
          />
        </div>
        <div className="border rounded-md overflow-hidden">
          <NoteToolbar editor={editor} />
          <EditorContent editor={editor} className="min-h-[200px] p-4" />
        </div>
        <Button onClick={onSave}>
          {isEditing ? 'Save Changes' : 'Create Note'}
        </Button>
      </div>
    </>
  );
};
