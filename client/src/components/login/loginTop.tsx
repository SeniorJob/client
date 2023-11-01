import tw from 'tailwind-styled-components';
import IdIcon from '../../assets/images/IdIcon.svg';
import PwIcon from '../../assets/images/PwIcon.svg';
import styled from 'styled-components';
import Logo from '../../assets/images/logo.png';
import { useState, useEffect } from 'react';
import axios from 'axios';

const LoginTop: React.FC = () => {
  const [id, setId] = useState<string>('');
  const [pw, setPw] = useState<string>('');
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const LoginSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // 간단한 유효성 검사 예시: 아이디와 비밀번호가 비어있지 않아야 함
    if (!id || !pw) {
      setError('사용자 정보를 정확히 기입해 주세요.');
      return;
    }

    const loginData = {
      phoneNumber: id,
      password: pw,
    };
    axios
      .post(
        'http://ec2-3-34-248-169.ap-northeast-2.compute.amazonaws.com:8080/api/users/login',
        loginData,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      )
      .then(response => {
        // HTTP 응답 헤더에서 Set-Cookie를 추출합니다.
        const setCookieHeader = response.headers['Set-Cookie'];
        console.log(setCookieHeader);
        if (setCookieHeader) {
          // 배열의 쿠키 문자열을 하나의 문자열로 결합합니다.
          const cookieString = setCookieHeader.join('; ');
          setSessionId(cookieString);

          console.log('로그인 성공');
          console.log(sessionId);
        } else {
          // 'set-cookie' 헤더가 없는 경우 처리
          setSessionId(null);
          console.log('로그인 성공 (세션 쿠키 없음)');
        }
      })
      .catch(error => {
        console.log(error);
        setError('로그인 실패: ' + error.message);
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
