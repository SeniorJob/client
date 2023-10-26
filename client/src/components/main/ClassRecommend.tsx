import { useState, useEffect } from 'react';
import styled from 'styled-components';
import Pause from '../../assets/images/pause.svg?react';
import Play from '../../assets/images/play.svg?react';
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

const PrevButton = styled.button`
  &::before {
    content: '〈';
  }
`;
const NextButton = styled.button`
  &::before {
    content: '〉';
  }
`;

const PaginationWrapper = styled.div`
  position: relative;
  display: block;
  overflow: hidden;
  height: 36px;
  width: 100%;
`;

const CustomBullets = styled.div<{ curIndex: number }>`
  position: absolute;
  bottom: 0 !important;
  left: 0;
  top: 0 !important;
  display: flex;
  z-index: 71;
  height: 36px;
  transform: translateX(
    ${props => (props.curIndex >= 5 ? '-12%' : '0')}
  ); /* 조건에 따른 transform 스타일 적용 */
  transition: transform 0.3s ease; /* 움직임을 부드럽게 만들기 위한 트랜지션 */

  .swiper-pagination-bullet {
    flex: 0 0 auto;
    min-width: 120px;
    padding: 0 1rem;
    height: 36px;
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
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [curIndex, setCurIndex] = useState<number>(1);

  useEffect(() => {
    if (swiper) {
      swiper.on('slideChange', () => {
        setCurIndex(swiper.realIndex + 1);
      });
    }
  }, [swiper]);

  // 일시정지 버튼
  const toggleAutoplay = () => {
    if (swiper) {
      if (swiper.autoplay.running) {
        swiper.autoplay.stop();
        setIsPlaying(false);
        console.log(swiper.activeIndex);
      } else {
        swiper.autoplay.start();
        setIsPlaying(true);
        console.log(swiper.activeIndex);
      }
    }
    console.log(swiper?.autoplay);
  };

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
          // dynamicBullets: true,
          // dynamicMainBullets: 6,
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
              <div className="flex flex-1 justify-between">
                <PrevButton
                  onClick={() => {
                    swiper?.slidePrev();
                    console.log(swiper);
                  }}
                />
                <button onClick={toggleAutoplay}>
                  {isPlaying ? <Pause /> : <Play />}
                </button>
                <NextButton
                  onClick={() => {
                    swiper?.slideNext();
                    console.log(swiper);
                  }}
                />
              </div>
            </ControllerBox>
            <Divider />
            <PaginationWrapper>
              <CustomBullets
                className="swiper-pagination"
                curIndex={curIndex}
              ></CustomBullets>
            </PaginationWrapper>
          </div>
        </PageController>
      </CustomSwiper>
    </section>
  );
};
