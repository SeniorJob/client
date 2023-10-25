import styled from 'styled-components';
// Swiper 관련 모듈 Import
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination, Controller } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const CustomSlide = styled(SwiperSlide)`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 320px;
  background-color: lightgreen;
`;

const CustomSwiper = styled(Swiper)`
  --swiper-theme-color: var(--primaryColor);
`;

export const ClassRecommend = () => {
  return (
    <section>
      <CustomSwiper
        autoplay={{
          delay: 3500,
          disableOnInteraction: false,
        }}
        loop={true}
        pagination={{
          type: 'fraction',
        }}
        navigation={true}
        modules={[Autoplay, Navigation, Pagination, Controller]}
        className="mySwiper"
      >
        <CustomSlide>Slide 1</CustomSlide>
        <CustomSlide>Slide 2</CustomSlide>
        <CustomSlide>Slide 3</CustomSlide>
        <CustomSlide>Slide 4</CustomSlide>
        <CustomSlide>Slide 5</CustomSlide>
        <CustomSlide>Slide 6</CustomSlide>
      </CustomSwiper>
      <div></div>
    </section>
  );
};
