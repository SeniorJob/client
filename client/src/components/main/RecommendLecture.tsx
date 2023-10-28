import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import { NavButton } from './SwiperNavButton';
import styled from 'styled-components';

const LectureCard = styled.div`
  width: 100%;
  height: 100%;
`;

const Card = styled.div`
  width: 100%;
  height: 150px;
  background-color: lightgreen;
`;

export const RecommendLecture = () => {
  return (
    <section className="py-6">
      <div className="container">
        <h1>추천 강좌 리스트</h1>
        <Swiper
          slidesPerView={5}
          spaceBetween={10}
          navigation={{
            prevEl: '.swiper-lecture-prev',
            nextEl: '.swiper-lecture-next',
          }}
          modules={[Navigation]}
        >
          <SwiperSlide>
            <LectureCard>
              <Card />
            </LectureCard>
          </SwiperSlide>
          <SwiperSlide>
            <LectureCard>
              <Card />
            </LectureCard>
          </SwiperSlide>
          <SwiperSlide>
            <LectureCard>
              <Card />
            </LectureCard>
          </SwiperSlide>
          <SwiperSlide>
            <LectureCard>
              <Card />
            </LectureCard>
          </SwiperSlide>
          <SwiperSlide>
            <LectureCard>
              <Card />
            </LectureCard>
          </SwiperSlide>
          <SwiperSlide>
            <LectureCard>
              <Card />
            </LectureCard>
          </SwiperSlide>
          <NavButton navName="swiper-lecture" />
        </Swiper>
      </div>
    </section>
  );
};
