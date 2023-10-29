import { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import { NavButton } from './SwiperNavButton';
import styled from 'styled-components';
import { getLecture } from '../../api/lecture';

const LectureCard = styled.div`
  width: 100%;
  height: 100%;
`;

const Card = styled.div`
  width: 100%;
  height: 150px;
  background-color: lightgreen;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

type LectureObject = {
  [key: string]: string | undefined;
};

export const RecommendLecture = () => {
  const [data, setData] = useState<LectureObject[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const lectureData = await getLecture();
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
      <div className="container">
        <h1>추천 강좌 리스트</h1>
        <Swiper
          slidesPerView={5}
          spaceBetween={10}
          navigation={{
            prevEl: '.swiper-lecture-prev',
            nextEl: '.swiper-lecture-next',
          }}
          modules={[Navigation]}
        >
          {data.map(data => (
            <SwiperSlide>
              <LectureCard>
                <Card>
                  <img src={data.image_url} alt={data.title} />
                </Card>
                <h2>{data.title}</h2>
              </LectureCard>
            </SwiperSlide>
          ))}
          <NavButton navName="swiper-lecture" />
        </Swiper>
      </div>
    </section>
  );
};
