import styled from 'styled-components';

interface MyPageTitle_I {
  title: '제안' | '신청' | '개설';
  type?: 'edit';
}

const MyPageTitle = ({ title, type }: MyPageTitle_I) => {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
      <H2>
        {title}
        {type !== 'edit' ? '한 강좌' : '한 강좌 수정'}
      </H2>
      {type !== 'edit' && <SearchBox type="text" placeholder="강좌 검색" />}
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
`;
