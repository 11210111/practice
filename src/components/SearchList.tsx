import React, { useRef, useEffect, useContext } from 'react';
import Button from './Button';
import { KeywordsDispatchContext, KeywordsStateContext } from './Search';
interface Props {
  onClickKeyword: (keyword: string) => void;
  setRefCount: React.Dispatch<React.SetStateAction<number>>;
  keywordIndex: number;
}

const SearchList: React.FC<Props> = ({
  onClickKeyword,
  setRefCount,
  keywordIndex,
}) => {
  const ulRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    setRefCount(ulRef.current!.childElementCount);
  }, []);

  const keywords = useContext(KeywordsStateContext);
  const { onReset, onRemove } = useContext(KeywordsDispatchContext);

  return (
    <section className='search-list'>
      {!!keywords.length ? (
        <div className='search-list-header'>
          <h3>최근 검색어</h3>
          <Button type='delete-all' text='전체 삭제' onClick={onReset} />
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
              onClick={() => onRemove(keywordData.id)}
            />
          </li>
        ))}
      </ul>
    </section>
  );
};

export default SearchList;
