import styled from 'styled-components';
import { StyledUserMenu } from '../../assets/styles/MenuStyle';

const MenuList = styled.div`
  display: flex;
  gap: 0.8rem;
`;

export const UserMenu = () => {
  return (
    <MenuList>
      <StyledUserMenu>
        <a href="#">로그인</a>
      </StyledUserMenu>
      <StyledUserMenu>
        <a href="#">회원가입</a>
      </StyledUserMenu>
    </MenuList>
  );
};
