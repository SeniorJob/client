import { StyledUserMenu } from '../../assets/styles/MenuStyle';
import LoginComponent from '../login/login';
import { useState } from 'react';

import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useUserStore } from '../../store/user';

const MenuList = styled.div`
  display: flex;
  gap: 0.8rem;
`;

export const UserMenu = () => {
  const [isModal, setIsModal] = useState(false);

  const isLoggedIn = useUserStore().isLoggedIn;

  const handleModal = () => {
    setIsModal(!isModal);
  };

  return (
    <MenuList>
      {/* 이 아래 부분 버튼으로 감싸준 이유가 있을까요? 주석처리해놓은게 원래 코드입니다. 포인터 모양때문이면 css에 cursor: pointer 주시면 됩니다.  */}
      {/* <button
        onClick={e => {
          e.preventDefault();
          handleModal();
        }}
      >
        <StyledUserMenu>로그인</StyledUserMenu>
      </button> */}

      {/* 이 부분 코드처럼 로그인 성공 여부인 isLoggedIn을 체크하고 로그인, 로그아웃을 변경해주시면 됩니다. */}
      {isLoggedIn ? (
        // 아래 버튼들도 따로 컴포넌트로 빼고 클릭 이벤트만 받게하는 법도 있습니다. 그렇게되면 onClick {} 안에 들어가는게 clickEvent={handleClickEvent} 이런식으로 줄어들겠죠.
        <StyledUserMenu
          onClick={e => {
            e.preventDefault();
            handleModal();
          }}
        >
          로그인
        </StyledUserMenu>
      ) : (
        <StyledUserMenu>로그아웃</StyledUserMenu>
      )}
      <Link to={'/signup'}>
        <StyledUserMenu>회원가입</StyledUserMenu>
      </Link>

      {/* 이 아래 부분 모달 컴포넌트로 따로 빼는게 가독성이 좋습니다. 안빼도 상관은 없는데 코드 위치가 로그인 - 회원가입 사이에 있는 것은 가독성이 떨어집니다. 위치 옮겼습니다 */}
      {isModal ? (
        // 모달에 백그라운드 주는것도 CSS 가상요소 써서 만드는 방법도 있습니다. 그렇게되면 div 하나가 빠지겠죠
        <ModalBackdrop onClick={handleModal}>
          <ModalView onClick={e => e.stopPropagation()}>
            <ModalExitBtn onClick={handleModal}>x</ModalExitBtn>
            <LoginComponent />
          </ModalView>
        </ModalBackdrop>
      ) : null}
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
  z-index: 3;
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
