import React, { useEffect, useState } from 'react';
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

  const [refCount, setRefCount] = useState<number>(0);
  const [keywordIndex, setKeywordIndex] = useState<number>(-1);

  const handleKeydownKeyword = (e: React.KeyboardEvent) => {
    if (e.code === 'ArrowDown') {
      setKeywordIndex((index) => index + 1);
      if (keywordIndex === refCount) setKeywordIndex(0);
    }
    if (e.code === 'ArrowUp') {
      setKeywordIndex((index) => index - 1);
      if (keywordIndex < 1) setKeywordIndex(-1);
    }
    if (keywordIndex > 0 && e.code === 'Enter') {
      setKeyword((keyword) => {
        const filter = keywords.filter((keyword, idx) => keywordIndex === idx);
        return filter[0].keyword;
      });
    }
  };

  useEffect(() => {
    if (!isOpen) {
      setKeywordIndex(-1);
    }
  }, [isOpen]);

  return (
    <article className='search'>
      <SearchInput
        keyword={keyword}
        setKeyword={setKeyword}
        onAddKeyword={handleAddKeyword}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        onKeydownKeyword={handleKeydownKeyword}
      />
      {isOpen && (
        <SearchList
          keywords={keywords}
          onRemoveKeyword={handleRemoveKeyword}
          onRemoveAll={handleRemoveAll}
          onClickKeyword={handleClickKeyword}
          setRefCount={setRefCount}
          keywordIndex={keywordIndex}
        />
      )}
      {!isOpen && !!keywords.length ? (
        <Result keyword={keywords[0].keyword} />
      ) : null}
    </article>
  );
};
export default Search;
