import { useState } from 'react';

export const useTags = () => {
  const [selectedTags, setSelectedTags] = useState<Set<string>>(new Set());

  const extractTags = (content: string): string[] => {
    const matches = content.match(/#[\p{L}\p{N}_-]+/gu);
    return matches ? [...new Set(matches.map(tag => tag.slice(1)))].sort() : [];
  };

  const toggleTag = (tag: string) => {
    const newTags = new Set(selectedTags);
    if (selectedTags.has(tag)) {
      newTags.delete(tag);
    } else {
      newTags.add(tag);
    }
    setSelectedTags(newTags);
  };

  return {
    selectedTags,
    toggleTag,
    extractTags,
  };
};
