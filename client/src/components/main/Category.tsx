import styled from 'styled-components';
import { Card } from '../category/CategoryCard';
import { categoryData } from '../category/categoryData';
// Swiper 관련 모듈 Import
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const Section = styled.section`
  position: relative;
  max-width: 1200px;
  padding: 1rem;
  margin: 0 auto;
`;

const CategoryTag = styled(SwiperSlide)`
  /* background-color: lightgreen; */
  width: fit-content !important;
  border-radius: 1rem;
`;

const CardButton = styled.button`
  &:hover {
    .title {
      color: var(--primaryColor);
    }
  }
`;

export const Category = () => {
  return (
    <Section>
      <div className="relative">
        <Swiper
          grabCursor={true}
          slidesPerView={10}
          spaceBetween={45}
          freeMode={true}
          modules={[FreeMode]}
          className="mySwiper"
        >
          {categoryData.map(item => (
            <CategoryTag>
              <CardButton>
                <Card>
                  <img src={item.img} alt={item.title} />
                </Card>
                <div className="title">
                  <span>{item.title}</span>
                </div>
              </CardButton>
            </CategoryTag>
          ))}
        </Swiper>
      </div>
    </Section>
  );
};
