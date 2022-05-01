import React, { useState } from 'react';
import SearchInput from './SearchInput';
import SearchList from './SearchList';

export interface searchKeyword {
  id: number;
  keyword: string;
}

const Search: React.FC = () => {
  const [keyword, setKeyword] = useState<string>('');
  const [keywords, setKeywords] = useState<searchKeyword[]>([]);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleAddKeyword = (e: React.FormEvent) => {
    e.preventDefault();
    if (keyword) {
      const preKeyword = keywords.find(
        (keywordData) => keywordData.keyword === keyword
      );
      if (!preKeyword) {
        setKeywords([{ id: Date.now(), keyword }, ...keywords]);
      }
    }
  };

  const handleRemoveKeyword = (id: number) => {
    setKeywords(keywords.filter((keywordData) => keywordData.id !== id));
  };

  const handleRemoveAll = () => {
    setKeywords([]);
  };

  return (
    <article className='search'>
      <SearchInput
        keyword={keyword}
        setKeyword={setKeyword}
        onAddKeyword={handleAddKeyword}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      />
      {isOpen && (
        <SearchList
          keywords={keywords}
          onRemoveKeyword={handleRemoveKeyword}
          onRemoveAll={handleRemoveAll}
        />
      )}
    </article>
  );
};
export default Search;
