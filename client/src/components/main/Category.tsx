import styled from 'styled-components';
import { CategoryCard } from '../category/CategoryCard';
import { categoryData } from '../category/categoryData';
import { NavButton } from './SwiperNavButton';
// Swiper 관련 모듈 Import
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';

const Section = styled.section`
  position: relative;
  max-width: 1200px;
  padding: 1.5rem 1rem;
  margin: 0 auto;
`;

export const Category = () => {
  return (
    <Section>
      <div className="relative">
        <Swiper
          grabCursor={true}
          slidesPerView={10}
          spaceBetween={45}
          navigation={{
            prevEl: '.swiper-category-prev',
            nextEl: '.swiper-category-next',
          }}
          modules={[Navigation]}
          className="mySwiper"
        >
          {categoryData.map(data => (
            <SwiperSlide key={data.id}>
              <CategoryCard data={data} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <NavButton navName="swiper-category" />
    </Section>
  );
};
