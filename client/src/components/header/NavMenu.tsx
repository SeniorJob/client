import styled from 'styled-components';
import tw from 'tailwind-styled-components';
import { StyledMenu } from '../../assets/styles/MenuStyle';
import { Link } from 'react-router-dom';

const StyledNav = styled.nav`
  ul {
    display: flex;
    gap: 0.8rem;
  }
`;

const Nav = tw(StyledNav)`
  text-lg
  font-medium
`;

export const NavMenu = () => {
  return (
    <Nav>
      <ul>
        <li>
          <Link to="/lectures">
            <StyledMenu>강좌탐색</StyledMenu>
          </Link>
        </li>
        <li>
          <Link to="/openclass">
            <StyledMenu>강좌개설</StyledMenu>
          </Link>
        </li>
        <li>
          <Link to="#">
            <StyledMenu>강좌제안</StyledMenu>
          </Link>
        </li>
      </ul>
    </Nav>
  );
};
