import styled from 'styled-components';
import tw from 'tailwind-styled-components';
import { StyledMenu } from '../../assets/styles/MenuStyle';

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
            <a href="#">강좌탐색</a>
          </StyledMenu>
        </li>
        <li>
          <StyledMenu>
            <a href="#">강좌개설</a>
          </StyledMenu>
        </li>
        <li>
          <StyledMenu>
            <a href="#">강좌제안</a>
          </StyledMenu>
        </li>
      </ul>
    </Nav>
  );
};
