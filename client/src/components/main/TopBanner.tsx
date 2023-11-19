import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { BannerNav } from './SwiperNavButton';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Swiper as SwiperClass } from 'swiper/types';
import { Autoplay, Pagination } from 'swiper/modules';
import { Divider } from '../../assets/styles/CommonStyles';
import { getBanner } from '../../api/lecture';

const CustomSlide = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 330px;
  background-color: #eee;
  overflow: hidden;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
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

const CustomBullets = styled.div<{ $curIndex: number }>`
  position: absolute;
  bottom: 0 !important;
  left: 0;
  top: 0 !important;
  display: flex;
  z-index: 71;
  height: 36px;
  transform: ${props => (props.$curIndex >= 6 ? `translateX(-200px)` : '0')};
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
    font-weight: 600;
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

export const TopBanner = () => {
  const [swiper, setSwiper] = useState<SwiperClass>();
  const [curIndex, setCurIndex] = useState<number>();
  interface Banner_T {
    bannerId: number;
    bannerUrl: string;
    bannerTitle?: string;
  }

  const [banner, setBanner] = useState<Banner_T[]>([]);

  useEffect(() => {
    const fetchBanner = async () => {
      try {
        const res = await getBanner();
        if (res?.status === 200) setBanner(res?.data);
      } catch (err) {
        console.log(err, '배너 불러오기 오류');
      }
    };
    fetchBanner();
  }, [swiper]);

  useEffect(() => {
    swiper?.on('slideChange', () => {
      setCurIndex(swiper.realIndex + 1);
    });
  }, [swiper]);

  return (
    <section className="banner">
      <Swiper
        onSwiper={setSwiper}
        autoplay={{
          delay: 3500,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        pagination={{
          el: '.swiper-pagination',
          clickable: true,
          renderBullet: function (index, className) {
            const data = banner[index];
            return `<div class="${className}"><span>${
              data?.bannerTitle || '배너 타이틀'
            }</span></div>`;
          },
        }}
        loop={true}
        slidesPerView={1}
        modules={[Autoplay, Pagination]}
        className="mySwiper"
      >
        {banner ? (
          banner.map(data => (
            <SwiperSlide key={data.bannerId}>
              <CustomSlide>
                <img src={data.bannerUrl} alt="banner" />
              </CustomSlide>
            </SwiperSlide>
          ))
        ) : (
          <CustomSlide>준비중</CustomSlide>
        )}
        <PageController>
          <div className="container flex items-center px-8">
            <ControllerBox>
              <div className="custom-pagination flex-1 flex justify-center">
                {curIndex} / {swiper?.slides.length}
              </div>
              {/* prev, next, pause 버튼 */}
              <BannerNav />
            </ControllerBox>
            <Divider />
            <PaginationWrapper>
              <CustomBullets
                className="swiper-pagination"
                $curIndex={curIndex!}
              />
              {curIndex && curIndex >= 6 ? (
                <div className="left-gradient" />
              ) : null}
              {curIndex && curIndex <= 7 ? (
                <div className="right-gradient" />
              ) : null}
            </PaginationWrapper>
          </div>
        </PageController>
      </Swiper>
    </section>
  );
};
