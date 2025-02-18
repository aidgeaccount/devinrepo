import { useState } from 'react';
import { Plus, Folder } from 'lucide-react';
import { Note } from "./types";
import { Button } from './components/ui/button';
import { Dialog, DialogContent, DialogTrigger } from './components/ui/dialog';
import { useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { Layout } from './components/Layout';
import { SearchBar } from './components/SearchBar';
import { NoteEditor } from './components/NoteEditor';
import { NotesGrid } from './components/Note/NotesGrid';
import { useNotes } from './hooks/useNotes';
import { useTags } from './hooks/useTags';
import { useReminders } from './hooks/useReminders';
import { useSearch } from './hooks/useSearch';

function App() {
  const [isOpen, setIsOpen] = useState(false)
  const [title, setTitle] = useState('')
  const [editingNote, setEditingNote] = useState<Note | null>(null)



  const { notes, addNote, updateNote, deleteNote } = useNotes([
    { id: 1, title: 'Welcome Note', content: 'Welcome to Google Keep Clone!' },
    { id: 2, title: 'Shopping List', content: 'Milk, Eggs, Bread' },
    { id: 3, title: '買い物リスト', content: '牛乳、卵、パン' },
    { id: 4, title: '购物清单', content: '牛奶、鸡蛋、面包' }
  ])

  const { selectedTags, toggleTag, extractTags } = useTags();
  const { reminderDate, reminderTime, setReminderDate, setReminderTime, toggleReminder } = useReminders();
  const { searchTerm, setSearchTerm, filteredNotes } = useSearch(notes, selectedTags);

  const renderContent = (content: string): string => {
    return content.replace(
      /#[\p{L}\p{N}_-]+/gu,
      match => `<span class="inline-flex items-center px-2 py-0.5 rounded-sm text-xs font-medium bg-gray-50 text-gray-600 border border-gray-200 hover:bg-gray-100">${match}</span>`
    )
  };

  const editor = useEditor({
    extensions: [StarterKit],
    content: '',
  });

  const categories = [
    { id: 1, name: 'Notes', icon: <Folder className="w-4 h-4" /> },
    { id: 2, name: 'Reminders', icon: <Folder className="w-4 h-4" /> },
  ];

  // allTags is now handled by the Sidebar component

  return (
    <Layout
      categories={categories}
      selectedTags={selectedTags}
      allTags={Array.from(new Set(notes.flatMap(note => extractTags(note.content))))}
      onTagSelect={toggleTag}
    >
      <div className="mb-6 flex gap-2">
        <SearchBar searchTerm={searchTerm} onSearch={setSearchTerm} />
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              New Note
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[625px]">
            <NoteEditor
              title={title}
              onTitleChange={setTitle}
              reminderDate={reminderDate}
              reminderTime={reminderTime}
              onReminderDateChange={setReminderDate}
              onReminderTimeChange={setReminderTime}
              isEditing={!!editingNote}
              editor={editor}
              onSave={() => {
                if (title && editor?.getHTML()) {
                  const reminder = reminderDate && reminderTime ? {
                    date: reminderDate,
                    time: reminderTime,
                    completed: false,
                    due: true
                  } : undefined;

                  if (editingNote) {
                    updateNote(editingNote.id, {
                      title,
                      content: editor.getHTML(),
                      reminder
                    });
                  } else {
                    addNote({
                      title,
                      content: editor.getHTML(),
                      reminder
                    });
                  }
                  // Reset all form state
                  setReminderDate(undefined);
                  setReminderTime('');
                  setTitle('');
                  editor.commands.setContent('');
                  setEditingNote(null);
                  setIsOpen(false);
                }
              }}
            />
          </DialogContent>
        </Dialog>
      </div>

      <NotesGrid
        notes={filteredNotes}
        onEdit={(note) => {
          setTitle(note.title);
          editor?.commands.setContent(note.content);
          setEditingNote(note);
          setIsOpen(true);
        }}
        onDelete={deleteNote}
        onToggleReminder={(id) => toggleReminder(notes, (notes) => updateNote(id, { reminder: { ...notes.find(n => n.id === id)?.reminder!, completed: !notes.find(n => n.id === id)?.reminder?.completed } }))}
        selectedTags={selectedTags}
        onTagClick={toggleTag}
        renderContent={renderContent}
        extractTags={extractTags}
      />
    </Layout>
  )
}

export default App
