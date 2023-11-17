import styled from 'styled-components';
import tw from 'tailwind-styled-components';
import { StyledMenu } from '../../assets/styles/MenuStyle';
import { Link } from 'react-router-dom';
import { useLoginModalStore, useUserStore } from '../../store/user';

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
  const { isLoggedIn } = useUserStore();
  const { handleLoginModal } = useLoginModalStore();

  const handleOpenCourse = () => {
    if (!isLoggedIn) {
      alert('로그인 후 이용해 주세요');
      handleLoginModal(); // Execute handleLoginModal if the user is not logged in
    }
    // You can optionally redirect to the login page here if needed
  };
  return (
    <Nav>
      <ul>
        <li>
          <Link to="/lectures/filter?filter=latest">
            <StyledMenu>강좌탐색</StyledMenu>
          </Link>
        </li>
        <li>
          {isLoggedIn ? (
            <Link to="/openclass">
              <StyledMenu>강좌개설</StyledMenu>
            </Link>
          ) : (
            <StyledMenu onClick={handleOpenCourse}>강좌개설</StyledMenu>
          )}
        </li>
        <li>
          {isLoggedIn ? (
            <Link to="/createsuggestion">
              <StyledMenu>강좌제안</StyledMenu>
            </Link>
          ) : (
            <StyledMenu onClick={handleOpenCourse}>강좌제안</StyledMenu>
          )}
        </li>
      </ul>
    </Nav>
  );
};
