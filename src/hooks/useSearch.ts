import { useState, useMemo } from 'react';
import { Note } from '../types';

export const useSearch = (notes: Note[], selectedTags: Set<string>) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredNotes = useMemo(() => {
    return notes.filter(note => {
      if (selectedTags.size > 0) {
        const noteTags = note.content.match(/#[\p{L}\p{N}_-]+/gu)?.map(tag => tag.slice(1)) || [];
        return Array.from(selectedTags).every(tag => noteTags.includes(tag));
      }
      if (!searchTerm) return true;
      const search = searchTerm.toLowerCase();
      return note.title.toLowerCase().includes(search) || 
             note.content.toLowerCase().includes(search);
    });
  }, [notes, selectedTags, searchTerm]);

  return {
    searchTerm,
    setSearchTerm,
    filteredNotes,
  };
};
