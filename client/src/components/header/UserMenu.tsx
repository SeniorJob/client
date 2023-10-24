import styled from 'styled-components';
import { StyledMenu } from '../../assets/styles/MenuStyle';

const MenuList = styled.div`
  display: flex;
`;

export const UserMenu = () => {
  return (
    <MenuList>
      <StyledMenu>
        <a href="#">로그인</a>
      </StyledMenu>
      <StyledMenu>
        <a href="#">회원가입</a>
      </StyledMenu>
    </MenuList>
  );
};
