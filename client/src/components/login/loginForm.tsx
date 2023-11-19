import tw from 'tailwind-styled-components';
import IdIcon from '../../assets/images/IdIcon.svg';
import PwIcon from '../../assets/images/PwIcon.svg';
import styled from 'styled-components';
import Logo from '../../assets/images/logo.png';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useUserStore } from '../../store/user';
import { useNavigate } from 'react-router-dom';

interface LoginTopProps {
  handleModal: () => void;
}

axios.defaults.withCredentials = true;

const LoginForm: React.FC<LoginTopProps> = ({ handleModal }) => {
  const [id, setId] = useState<string>('');
  const [pw, setPw] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const setIsLoggedIn = useUserStore().setIsLoggedIn;
  const navigate = useNavigate();

  const setTokensInLocalStorage = (
    accessToken: string,
    refreshToken: string,
  ) => {
    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('refreshToken', refreshToken);
  };

  const LoginSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!id) {
      alert('아이디를 입력해주세요.');
      return;
    }

    if (!pw) {
      alert('비밀번호를 입력해주세요.');
      return;
    }

    const loginData = {
      phoneNumber: id,
      encryptionCode: pw,
    };

    axios
      .post(`${import.meta.env.VITE_API_URL}/api/users/login`, loginData, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then(response => {
        // 로그인 성공 시 isLoggedIn을 true로 바꿈. (true -> 로그인 중)
        const { accessToken, refreshToken } = response.data;
        setTokensInLocalStorage(accessToken, refreshToken);
        setIsLoggedIn();
        localStorage.setItem('isLogIn', 'true');
        handleModal();
        // navigate('/');
      })
      .catch(error => {
        console.log(error.message, error);
        setError('로그인 실패:' + error.message);
      });
  };

  useEffect(() => {
    if (error) {
      alert(error); // 에러 메시지를 알림창으로 출력
    }
  }, [error]);

  return (
    <LoginFormLayout>
      <LoginFormImgBox>
        <img src={Logo} className="w-[280px] pr-[5px]" />
      </LoginFormImgBox>
      <LoginFormBox>
        <LoginInPutForm onSubmit={LoginSubmit}>
          <InputWrapper>
            <img src={IdIcon} alt="아이디 아이콘"></img>
            <Input
              type="text"
              placeholder="전화번호를 입력해주세요"
              value={id}
              onChange={e => setId(e.target.value)}
            />
          </InputWrapper>
          <InputWrapper>
            <img src={PwIcon} alt="아이디 아이콘"></img>
            <Input
              type="password"
              placeholder="비밀번호를 입력해주세요"
              value={pw}
              onChange={e => setPw(e.target.value)}
            />
          </InputWrapper>
          <LoginMainBtn type="submit">로그인</LoginMainBtn>
        </LoginInPutForm>
        <LoginDivBox>
          <AccountHelpBox>
            <LoginBtnBox>아이디 찾기 </LoginBtnBox>
            <LoginBtnBox>비밀번호 찾기 </LoginBtnBox>
            <SignBtnBox>
              <a href="/signup">회원가입</a>
            </SignBtnBox>
          </AccountHelpBox>
        </LoginDivBox>
      </LoginFormBox>
    </LoginFormLayout>
  );
};

export default LoginForm;

const LoginDivBox = tw.div``;

const LoginFormLayout = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  flex-direction: column;
`;

const LoginFormImgBox = styled.div``;

const LoginFormBox = styled.div`
  width: 300px;
  padding: 10px 10px 10px 10px;
`;

const AccountHelpBox = styled.div`
  display: flex;
  justify-content: space-around;
  font-size: 16px;
  font-weight: 700;
`;

const LoginBtnBox = styled.button`
  margin-top: 10px;
`;

const SignBtnBox = styled.button`
  margin-top: 10px;
`;

const LoginMainBtn = styled.button`
  text-align: center;
  padding: 10px;
  width: 280px;
  height: 50px;
  line-height: 1.5;
  border: 1px solid #dcf8fad5;
  border-radius: 8px;
  background-color: #1dc078;
  color: #fff;
  :hover {
    cursor: pointer;
  }

  :active {
    background-color: #1d9690;
  }
`;

const LoginInPutForm = styled.form``;

const InputWrapper = styled.div`
  display: flex;
  width: 100%;
  height: 50px;
  margin: 5px 0 16px 0;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  img {
    width: 30px;
    margin-left: 5px;
  }
`;

const Input = styled.input`
  width: 80%;
  padding: 10px;

  &:focus {
    outline: none; // 포커스 시 테두리 없애기
  }
`;
