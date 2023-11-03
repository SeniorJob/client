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
          <StyledMenu>
            <Link to="/lectures">강좌탐색</Link>
          </StyledMenu>
        </li>
        <li>
          <StyledMenu>
            <Link to="/openclass">강좌개설</Link>
          </StyledMenu>
        </li>
        <li>
          <StyledMenu>
            <Link to="#">강좌제안</Link>
          </StyledMenu>
        </li>
      </ul>
    </Nav>
  );
};
