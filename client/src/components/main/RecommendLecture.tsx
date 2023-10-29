import { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import { NavButton } from './SwiperNavButton';
import styled from 'styled-components';
import { getLecture } from '../../api/lecture';
import { Link } from 'react-router-dom';

const LectureCard = styled.div`
  width: 100%;
  height: 100%;
`;

const CardContents = styled.div`
  padding: 0.4rem 0;
  h2 {
    font-weight: 700;
    line-height: 1.5em;
    height: 3rem;
    font-size: 1rem;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    white-space: pre-wrap;
  }
  .lecture-creator {
    font-size: 0.9rem;
    color: #7d7d7d;
  }
  .lecture-price {
    color: var(--primaryColor);
    font-weight: 600;
  }
`;

const Card = styled.div`
  width: 100%;
  height: 150px;
  border-radius: 0.7rem;
  overflow: hidden;
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
      <div className="container px-4">
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
            <SwiperSlide key={data.create_id}>
              <LectureCard>
                <Link to={`/lectures/${data.create_id}`}>
                  <Card>
                    <img src={data.image_url} alt={data.title} />
                  </Card>
                  <CardContents>
                    <h2 className="lecture-title">{data.title}</h2>
                    <div className="lecture-creator">{data.creator}</div>
                    <div className="lecture-tags">{data.status}</div>
                    <div className="lecture-price">
                      ₩{data.price?.toLocaleString()}
                    </div>
                  </CardContents>
                </Link>
              </LectureCard>
            </SwiperSlide>
          ))}
        </Swiper>
        <NavButton navName="swiper-lecture" />
      </div>
    </section>
  );
};
