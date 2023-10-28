import styled from 'styled-components';
import { useState } from 'react';
import { useSwiper, SwiperClass } from 'swiper/react';
import Pause from '../../assets/images/pause.svg?react';
import Play from '../../assets/images/play.svg?react';

interface PrevButtonProps {
  direction: 'prev' | 'next'; // 타입을 'prev' 또는 'next'로 지정
}

const Button = styled.button<PrevButtonProps>`
  &::before {
    ${props =>
      props.direction === 'prev' ? "content: '〈' " : "content: '〉'"};
  }
`;

const CircleButton = styled(Button)`
  z-index: 71;
  position: absolute;
  padding: 0;
  transition: all 0.2s ease-in;
  min-width: 44px;
  min-height: 44px;
  width: 44px;
  height: 44px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 50%;
  font-size: 1.125rem;
  top: 0;
  bottom: 0;
  margin: auto 0;
  opacity: 1;
  background: hsla(0, 0%, 100%, 0.85);
  box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.1);
  color: #333;
  &::before {
    ${props =>
      props.direction === 'prev' ? "content: '〈' " : "content: '〉'"};
  }
  &:hover {
    box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.3);
  }
  &:disabled {
    display: none;
  }
`;

// prev, next 함수
const goPrev = (swiper: SwiperClass) => {
  swiper?.slidePrev();
};
const goNext = (swiper: SwiperClass) => {
  swiper?.slideNext();
};

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
      <Button direction="prev" onClick={() => goPrev(swiper)} />
      <button onClick={toggleAutoplay}>
        {isPlaying ? <Pause /> : <Play />}
      </button>
      <Button direction="next" onClick={() => goNext(swiper)} />
    </div>
  );
};

// 카테고리 navigation 버튼
export const CategoryNav = () => {
  return (
    <div>
      <CircleButton direction="prev" className="swiper-prev left-0" />
      <CircleButton direction="next" className="swiper-next right-0" />
    </div>
  );
};
