import tw from 'tailwind-styled-components';
import styled from 'styled-components';

const StyledHeader = styled.header`
  display: flex;
  align-items: center;
  gap: 1rem;
  width: 100%;
  height: 65px;
  padding: 0.7rem 1rem;
`;

const Logo = tw.div`
  w-10
  items-center
  text-center
`;

export const Header = () => {
  return (
    <StyledHeader>
      <Logo>로고</Logo>
      <div>검색바</div>
      <div>nav 메뉴</div>
      <div>회원 기능</div>
    </StyledHeader>
  );
};
