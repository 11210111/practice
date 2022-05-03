import React, { useEffect, useRef } from 'react';
import Button from './Button';

import { BsSearch } from 'react-icons/bs';

interface Props {
  keyword: string;
  setKeyword: React.Dispatch<React.SetStateAction<string>>;
  onAddKeyword: (e: React.FormEvent) => void;
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  onKeydownKeyword: (e: React.KeyboardEvent) => void;
}

const SearchInput: React.FC<Props> = ({
  keyword,
  setKeyword,
  onAddKeyword,
  isOpen,
  setIsOpen,
  onKeydownKeyword
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  return (
    <form
      className='search-form'
      onSubmit={(e) => {
        onAddKeyword(e);
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
