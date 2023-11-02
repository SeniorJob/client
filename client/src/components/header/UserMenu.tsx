import { StyledUserMenu } from '../../assets/styles/MenuStyle';
import LoginComponent from '../login/login';
import { useState } from 'react';

import styled from 'styled-components';

const MenuList = styled.div`
  display: flex;
  gap: 0.8rem;
`;

export const UserMenu = () => {
  const [isModal, setIsModal] = useState(false);

  const handleModal = () => {
    setIsModal(!isModal);
  };

  return (
    <MenuList>
      <StyledUserMenu>
        <button onClick={handleModal}>로그인</button>
      </StyledUserMenu>
      {isModal ? (
        <ModalBackdrop>
          <ModalView>
            <ModalExitBtn onClick={handleModal}>x</ModalExitBtn>
            <LoginComponent />
          </ModalView>
        </ModalBackdrop>
      ) : null}
      <StyledUserMenu>
        <a href="signup">회원가입</a>
      </StyledUserMenu>
    </MenuList>
  );
};

const ModalBackdrop = styled.div`
  // Modal이 떴을 때의 배경을 깔아주는 CSS를 구현
  z-index: 1; //위치지정 요소
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.4);
  border-radius: 10px;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`;

const ModalView = styled.div`
  // Modal창 CSS를 구현합니다.
  display: flex;
  align-items: center;
  border-radius: 20px;
  background-color: #ffffff;
`;

const ModalExitBtn = styled.button`
  z-index: 1;
  position: fixed;
  display: flex;
  justify-content: center;
  width: 30px;
  border: solid 1px black;
`;
