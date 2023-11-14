import styled from 'styled-components';
import { useSearchParams } from 'react-router-dom';
import { ChangeEvent, KeyboardEvent, useState } from 'react';

interface MyPageTitle_I {
  title: '제안' | '신청' | '개설' | '수정';
  type?: 'edit';
}

const MyPageTitle = ({ title, type }: MyPageTitle_I) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [search, setSearch] = useState('');

  const handleSearchTitle = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      if (search === '') searchParams.delete('title');
      else if (search.length >= 2) searchParams.set('title', search);
      else alert('2글자 이상 입력해주세요');

      setSearchParams(searchParams);
    }
  };

  return title === '수정' ? (
    <H2>강좌 수정</H2>
  ) : (
    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
      <H2>
        {title}
        {type !== 'edit' ? '한 강좌' : '한 강좌 수정'}
      </H2>
      {type !== 'edit' && (
        <SearchBox
          type="text"
          placeholder="강좌 검색"
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setSearch(e.target.value)
          }
          onKeyDown={handleSearchTitle}
        />
      )}
    </div>
  );
};

export default MyPageTitle;

const H2 = styled.h2`
  font-size: 32px;
  font-weight: bold;
`;

const SearchBox = styled.input`
  border: 1px solid lightgray;
  width: 320px;
  padding: 6px 12px;
  border-radius: 10px;
  &:focus {
    border-color: green;
    outline: none;
  }
`;
