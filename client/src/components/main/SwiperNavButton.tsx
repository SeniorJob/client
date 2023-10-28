import styled from 'styled-components';
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

// BannerNav 타입 선언
type BannerNavProps = {
  toggleAutoplay: () => void;
  isPlaying: boolean;
};

export const BannerNav: React.FC<BannerNavProps> = ({
  toggleAutoplay,
  isPlaying,
}) => {
  const swiper = useSwiper();
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
