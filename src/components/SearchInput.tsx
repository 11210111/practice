import React, { useEffect, useRef, useContext } from 'react';
import Button from './Button';

import { BsSearch } from 'react-icons/bs';
import { KeywordsDispatchContext } from './Search';

interface Props {
  keyword: string;
  setKeyword: React.Dispatch<React.SetStateAction<string>>;
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  onKeydownKeyword: (e: React.KeyboardEvent) => void;
}

const SearchInput: React.FC<Props> = ({
  keyword,
  setKeyword,
  isOpen,
  setIsOpen,
  onKeydownKeyword,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const { onAdd } = useContext(KeywordsDispatchContext);

  return (
    <form
      className='search-form'
      onSubmit={(e) => {
        onAdd(e);
        inputRef.current?.blur();
      }}>
      <input
        type='text'
        className={`search-input ${isOpen && `is-open`}`}
        ref={inputRef}
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        onClick={() => setIsOpen(true)}
        onKeyDown={onKeydownKeyword}
      />
      <Button text={<BsSearch />} type='search' />
    </form>
  );
};

export default SearchInput;
