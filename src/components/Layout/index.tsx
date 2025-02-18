import { ReactNode } from 'react';
import { Sidebar } from '../Sidebar';
import { Category } from '../../types';

interface LayoutProps {
  children: ReactNode;
  categories: Category[];
  selectedTags: Set<string>;
  allTags: string[];
  onTagSelect: (tag: string) => void;
}

export const Layout = ({
  children,
  categories,
  selectedTags,
  allTags,
  onTagSelect,
}: LayoutProps) => {
  return (
    <div className="flex h-screen bg-background">
      <Sidebar
        categories={categories}
        selectedTags={selectedTags}
        allTags={allTags}
        onTagSelect={onTagSelect}
      />
      <main className="flex-1 p-6">
        {children}
      </main>
    </div>
  );
};
