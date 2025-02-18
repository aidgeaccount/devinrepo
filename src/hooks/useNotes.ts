import { useState } from 'react';
import { Note } from '../types';

export const useNotes = (initialNotes: Note[] = []) => {
  const [notes, setNotes] = useState<Note[]>(initialNotes);
  
  const addNote = (note: Partial<Note>) => {
    setNotes([
      {
        id: Date.now(),
        title: note.title || '',
        content: note.content || '',
        reminder: note.reminder,
      },
      ...notes,
    ]);
  };

  const updateNote = (id: number, updatedNote: Partial<Note>) => {
    setNotes(notes.map(note => 
      note.id === id ? { ...note, ...updatedNote } : note
    ));
  };

  const deleteNote = (id: number) => {
    setNotes(notes.filter(note => note.id !== id));
  };

  return { notes, addNote, updateNote, deleteNote };
};
