import React, { useEffect, useRef } from 'react';
import Button from './Button';

import { BsSearch } from 'react-icons/bs';

interface Props {
  keyword: string;
  setKeyword: React.Dispatch<React.SetStateAction<string>>;
  onAddKeyword: (e: React.FormEvent) => void;
}

const SearchInput: React.FC<Props> = ({
  keyword,
  setKeyword,
  onAddKeyword,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  return (
    <form className='search-form' onSubmit={(e) => onAddKeyword(e)}>
      <input
        type='text'
        className='search-input'
        ref={inputRef}
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
      />
      <Button text={<BsSearch />} type='search' />
    </form>
  );
};

export default SearchInput;
