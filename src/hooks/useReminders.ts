import { useState } from 'react';
import { Note } from '../types';

export const useReminders = () => {
  const [reminderDate, setReminderDate] = useState<Date | undefined>();
  const [reminderTime, setReminderTime] = useState('');

  const toggleReminder = (notes: Note[], setNotes: (notes: Note[]) => void) => (id: number) => {
    setNotes(notes.map(note => 
      note.id === id && note.reminder
        ? { ...note, reminder: { ...note.reminder, completed: !note.reminder.completed } }
        : note
    ));
  };

  return {
    reminderDate,
    reminderTime,
    setReminderDate,
    setReminderTime,
    toggleReminder,
  };
};
