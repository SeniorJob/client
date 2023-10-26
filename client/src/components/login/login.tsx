import styled from 'styled-components';
import tw from 'tailwind-styled-components';
import LoginTop from './loginTop';
import LoginDown from './loginDown';

const Login = () => {
  return (
    <LoginLayout>
      <LoginContents>
        <LoginTop />
        <LoginDown />
      </LoginContents>
    </LoginLayout>
  );
};

export default Login;

const LoginLayout = tw.div`
    flex
    items-center
    justify-center
`;
const LoginContents = styled.div`
  width: 970px;
  height: 600px;
  border: 1px solid gray;
  margin-top: 10%;
  padding: 5% 5% 5% 5%;
  box-shadow: 1px 1px 10px;
`;
