import { ReactNode } from 'react';

export type { ReactNode };

export interface Note {
  id: number;
  title: string;
  content: string;
  reminder?: {
    date: Date;
    time: string;
    completed: boolean;
    due?: boolean;
  };
}

export interface Category {
  id: number;
  name: string;
  icon: ReactNode;
}
