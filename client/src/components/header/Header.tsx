import styled from 'styled-components';
import { SearchBar } from './SearchBar';
import { NavMenu } from './NavMenu';
import { UserMenu } from './UserMenu';
import images from '../../assets/images/images';
import { Link } from 'react-router-dom';

const StyledHeader = styled.header`
  display: flex;
  position: sticky;
  background: white;
  top: 0;
  z-index: 100;
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
  padding: 0 32px;
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

const Logo = styled.div`
  display: flex;
  align-items: center;
  img {
    width: 180px;
  }
`;

export const Header = () => {
  return (
    <StyledHeader>
      <HeaderBox>
        <HeaderContent>
          <Logo>
            <Link to={'/'}>
              <img src={images.logo} alt="Page Main Logo" />
            </Link>
          </Logo>
          <SearchBar option="header" />
          <NavBar>
            <NavMenu />
            <UserMenu />
          </NavBar>
        </HeaderContent>
      </HeaderBox>
    </StyledHeader>
  );
};
