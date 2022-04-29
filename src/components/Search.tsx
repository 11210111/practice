import React, { useEffect, useState } from 'react';
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
      const mapKeywords = keywords.map((data) => data.keyword);
      if (!mapKeywords.includes(keyword)) {
        setKeywords([{ id: Date.now(), keyword }, ...keywords]);
      }
    }
  };

  useEffect(() => {
    keywords.length && setIsOpen(true);
  }, [keywords.length]);

  return (
    <article className='search'>
      <SearchInput
        keyword={keyword}
        setKeyword={setKeyword}
        onAddKeyword={handleAddKeyword}
        isOpen={isOpen}
      />
      {!!keywords.length && <SearchList keywords={keywords} />}
    </article>
  );
};
export default Search;
