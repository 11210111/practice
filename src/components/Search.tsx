import React, { useState } from 'react';
import SearchInput from './SearchInput';
import SearchList from './SearchList';
import Result from './Result';

export interface searchKeyword {
  id: number;
  keyword: string;
}

const Search: React.FC = () => {
  const [keyword, setKeyword] = useState<string>('');
  const [keywords, setKeywords] = useState<searchKeyword[]>([]);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleAddKeyword = (e?: React.FormEvent, word: string = keyword) => {
    e && e.preventDefault();
    if (word) {
      makeUniqueKeywords(word);
      setKeywords((keywords) => [
        { id: Date.now(), keyword: word },
        ...keywords,
      ]);
    }
    setIsOpen(false);
  };

  const handleRemoveKeyword = (id: number) => {
    setKeywords(keywords.filter((keywordData) => keywordData.id !== id));
  };

  const handleRemoveAll = () => {
    setKeywords([]);
  };

  const handleClickKeyword = (keyword: string) => {
    setKeyword(keyword);
    handleAddKeyword(undefined, keyword);
  };

  const makeUniqueKeywords = (keyword: string) => {
    const preKeyword = keywords.find(
      (keywordData) => keywordData.keyword === keyword
    );
    if (!!preKeyword) {
      setKeywords((keywords) =>
        keywords.filter(
          (keywordData) => keywordData.keyword !== preKeyword.keyword
        )
      );
    }
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
          onClickKeyword={handleClickKeyword}
        />
      )}
      {!isOpen && !!keywords.length ? (
        <Result keyword={keywords[0].keyword} />
      ) : null}
    </article>
  );
};
export default Search;
