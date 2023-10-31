import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import tw from 'tailwind-styled-components';
import styled from 'styled-components';

// Import Swiper styles
import 'swiper/css';

const SignTopSlider = () => {
  return (
    <SwiperLayout>
      <Swiper
        modules={[Autoplay]}
        autoplay={{ delay: 1000, disableOnInteraction: false }}
      >
        <SwiperSlide>고령화 시대 지금부터 시작입니다.</SwiperSlide>
        <SwiperSlide>새로운 직업 새로운 기술</SwiperSlide>
        <SwiperSlide>SiniorJob에서 시작하세요</SwiperSlide>
      </Swiper>
    </SwiperLayout>
  );
};

export default SignTopSlider;

const SwiperLayout = tw.div`
  mb-[24px]
  text-center
`;
