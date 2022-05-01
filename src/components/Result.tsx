import React from 'react';

type Props = {
  keyword: string;
};
const Result: React.FC<Props> = ({ keyword }) => {
  return (
    <div className='result'>
      <p className='result-text'>
        <b>{keyword} </b>을(를) 검색했습니다.
      </p>
    </div>
  );
};

export default Result;
