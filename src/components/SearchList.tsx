import React from 'react';
import Button from './Button';
import { searchKeyword } from './Search';

interface Props {
  keywords: searchKeyword[];
  onRemoveKeyword: (id: number) => void;
  onRemoveAll: () => void;
}

const SearchList: React.FC<Props> = ({
  keywords,
  onRemoveKeyword,
  onRemoveAll,
}) => {
  return (
    <section className='search-list'>
      <div className='search-list-header'>
        <h3>최근 검색어</h3>
        <Button type='delete-all' text='전체 삭제' onClick={onRemoveAll} />
      </div>
      <ul>
        {keywords.map((keywordData) => (
          <li key={keywordData.id}>
            <div>{keywordData.keyword}</div>
            <Button type='delete' text='삭제' onClick={()=>onRemoveKeyword(keywordData.id)} />
          </li>
        ))}
      </ul>
    </section>
  );
};

export default SearchList;
