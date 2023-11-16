import {
  StyledUserMenu,
  StyledLoginUser,
  StyledLoginUserMenu,
} from '../../assets/styles/MenuStyle';
import LoginComponent from '../login/loginForm';
import { useState, useEffect, useRef } from 'react';
import defaultImage from '../../assets/images/imageDefault.png';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useLoginModalStore, useUserStore } from '../../store/user';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const MenuList = styled.div`
  display: flex;
  gap: 0.8rem;
`;

axios.defaults.withCredentials = true;

export const UserMenu: React.FC = () => {
  const { loginModal, handleLoginModal } = useLoginModalStore();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  type UserInfo_T = {
    imgKey: string;
    name: string;
  };
  const [userInfo, setUserInfo] = useState<UserInfo_T>();
  const setIsLoggedIn = useUserStore().setIsLoggedIn;
  const setUserDetail = useUserStore().setUserDetail;
  const clearUserDetail = useUserStore().clearUserDetail;
  const accessToken = localStorage.getItem('accessToken');
  const LoginInfo = localStorage.getItem('isLogIn');
  const navigate = useNavigate();

  const handleLoginFormModal = () => {
    handleLoginModal();
  };

  const handleDropdown = () => {
    setIsMenuOpen(prev => !prev);
  };
  const dropdownRef = useRef<HTMLDivElement>(null);

  // 드롭다운 외부클릭 함수
  const handleOutsideClick = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setIsMenuOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleOutsideClick);

    return () => {
      document.removeEventListener('click', handleOutsideClick);
    };
  }, []);

  useEffect(() => {
    axios
      .post(
        `${import.meta.env.VITE_API_URL}/api/users/detail`,
        {},
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      )
      .then(res => {
        setUserDetail(res.data);
        setUserInfo(res.data);
      })
      .catch(error => {
        console.error('사용자 세부 정보를 가져올 때 오류 발생:', error);
        // 오류를 처리하려면 사용자에게 오류 메시지를 표시하는 등의 조치를 취하십시오.
      });
  }, [accessToken]);

  const handleLogout = async () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    setIsLoggedIn();
    clearUserDetail();
    localStorage.removeItem('isLogIn');
    localStorage.removeItem('UserStore');
    navigate('/');
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
      {!LoginInfo ? (
        // 아래 버튼들도 따로 컴포넌트로 빼고 클릭 이벤트만 받게하는 법도 있습니다. 그렇게되면 onClick {} 안에 들어가는게 clickEvent={handleClickEvent} 이런식으로 줄어들겠죠.
        <>
          <StyledUserMenu
            onClick={e => {
              e.preventDefault();
              handleLoginFormModal();
            }}
          >
            로그인
          </StyledUserMenu>
          <Link to={'/signup'}>
            <StyledUserMenu>회원가입</StyledUserMenu>
          </Link>
        </>
      ) : (
        <div className="flex gap-2 relative" ref={dropdownRef}>
          <img
            className="w-8 h-8 rounded-[20px] hover:cursor-pointer mt-1"
            src={userInfo?.imgKey ? userInfo?.imgKey : defaultImage}
            onClick={handleDropdown}
          />
          <StyledLoginUser>
            <strong className="">{userInfo?.name}님</strong> 어서오세요
          </StyledLoginUser>
          {isMenuOpen && (
            <UserDropdownView>
              <Link to={'/mypage'}>
                <StyledLoginUserMenu>마이페이지</StyledLoginUserMenu>
              </Link>
              <StyledLoginUserMenu
                onClick={e => {
                  e.preventDefault();
                  handleLogout();
                }}
              >
                로그아웃
              </StyledLoginUserMenu>
            </UserDropdownView>
          )}
        </div>
      )}
      {/* 이 아래 부분 모달 컴포넌트로 따로 빼는게 가독성이 좋습니다. 안빼도 상관은 없는데 코드 위치가 로그인 - 회원가입 사이에 있는 것은 가독성이 떨어집니다. 위치 옮겼습니다 */}
      {loginModal ? (
        // 모달에 백그라운드 주는것도 CSS 가상요소 써서 만드는 방법도 있습니다. 그렇게되면 div 하나가 빠지겠죠
        <ModalBackdrop onClick={handleLoginFormModal}>
          <ModalView onClick={e => e.stopPropagation()}>
            <LoginComponent handleModal={handleLoginFormModal} />
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
  width: 350px;
  height: 350px;
  display: flex;
  flex-direction: column; // 컨텐츠를 세로 방향으로 정렬
  align-items: center;
  justify-content: center; // 수평, 수직 중앙 정렬
  border-radius: 20px;
  background-color: #ffffff;
`;

const UserDropdownView = styled.div`
  border: solid 2px #1dc078;
  z-index: 3;
  width: 100px;
  height: 80px;
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center; // 수평, 수직 중앙 정렬
  border-radius: 0.7rem;
  background-color: #ffffff;
  top: 42px; /* 적절한 값으로 조정하세요. */
`;
