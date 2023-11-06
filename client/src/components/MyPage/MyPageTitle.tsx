import { useLocation } from 'react-router-dom';
import styled from 'styled-components';

const MyPageTitle = () => {
  const pathname = useLocation().pathname;
  const title = pathname.substring(pathname.lastIndexOf('/') + 1);

  return (
    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
      <H2>
        {title === 'application'
          ? '신청'
          : title === 'opening'
          ? '개설'
          : title === 'suggestion' && '제안'}
        한 강좌
      </H2>
      <SearchBox type="text" placeholder="강좌 검색" />
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
