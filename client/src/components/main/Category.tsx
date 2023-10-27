import styled from 'styled-components';
// Swiper 관련 모듈 Import
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const Section = styled.section`
  position: relative;
  max-width: 1200px;
  padding: 1rem;
  margin: 0 auto;
`;

const CategoryTag = styled(SwiperSlide)`
  background-color: lightgreen;
  width: fit-content;
  border-radius: 1rem;
  /* width: 60px !important; */
  height: 60px;
`;

export const Category = () => {
  return (
    <Section>
      <div className="relative">
        <Swiper
          grabCursor={true}
          slidesPerView={8}
          spaceBetween={30}
          freeMode={true}
          modules={[FreeMode]}
          className="mySwiper"
        >
          <CategoryTag>1</CategoryTag>
          <CategoryTag>2</CategoryTag>
          <CategoryTag>3</CategoryTag>
          <CategoryTag>4</CategoryTag>
          <CategoryTag>5</CategoryTag>
          <CategoryTag>6</CategoryTag>
          <CategoryTag>7</CategoryTag>
          <CategoryTag>8</CategoryTag>
          <CategoryTag>9</CategoryTag>
        </Swiper>
      </div>
    </Section>
  );
};
