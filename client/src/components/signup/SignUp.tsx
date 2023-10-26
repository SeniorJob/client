import tw from 'tailwind-styled-components';
import styled from 'styled-components';
import SingUpFrom from './SignUpFrom';
import { Swiper, SwiperSlide } from 'swiper/react';

const SignUp = () => {
  return (
    <SignLayout>
      <SignDivBox>
        <SignTopText>회원가입</SignTopText>
        <Swiper slidesPerView={1}>
          <SwiperSlide>슬라이드 1</SwiperSlide>
          <SwiperSlide>슬라이드 2</SwiperSlide>
          <SwiperSlide>슬라이드 3</SwiperSlide>
        </Swiper>
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
