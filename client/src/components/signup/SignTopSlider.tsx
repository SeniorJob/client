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
        <SwiperSlide>Slide 1</SwiperSlide>
        <SwiperSlide>Slide 2</SwiperSlide>
        <SwiperSlide>Slide 3</SwiperSlide>
      </Swiper>
    </SwiperLayout>
  );
};

export default SignTopSlider;

const SwiperLayout = tw.div`
  mb-[24px]
`;
