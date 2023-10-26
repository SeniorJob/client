import tw from 'tailwind-styled-components';

import LoginTop from './loginTop';
import styled from 'styled-components';

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
  width: 350px;
  height: 500px;
  margin-top: 7%;
  padding: 5% 5% 5% 5%;
  box-shadow: 1px 1px 10px;
  border-radius: 8px;
`;
