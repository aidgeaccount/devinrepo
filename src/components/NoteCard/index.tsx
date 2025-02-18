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
    <Card className="group relative flex flex-col min-h-[10rem] p-4 pb-16 
      transition-all duration-200 ease-in-out
      hover:shadow-lg hover:scale-[1.02]
      dark:bg-gray-800 dark:text-gray-100
      focus-within:ring-2 focus-within:ring-primary">
      <h3 className="font-semibold mb-3 text-lg tracking-tight">{note.title}</h3>
      <div className="flex flex-col gap-3 flex-grow">
        <div 
          className="text-muted-foreground dark:text-gray-300 whitespace-pre-line break-words overflow-hidden relative max-h-72 prose prose-sm"
          dangerouslySetInnerHTML={{ __html: renderContent(note.content) }} 
        />
        <div className="flex flex-wrap gap-2 mt-3">
          {extractTags(note.content).map(tag => (
            <button
              key={tag}
              onClick={(e) => {
                e.stopPropagation();
                onTagClick(tag);
              }}
              className={`text-xs px-2.5 py-1 rounded-md transition-colors duration-200 font-medium ${
                selectedTags.has(tag)
                  ? 'bg-primary/10 text-primary border border-primary/20 dark:bg-primary/20'
                  : 'bg-secondary text-secondary-foreground border border-secondary hover:bg-secondary/80 dark:border-gray-700'
              }`}
            >
              #{tag}
            </button>
          ))}
        </div>
      </div>
      <div className="absolute bottom-12 left-0 right-0 h-12 bg-gradient-to-t from-background to-transparent dark:from-gray-800 pointer-events-none" />
      {note.reminder && (
        <div className="absolute top-3 right-3 flex items-center gap-2 text-xs text-muted-foreground dark:text-gray-400">
          <CalendarIcon className="h-4 w-4" />
          <span className={note.reminder.due ? 'text-destructive font-medium dark:text-red-400' : ''}>
            Due: {format(note.reminder.date, "PPP")} {note.reminder.time}
          </span>
          <Button
            variant="ghost"
            size="sm"
            onClick={(e) => {
              e.stopPropagation();
              onToggleReminder(note.id);
            }}
            className="hover:bg-secondary dark:hover:bg-gray-700"
          >
            <Check className={`h-4 w-4 ${note.reminder.completed ? 'text-primary dark:text-primary-foreground' : 'text-muted-foreground dark:text-gray-500'}`} />
          </Button>
        </div>
      )}
      <div className="absolute bottom-3 right-3 flex gap-2 
        opacity-0 translate-y-2
        group-hover:opacity-100 group-hover:translate-y-0
        transition-all duration-200 ease-out">
        <Button 
          variant="ghost" 
          size="sm"
          onClick={() => onEdit(note)}
          className="hover:bg-secondary dark:hover:bg-gray-700"
        >
          <Pencil className="h-4 w-4" />
        </Button>
        <Button 
          variant="destructive" 
          size="sm"
          onClick={() => onDelete(note.id)}
          className="hover:bg-destructive/90"
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
    </Card>
  );
};
