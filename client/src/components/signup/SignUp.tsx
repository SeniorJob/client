import tw from 'tailwind-styled-components';
import styled from 'styled-components';
import SingUpFrom from './SignUpFrom';

const SignUp = () => {
  return (
    <SignLayout>
      <SignDivBox>
        <SignTopText>회원가입</SignTopText>
        <SignTopSlider>슬라이드 텍스트</SignTopSlider>
        <SingUpFrom />
      </SignDivBox>
    </SignLayout>
  );
};

export default SignUp;

const SignLayout = tw.div`
  flex
  items-center
  justify-center
`;
const SignDivBox = tw.div`
  mt-24
  w-[320px]
`;
const SignTopText = styled.h1`
  font-size: 24px;
  margin-bottom: 5px;
  text-align: center;
`;
const SignTopSlider = styled.div`
  margin-bottom: 30px;
  text-align: center;
`;
