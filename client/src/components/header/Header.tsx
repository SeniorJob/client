import tw from 'tailwind-styled-components';
import styled from 'styled-components';
import { SearchBar } from './SearchBar';
import { NavMenu } from './NavMenu';
import { UserMenu } from './UserMenu';

const StyledHeader = styled.header`
  display: flex;
  position: sticky;
  align-items: stretch;
  gap: 1.3rem;
  width: 100%;
  height: 64px;
  box-shadow:
    0 1px 2px hsla(0, 0%, 0%, 0.05),
    0 1px 4px hsla(0, 0%, 0%, 0.05),
    0 2px 8px hsla(0, 0%, 0%, 0.05);
`;

const HeaderBox = styled.div`
  flex-grow: 1;
  display: block;
  margin: 0 auto;
  max-width: 1200px;
`;

const HeaderContent = styled.div`
  display: flex;
  height: 100%;
`;

const NavBar = styled.div`
  display: flex;
  justify-content: space-between;
  flex: 1 1 auto;
  align-items: center;
`;

const Logo = tw.div`
  flex
  items-center
  text-center
`;

export const Header = () => {
  return (
    <StyledHeader>
      <HeaderBox>
        <HeaderContent>
          <Logo>매우멋진로고</Logo>
          <SearchBar />
          <NavBar>
            <NavMenu />
            <UserMenu />
          </NavBar>
        </HeaderContent>
      </HeaderBox>
    </StyledHeader>
  );
};
