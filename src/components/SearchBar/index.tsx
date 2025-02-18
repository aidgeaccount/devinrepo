import { FC } from 'react';
import { Search } from 'lucide-react';
import { Input } from '../ui/input';

interface SearchBarProps {
  searchTerm: string;
  onSearch: (term: string) => void;
}

export const SearchBar: FC<SearchBarProps> = ({ searchTerm, onSearch }) => {
  return (
    <div className="relative flex-1">
      <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
      <Input
        placeholder="搜索笔记 / Search notes / メモを検索..."
        className="pl-10"
        value={searchTerm}
        onChange={(e) => onSearch(e.target.value)}
      />
    </div>
  );
};
