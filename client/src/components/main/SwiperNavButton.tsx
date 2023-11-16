import styled from 'styled-components';
import { useState } from 'react';
import { useSwiper, SwiperClass } from 'swiper/react';
import Pause from '../../assets/images/pause.svg?react';
import Play from '../../assets/images/play.svg?react';
import ArrowLeftSVG from '../../assets/images/arrowleft.svg?react';
import ArrowRightSVG from '../../assets/images/arrowright.svg?react';

const Button = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 24px;
  height: 24px;
`;

const CircleButton = styled(Button)`
  z-index: 71;
  position: absolute;
  top: 0;
  bottom: 0;
  transition: all 0.2s ease-in;
  width: 44px;
  height: 44px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid #ccc;
  border-radius: 50%;
  font-size: 1.2rem;
  margin: auto 0;
  background: hsla(0, 0%, 100%, 0.85);
  box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.1);
  color: #333;
  &:hover {
    box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.4);
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
      <Button onClick={() => goPrev(swiper)}>
        <ArrowLeftSVG width={20} height={20} />
      </Button>
      <button onClick={toggleAutoplay}>
        {isPlaying ? <Pause /> : <Play />}
      </button>
      <Button onClick={() => goNext(swiper)}>
        <ArrowRightSVG width={20} height={20} />
      </Button>
    </div>
  );
};

// 카테고리 navigation 버튼
type NavButtonProps = {
  navName: string;
};

export const NavButton = ({ navName }: NavButtonProps) => {
  return (
    <div>
      <CircleButton className={`${navName}-prev left-0`}>
        <ArrowLeftSVG width={24} />
      </CircleButton>
      <CircleButton className={`${navName}-next right-0`}>
        <ArrowRightSVG width={24} />
      </CircleButton>
    </div>
  );
};
