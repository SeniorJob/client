import styled from 'styled-components';
import { useState } from 'react';
import { useSwiper } from 'swiper/react';
import Pause from '../../assets/images/pause.svg?react';
import Play from '../../assets/images/play.svg?react';

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

// 상단 배너 Navigation 버튼
export const BannerNav = () => {
  const swiper = useSwiper();
  const [isPlaying, setIsPlaying] = useState<boolean>(true);

  // autoplay 토글 버튼
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
  );
};

export const CategoryNav = () => {
  return <div>카테고리 내비게이션 버튼</div>;
};
