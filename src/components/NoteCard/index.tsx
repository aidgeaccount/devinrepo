import { Note } from '../../types';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { CalendarIcon, Check, Pencil, Trash2 } from 'lucide-react';
import { format } from 'date-fns';

interface NoteCardProps {
  note: Note;
  onEdit: (note: Note) => void;
  onDelete: (id: number) => void;
  onToggleReminder: (id: number) => void;
  selectedTags: Set<string>;
  onTagClick: (tag: string) => void;
  renderContent: (content: string) => string;
  extractTags: (content: string) => string[];
}

export const NoteCard = ({
  note,
  onEdit,
  onDelete,
  onToggleReminder,
  selectedTags,
  onTagClick,
  renderContent,
  extractTags,
}: NoteCardProps) => {
  return (
    <Card className="p-4 pb-16 relative group hover:shadow-lg transition-shadow min-h-40 flex flex-col">
      <h3 className="font-semibold mb-3">{note.title}</h3>
      <div className="flex flex-col gap-1 flex-grow">
        <div 
          className="text-gray-600 whitespace-pre-line break-words overflow-hidden relative max-h-72 prose prose-sm"
          dangerouslySetInnerHTML={{ __html: renderContent(note.content) }} 
        />
        <div className="flex flex-wrap gap-1.5 mt-3">
          {extractTags(note.content).map(tag => (
            <button
              key={tag}
              onClick={(e) => {
                e.stopPropagation();
                onTagClick(tag);
              }}
              className={`text-xs px-2 py-0.5 rounded transition-colors font-medium ${
                selectedTags.has(tag)
                  ? 'bg-blue-50 text-blue-600 border border-blue-200'
                  : 'bg-gray-50 text-gray-500 border border-gray-200 hover:bg-gray-100'
              }`}
            >
              #{tag}
            </button>
          ))}
        </div>
      </div>
      <div className="absolute bottom-12 left-0 right-0 h-12 bg-gradient-to-t from-white to-transparent pointer-events-none" />
      {note.reminder && (
        <div className="absolute top-3 right-3 flex items-center gap-2 text-xs text-gray-500">
          <CalendarIcon className="h-4 w-4" />
          <span className={note.reminder.due ? 'text-red-500 font-medium' : ''}>
            Due: {format(note.reminder.date, "PPP")} {note.reminder.time}
          </span>
          <Button
            variant="ghost"
            size="sm"
            onClick={(e) => {
              e.stopPropagation();
              onToggleReminder(note.id);
            }}
          >
            <Check className={`h-4 w-4 ${note.reminder.completed ? 'text-green-500' : 'text-gray-400'}`} />
          </Button>
        </div>
      )}
      <div className="absolute bottom-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
        <Button 
          variant="ghost" 
          size="sm"
          onClick={() => onEdit(note)}
        >
          <Pencil className="h-4 w-4" />
        </Button>
        <Button 
          variant="destructive" 
          size="sm"
          onClick={() => onDelete(note.id)}
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
    </Card>
  );
};
