import React, { useEffect, useRef } from 'react';
import Button from './Button';

import { BsSearch } from 'react-icons/bs';

const SearchInput: React.FC = () => {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <form className='search-form' onSubmit={handleSubmit}>
      <input type='text' className='search-input' ref={inputRef} />
      <Button text={<BsSearch />} type='search' />
    </form>
  );
};

export default SearchInput;
