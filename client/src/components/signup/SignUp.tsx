import tw from 'tailwind-styled-components';
import styled from 'styled-components';
import SingUpFrom from './SignUpFrom';
import SignSlider from './SignTopSlider';

const SignUp = () => {
  return (
    <SignLayout>
      <SignDivBox>
        <SignTopText>회원가입</SignTopText>
        <SignSlider />
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

  text-[#191919]
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
