import { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import { NavButton } from './SwiperNavButton';
import styled from 'styled-components';
import { LectureData } from '../lecture/LectureData';
import { getLecture } from '../../api/lecture';
import { Link } from 'react-router-dom';
import { recommendProps, LectureObject } from '../../types/LectureTypes';
import { recommendNewest, recommendPopular } from './recommendType';

const Nodata = styled.div`
  display: flex;
  justify-content: center;
  background-color: #f6f6f6;
  align-items: center;
  height: 150px;
  span {
    font-size: 1.5rem;
    font-weight: 600;
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
      font-size: 1.2rem;
      padding-left: 0.7rem;
    }
  }
  p {
    color: #7d7d7d;
    margin-top: 0.4rem;
    font-size: 0.95rem;
  }
`;

export const RecommendLecture = ({ recommendType }: recommendProps) => {
  const [data, setData] = useState<LectureObject[]>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const lectureData = await getLecture(
          recommendType.endPoint,
          recommendType.params,
        );
        lectureData.content
          ? setData(lectureData.content)
          : setData(lectureData);
      } catch (error) {
        console.error('에러 발생:', error);
      }
    };

    fetchData();
  }, [recommendType.endPoint, recommendType.params]);

  return (
    <section className="py-6">
      <div className="container px-4">
        <LectureHeader>
          <div>
            <Link
              to={`lectures/filter?${(() => {
                switch (recommendType) {
                  case recommendPopular:
                    return 'filter=popularity';
                  case recommendNewest:
                    return 'filter=latest';
                  default:
                    return `category=${recommendType.params?.category}&filter=latest`;
                }
              })()}`}
            >
              <h1>{recommendType.title}</h1>
            </Link>
            <p>{recommendType.subTitle}</p>
          </div>
        </LectureHeader>
        <Swiper
          slidesPerView={5}
          spaceBetween={10}
          navigation={{
            prevEl: `.swiper-${recommendType.name}-lecture-prev`,
            nextEl: `.swiper-${recommendType.name}-lecture-next`,
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
        <NavButton navName={`swiper-${recommendType.name}-lecture`} />
      </div>
    </section>
  );
};
