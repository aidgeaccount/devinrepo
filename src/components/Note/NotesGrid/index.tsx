import { FC } from 'react';
import { Note } from '../../../types';
import { NoteCard } from '../NoteCard';

interface NotesGridProps {
  notes: Note[];
  onEdit: (note: Note) => void;
  onDelete: (id: number) => void;
  onToggleReminder: (id: number) => void;
  selectedTags: Set<string>;
  onTagClick: (tag: string) => void;
  renderContent: (content: string) => string;
  extractTags: (content: string) => string[];
}

export const NotesGrid: FC<NotesGridProps> = ({
  notes,
  onEdit,
  onDelete,
  onToggleReminder,
  selectedTags,
  onTagClick,
  renderContent,
  extractTags,
}) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 
      gap-note-grid auto-rows-[minmax(10rem,auto)]">
      {notes.map(note => (
        <NoteCard
          key={note.id}
          note={note}
          onEdit={onEdit}
          onDelete={onDelete}
          onToggleReminder={onToggleReminder}
          selectedTags={selectedTags}
          onTagClick={onTagClick}
          renderContent={renderContent}
          extractTags={extractTags}
        />
      ))}
    </div>
  );
};
