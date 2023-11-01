import { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import { NavButton } from './SwiperNavButton';
import styled from 'styled-components';
import { LectureData } from '../lecture/LectureCard';
import { getPopularLecture } from '../../api/lecture';
import { Link } from 'react-router-dom';

const Nodata = styled.div`
  display: flex;
  justify-content: center;
  background-color: #f6f6f6;
  align-items: center;
  height: 150px;
  span {
    font-size: 1.5rem;
    font-weight: 700;
  }
`;

const LectureHeader = styled.div`
  display: flex;
  margin-bottom: 1rem;
  h1 {
    display: flex;
    align-items: center;
    font-size: 1.5rem;
    line-height: 1.5rem;
    font-weight: 600;
    &::after {
      content: '〉';
      font-size: 1rem;
      padding-left: 0.7rem;
    }
  }
  p {
    color: #7d7d7d;
    margin-top: 0.4rem;
    font-size: 0.95rem;
  }
`;

type LectureObject = {
  [key: string]: string | number | undefined;
};

export const RecommendLecture = () => {
  const [data, setData] = useState<LectureObject[]>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const lectureData = await getPopularLecture('limit=10');
        setData(lectureData);
        console.log(lectureData);
      } catch (error) {
        console.error('에러 발생:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <section className="py-6">
      <div className="container px-4">
        <LectureHeader>
          <div>
            <Link to={'/'}>
              <h1>지금 HOT한 강좌들이에요 🔥</h1>
            </Link>
            <p>인기많은 강좌를 수강해 보세요!</p>
          </div>
        </LectureHeader>
        <Swiper
          slidesPerView={5}
          spaceBetween={10}
          navigation={{
            prevEl: '.swiper-lecture-prev',
            nextEl: '.swiper-lecture-next',
          }}
          modules={[Navigation]}
        >
          {data ? (
            data.map(data => (
              <SwiperSlide key={data.create_id}>
                <LectureData data={data} />
              </SwiperSlide>
            ))
          ) : (
            <Nodata>
              <span>강좌 데이터가 없습니다.</span>
            </Nodata>
          )}
        </Swiper>
        <NavButton navName="swiper-lecture" />
      </div>
    </section>
  );
};
