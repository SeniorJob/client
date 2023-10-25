import tw from 'tailwind-styled-components';

const LoginTop = () => {
  return (
    <LoginTopDivBox>
      <LoginTopText>로그인</LoginTopText>
    </LoginTopDivBox>
  );
};

export default LoginTop;

const LoginTopDivBox = tw.div`
  :last-child {
    text-align: right;
  }
  margin-bottom: 5%;
`;
const LoginTopText = tw.h1`
  font-size: 30px;
  font-weight: 900;
`;
