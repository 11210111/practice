import React from 'react';
import Button from './Button';

const SearchInput: React.FC = () => {
  return (
    <form className='search-form'>
      <input type='text' className='search-input' />
      <Button text='검색' type='search' />
    </form>
  );
};

export default SearchInput;
