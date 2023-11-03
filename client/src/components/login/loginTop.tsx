import tw from 'tailwind-styled-components';
import IdIcon from '../../assets/images/IdIcon.svg';
import PwIcon from '../../assets/images/PwIcon.svg';
import styled from 'styled-components';
import Logo from '../../assets/images/logo.png';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useUserStore } from '../../store/user';

const LoginTop: React.FC = () => {
  const [id, setId] = useState<string>('');
  const [pw, setPw] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

  const setIsLoggedIn = useUserStore().setIsLoggedIn;

  const LoginSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const loginData = {
      phoneNumber: id,
      password: pw,
    };

    // 간단한 유효성 검사 : 아이디와 비밀번호가 비어있지 않아야 함
    if (!id || !pw) {
      setError('사용자 정보를 정확히 기입해 주세요.');
      return;
    }

    axios
      .post(`${import.meta.env.VITE_API_URL}api/users/login`, loginData, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then(response => {
        // 로그인 성공 시 isLoggedIn을 true로 바꿈. (true -> 로그인 중)
        setIsLoggedIn();
        console.log(response); // 서버 응답 데이터 확인
        // 메인페이지로 연결.
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
    <LoginDownDivBox>
      <LoginLeftDivBox>
        <LoginLeftText>
          <img src={Logo} className="w-[280px] pr-[5px]" />
        </LoginLeftText>
      </LoginLeftDivBox>
      <LoginRightDivBox>
        <LoginInPutForm onSubmit={LoginSubmit}>
          <InputWrapper>
            <img src={IdIcon} alt="아이디 아이콘"></img>
            <Input
              type="text"
              placeholder="아이디를 입력해주세요"
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
          {error && <div className="text-red-500">{error}</div>}
          <LoginMainBtn type="submit">로그인</LoginMainBtn>
        </LoginInPutForm>
        <LoginDivBox>
          <LoginDivBox>
            <AccountHelpBox>
              <LoginBtnBox>아이디 찾기 </LoginBtnBox>
              <LoginBtnBox>비밀번호 찾기 </LoginBtnBox>
              <SignBtnBox>
                <a href="signup">회원가입</a>
              </SignBtnBox>
            </AccountHelpBox>
          </LoginDivBox>
        </LoginDivBox>
      </LoginRightDivBox>
    </LoginDownDivBox>
  );
};

export default LoginTop;

const LoginDivBox = tw.div``;

const LoginDownDivBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  flex-direction: column;
`;
const LoginLeftDivBox = styled.div`
  strong {
    color: #e75410d1;
    font-size: 40px;
  }
  margin-bottom: 15px;
`;
const LoginLeftText = styled.h2`
  font-size: 16px;
`;
const LoginRightDivBox = styled.div`
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
