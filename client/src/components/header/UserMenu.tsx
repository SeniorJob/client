import styled from 'styled-components';
import { StyledUserMenu } from '../../assets/styles/MenuStyle';
import { Link } from 'react-router-dom';

const MenuList = styled.div`
  display: flex;
  gap: 0.8rem;
`;

export const UserMenu = () => {
  return (
    <MenuList>
      <StyledUserMenu>
        <Link to={'/login'}>로그인</Link>
      </StyledUserMenu>
      <StyledUserMenu>
        <Link to={'/signup'}>회원가입</Link>
      </StyledUserMenu>
    </MenuList>
  );
};
