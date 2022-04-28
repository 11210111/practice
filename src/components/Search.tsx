import React from 'react';
import SearchInput from './SearchInput';
import SearchList from './SearchList';

const Search: React.FC = () => {
  return (
    <article className='search'>
      <SearchInput />
      <SearchList />
    </article>
  );
};
export default Search;
