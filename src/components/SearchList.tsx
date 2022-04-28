import React from 'react';
import Button from './Button';

const SearchList: React.FC = () => {
  return (
    <section className='search-list'>
      <div className='search-list-header'>
        <h3>최근 검색어</h3>
        <Button type='delete-all' text='전체 삭제' />
      </div>
      <ul>
        <li>
          <div>검색어 하나</div> <Button type='delete' text='삭제' />
        </li>
        <li>
          <div>검색어 하나</div> <Button type='delete' text='삭제' />
        </li>
      </ul>
    </section>
  );
};

export default SearchList;
