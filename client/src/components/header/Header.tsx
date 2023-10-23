import tw from 'tailwind-styled-components';
import styled from 'styled-components';
import { SearchBar } from './SearchBar';

const StyledHeader = styled.header`
  display: flex;
  align-items: center;
  gap: 1rem;
  width: 100%;
  height: 65px;
  padding: 0.7rem 1.5rem;
  box-shadow:
    0 1px 2px hsla(0, 0%, 0%, 0.05),
    0 1px 4px hsla(0, 0%, 0%, 0.05),
    0 2px 8px hsla(0, 0%, 0%, 0.05);
`;

const Logo = tw.div`
  items-center
  text-center
`;

export const Header = () => {
  return (
    <StyledHeader>
      <Logo>매우멋진로고</Logo>
      <SearchBar />
      <div>nav 메뉴</div>
      <div>회원 기능</div>
    </StyledHeader>
  );
};
