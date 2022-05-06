import React, { useEffect, useState, useReducer } from 'react';
import SearchInput from './SearchInput';
import SearchList from './SearchList';
import Result from './Result';

import reducer from '../utils/keywordReducer';
import { initialKeywordState } from '../utils/keywordReducer';

const Search: React.FC = () => {
  const [keywords, dispatch] = useReducer(reducer, initialKeywordState);
  const [keyword, setKeyword] = useState<string>('');
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [showResult, setShowResult] = useState<boolean>(false);

  // INIT
  useEffect(() => {
    const keywords = localStorage.getItem('keywords');
    if (keywords) {
      const keywordsList = JSON.parse(keywords || '[]');
      dispatch({ type: 'INIT', data: keywordsList });
    }
    setShowResult(false);
  }, []);

  // ADD
  const onAdd = (e?: React.FormEvent, word: string = keyword) => {
    e?.preventDefault();
    dispatch({ type: 'ADD', payload: { id: Date.now(), keyword: word } });
    setIsOpen(false);
    setShowResult(true);
  };

  // REMOVE
  const onRemove = (targetId: number) => {
    dispatch({ type: 'REMOVE', targetId });
    setIsOpen(true);
    setShowResult(false);
  };

  // RESET
  const onReset = () => {
    dispatch({ type: 'RESET' });
  };

  const handleClickKeyword = (keyword: string) => {
    setKeyword(keyword);
    onAdd(undefined, keyword);
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

  const handleClickSide = (e: MouseEvent) => {
    const target = e.target as HTMLElement;
    if (target.tagName === 'BODY' || target.tagName === 'H1') {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClickSide);
  }, []);

  return (
    <article className='search'>
      <SearchInput
        keyword={keyword}
        setKeyword={setKeyword}
        onAddKeyword={onAdd}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        onKeydownKeyword={handleKeydownKeyword}
      />
      {isOpen && (
        <SearchList
          keywords={keywords}
          onRemoveKeyword={onRemove}
          onRemoveAll={onReset}
          onClickKeyword={handleClickKeyword}
          setRefCount={setRefCount}
          keywordIndex={keywordIndex}
        />
      )}
      {!isOpen && showResult && !!keywords.length && (
        <Result keyword={keywords[0].keyword} />
      )}
    </article>
  );
};
export default Search;
