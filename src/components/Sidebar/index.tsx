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
    <aside className="w-64 bg-white border-r p-4">
      <div className="space-y-4">
        {/* Categories */}
        <div>
          <h2 className="font-semibold mb-2">Categories</h2>
          {categories.map(category => (
            <Button
              key={category.id}
              variant="ghost"
              className="w-full justify-start gap-2 mb-1"
            >
              {category.icon}
              {category.name}
            </Button>
          ))}
        </div>

        {/* Tags */}
        <div>
          <h2 className="font-semibold mb-2">Tags</h2>
          {allTags.map(tag => (
            <Button
              key={tag}
              variant="ghost"
              className={`w-full justify-start gap-2 mb-1 ${
                selectedTags.has(tag) ? 'bg-blue-50 text-blue-600' : ''
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
