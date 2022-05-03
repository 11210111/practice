import React, { useRef, useEffect } from 'react';
import Button from './Button';
import { searchKeyword } from './Search';

interface Props {
  keywords: searchKeyword[];
  onRemoveKeyword: (id: number) => void;
  onRemoveAll: () => void;
  onClickKeyword: (keyword: string) => void;
  setRefCount: React.Dispatch<React.SetStateAction<number>>;
  keywordIndex: number;
}

const SearchList: React.FC<Props> = ({
  keywords,
  onRemoveKeyword,
  onRemoveAll,
  onClickKeyword,
  setRefCount,
  keywordIndex,
}) => {
  const ulRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    setRefCount(ulRef.current!.childElementCount);
  }, []);

  return (
    <section className='search-list'>
      {!!keywords.length ? (
        <div className='search-list-header'>
          <h3>최근 검색어</h3>
          <Button type='delete-all' text='전체 삭제' onClick={onRemoveAll} />
        </div>
      ) : (
        <div className='search-list-header'>
          <p>최근 검색어가 없습니다.</p>
        </div>
      )}
      <ul ref={ulRef}>
        {keywords.map((keywordData, index) => (
          <li
            key={keywordData.id}
            className={`search-item ${
              index === keywordIndex ? 'is-focus' : ''
            } `}>
            <div
              className={`search-keyword`}
              onClick={() => {
                onClickKeyword(keywordData.keyword);
              }}>
              {keywordData.keyword}
            </div>
            <Button
              type='delete'
              text='삭제'
              onClick={() => onRemoveKeyword(keywordData.id)}
            />
          </li>
        ))}
      </ul>
    </section>
  );
};

export default SearchList;
