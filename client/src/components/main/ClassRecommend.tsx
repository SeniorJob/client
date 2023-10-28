import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { BannerNav } from './SwiperNavButton';
// Swiper 관련 모듈 Import
import { Swiper, SwiperSlide, SwiperClass } from 'swiper/react';
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

const PageController = styled.div`
  display: flex;
  align-items: center;
  height: 64px;
  border-bottom: 1px solid #e9ecef;
`;

const ControllerBox = styled.div`
  display: flex;
  flex-shrink: 0;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 0 1rem;
  width: 135px;
  height: 36px;
  font-size: 0.875rem;
  color: #fff;
  border-radius: 20px;
  background-color: rgba(0, 0, 0, 0.5);
`;

const PaginationWrapper = styled.div`
  position: relative;
  display: block;
  overflow: hidden;
  height: 36px;
  width: 100%;
  .left-gradient {
    position: absolute;
    width: 15px;
    height: 100%;
    left: 0;
    background-image: linear-gradient(90deg, #fff, hsla(0, 0%, 100%, 0));
    z-index: 71;
  }
  .right-gradient {
    position: absolute;
    width: 15px;
    height: 100%;
    right: 0;
    background-image: linear-gradient(90deg, hsla(0, 0%, 100%, 0), #fff);
    z-index: 71;
  }
`;

const CustomBullets = styled.div<{ curIndex: number }>`
  position: absolute;
  bottom: 0 !important;
  left: 0;
  top: 0 !important;
  display: flex;
  z-index: 71;
  height: 36px;
  transform: ${props => (props.curIndex >= 6 ? `translateX(-200px)` : '0')};
  transition: transform 0.3s ease; /* 움직임을 부드럽게 만들기 위한 트랜지션 */

  .swiper-pagination-bullet {
    flex: 0 0 auto;
    min-width: 120px;
    padding: 0 1rem;
    height: 36px;
    margin: 0 0.25rem !important;
    line-height: 36px;
    text-align: center;
    font-size: 0.875rem;
    font-weight: 700;
    color: #495057;
    border-radius: 20px;
    box-shadow: inset 0 0 0 1px #ced4da;
    background-color: #fff;
    cursor: pointer;
    opacity: unset;
  }
  .swiper-pagination-bullet-active {
    color: #00c471;
    box-shadow: inset 0 0 0 2px #00c471;
  }
`;

const Divider = styled.div`
  margin: 0 1rem;
  width: 1px;
  height: 36px;
  background-color: #dee2e6;
`;

export const ClassRecommend = () => {
  const [swiper, setSwiper] = useState<SwiperClass | null>(null);
  const [curIndex, setCurIndex] = useState<number>(1);

  useEffect(() => {
    if (swiper) {
      swiper.on('slideChange', () => {
        setCurIndex(swiper.realIndex + 1);
      });
    }
  }, [swiper]);

  return (
    <section className="banner">
      <CustomSwiper
        onSwiper={setSwiper}
        autoplay={{
          delay: 3500,
          disableOnInteraction: false,
        }}
        pagination={{
          el: '.swiper-pagination',
          clickable: true,
          renderBullet: function (index, className) {
            return (
              '<div class="' +
              className +
              '"><span>' +
              '여기에 데이터' +
              '</span></div>'
            );
          },
        }}
        loop={true}
        modules={[Autoplay, Navigation, Pagination, Controller]}
        className="mySwiper"
      >
        {/* 나중에 여기에 강의 데이터 mapping 하면 됨 */}
        <CustomSlide>Slide 1</CustomSlide>
        <CustomSlide>Slide 2</CustomSlide>
        <CustomSlide>Slide 3</CustomSlide>
        <CustomSlide>Slide 4</CustomSlide>
        <CustomSlide>Slide 5</CustomSlide>
        <CustomSlide>Slide 6</CustomSlide>
        <CustomSlide>Slide 7</CustomSlide>
        <CustomSlide>Slide 8</CustomSlide>
        <CustomSlide>Slide 9</CustomSlide>
        <PageController>
          <div className="container flex items-center px-8">
            <ControllerBox>
              <div className="custom-pagination flex-1">
                {curIndex} / {swiper?.slides.length}
              </div>
              {/* prev, next, pause 버튼 */}
              <BannerNav />
            </ControllerBox>
            <Divider />
            <PaginationWrapper>
              <CustomBullets
                className="swiper-pagination"
                curIndex={curIndex}
              />
              {curIndex >= 6 ? <div className="left-gradient" /> : null}
              {curIndex <= 7 ? <div className="right-gradient" /> : null}
            </PaginationWrapper>
          </div>
        </PageController>
      </CustomSwiper>
    </section>
  );
};
