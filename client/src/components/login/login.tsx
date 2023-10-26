import styled from 'styled-components';
import tw from 'tailwind-styled-components';
import LoginTop from './loginTop';

const Login = () => {
  return (
    <LoginLayout>
      <LoginContents>
        <LoginTop />
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
  width: 450px;
  height: 500px;
  margin-top: 7%;
  padding: 5% 5% 5% 5%;
  border-radius: 8px;
`;
