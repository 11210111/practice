import React, { useEffect, useState, useRef } from 'react';
import SearchInput from './SearchInput';
import SearchList from './SearchList';
import Result from './Result';

export interface searchKeyword {
  id: number;
  keyword: string;
}

const Search: React.FC = () => {
  const [keyword, setKeyword] = useState<string>('');
  const [keywords, setKeywords] = useState<searchKeyword[]>(
    () => JSON.parse(localStorage.getItem('keywords') || '[]') || []
  );
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [showResult, setShowResult] = useState<boolean>(false);

  const handleAddKeyword = (e?: React.FormEvent, word: string = keyword) => {
    e && e.preventDefault();
    if (word) {
      makeUniqueKeywords(word);
      setKeywords((keywords) => {
        const newKeywords = [{ id: Date.now(), keyword: word }, ...keywords];
        localStorage.setItem('keywords', JSON.stringify(newKeywords));
        return newKeywords;
      });
    }
    setIsOpen(false);
    setShowResult(true);
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

  useEffect(() => {
    setShowResult(false);
  }, []);

  const searchWrapperRef = useRef<HTMLElement>(null);

  const handleClickSide = (e: MouseEvent) => {
    if (!searchWrapperRef.current?.contains(e.target as HTMLElement)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClickSide);
  }, []);

  return (
    <article className='search' ref={searchWrapperRef}>
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
      {!isOpen && showResult && <Result keyword={keywords[0].keyword} />}
    </article>
  );
};
export default Search;
