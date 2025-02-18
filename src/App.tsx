import { useState } from 'react'
import { Search, Plus, Folder, Bold, Italic, List, ListOrdered } from 'lucide-react'
import { Note } from "./types/index"
import { Input } from './components/ui/input'
import { Button } from './components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './components/ui/dialog'
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { Sidebar } from './components/Sidebar'
import { NoteCard } from './components/NoteCard'
import { ReminderPicker } from './components/NoteEditor/ReminderPicker'
import { useNotes } from './hooks/useNotes'
import { useTags } from './hooks/useTags'
import { useReminders } from './hooks/useReminders'
import { useSearch } from './hooks/useSearch'

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
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar
        categories={categories}
        selectedTags={selectedTags}
        allTags={Array.from(new Set(notes.flatMap(note => extractTags(note.content))))}
        onTagSelect={toggleTag}
      />

      {/* Main Content */}
      <main className="flex-1 p-6">
        {/* Search Bar */}
        <div className="mb-6 flex gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input
              placeholder="搜索笔记 / Search notes / メモを検索..."
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                New Note
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[625px]">
              <DialogHeader>
                <DialogTitle>{editingNote ? 'Edit Note' : 'Create New Note'}</DialogTitle>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="space-y-4">
                  <Input
                    placeholder="Note Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                  <ReminderPicker
                    date={reminderDate}
                    time={reminderTime}
                    onDateChange={setReminderDate}
                    onTimeChange={setReminderTime}
                  />
                </div>
                <div className="border rounded-md overflow-hidden">
                  <div className="flex gap-1 p-2 border-b bg-gray-50">
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => editor?.chain().focus().toggleBold().run()}
                      className={editor?.isActive('bold') ? 'bg-gray-200' : ''}
                    >
                      <Bold className="h-4 w-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => editor?.chain().focus().toggleItalic().run()}
                      className={editor?.isActive('italic') ? 'bg-gray-200' : ''}
                    >
                      <Italic className="h-4 w-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => editor?.chain().focus().toggleBulletList().run()}
                      className={editor?.isActive('bulletList') ? 'bg-gray-200' : ''}
                    >
                      <List className="h-4 w-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => editor?.chain().focus().toggleOrderedList().run()}
                      className={editor?.isActive('orderedList') ? 'bg-gray-200' : ''}
                    >
                      <ListOrdered className="h-4 w-4" />
                    </Button>
                  </div>
                  <EditorContent editor={editor} className="min-h-[200px] p-4" />
                </div>
                <Button onClick={() => {
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
                }}>
                  {editingNote ? 'Save Changes' : 'Create Note'}
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Notes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredNotes.map(note => (
            <NoteCard
              key={note.id}
              note={note}
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
          ))}
        </div>
      </main>
    </div>
  )
}

export default App
