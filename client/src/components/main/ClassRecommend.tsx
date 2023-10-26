import { useState } from 'react';
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
  .swiper-pagination {
    position: relative;
    top: 0;
  }
`;

const PageController = styled.div`
  display: flex;
  align-items: center;
  height: 64px;
  border-bottom: 1px solid #e9ecef;
`;

const ControllerBox = styled.div`
  display: flex;
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

export const ClassRecommend = () => {
  const [swiper, setSwiper] = useState<SwiperClass | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);

  // 일시정지 버튼
  const toggleAutoplay = () => {
    if (swiper) {
      if (swiper.autoplay.running) {
        swiper.autoplay.stop();
        setIsPlaying(false);
      } else {
        swiper.autoplay.start();
        setIsPlaying(true);
      }
    }
    console.log(swiper?.autoplay);
  };

  return (
    <section>
      <CustomSwiper
        onSwiper={setSwiper}
        autoplay={{
          delay: 3500,
          disableOnInteraction: true,
        }}
        loop={true}
        // pagination={{
        //   type: 'fraction',
        // }}
        // navigation={true}
        modules={[Autoplay, Navigation, Pagination, Controller]}
        className="mySwiper"
      >
        <CustomSlide>Slide 1</CustomSlide>
        <CustomSlide>Slide 2</CustomSlide>
        <CustomSlide>Slide 3</CustomSlide>
        <CustomSlide>Slide 4</CustomSlide>
        <CustomSlide>Slide 5</CustomSlide>
        <CustomSlide>Slide 6</CustomSlide>
        <PageController>
          <div className="container">
            <ControllerBox>
              {/* prev, next, pause 버튼 */}
              <PrevButton onClick={() => swiper?.slidePrev()} />
              <button onClick={toggleAutoplay}>
                {isPlaying ? <Pause /> : <Play />}
              </button>
              <NextButton onClick={() => swiper?.slideNext()} />
            </ControllerBox>
          </div>
        </PageController>
      </CustomSwiper>
    </section>
  );
};
