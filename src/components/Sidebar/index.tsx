import { Category } from '../../types';
import { Button } from '../ui/button';
import { Tag } from 'lucide-react';

interface SidebarProps {
  categories: Category[];
  selectedTags: Set<string>;
  allTags: string[];
  onTagSelect: (tag: string) => void;
}

export const Sidebar = ({
  categories,
  selectedTags,
  allTags,
  onTagSelect,
}: SidebarProps) => {
  return (
    <aside className="w-64 bg-white dark:bg-gray-900 border-r border-gray-200 
      dark:border-gray-800 p-6">
      <div className="space-y-6">
        {/* Categories */}
        <div className="space-y-2">
          <h2 className="text-sm uppercase tracking-wider text-gray-500 
            dark:text-gray-400 font-medium">Categories</h2>
          {categories.map(category => (
            <Button
              key={category.id}
              variant="ghost"
              className="w-full justify-start gap-2 text-muted-foreground 
                hover:text-foreground dark:text-gray-400 dark:hover:text-gray-200
                transition-colors duration-200"
            >
              {category.icon}
              {category.name}
            </Button>
          ))}
        </div>

        {/* Tags */}
        <div className="space-y-2">
          <h2 className="text-sm uppercase tracking-wider text-gray-500 
            dark:text-gray-400 font-medium">Tags</h2>
          {allTags.map(tag => (
            <Button
              key={tag}
              variant="ghost"
              className={`w-full justify-start gap-2 transition-colors duration-200 ${
                selectedTags.has(tag) 
                  ? 'bg-primary/10 text-primary dark:bg-primary/20 dark:text-primary-foreground' 
                  : 'text-muted-foreground hover:text-foreground dark:text-gray-400 dark:hover:text-gray-200'
              }`}
              onClick={() => onTagSelect(tag)}
            >
              <Tag className="w-4 h-4" />
              #{tag}
            </Button>
          ))}
        </div>
      </div>
    </aside>
  );
};
