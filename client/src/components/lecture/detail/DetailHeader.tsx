import styled from 'styled-components';
import { LectureDto } from '../../../types/LectureTypes';
import { Link } from 'react-router-dom';
import LocationSVG from '../../../assets/images/location.svg?react';
import TargetSVG from '../../../assets/images/target.svg?react';
import CreatorSVG from '../../../assets/images/creator.svg?react';

const Wrapper = styled.div`
  width: 100%;
  padding: 40px 0;
  background: rgba(150, 212, 246, 0.2);
`;

const Thumbnail = styled.div`
  flex: 4;
  height: 300px;
  overflow: hidden;
  border-radius: 0.8rem;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: 0.3s all ease;
    &:hover {
      scale: 1.02;
    }
  }
`;

const DetailMenu = styled.div`
  width: 100%;
  box-shadow:
    0 1px 2px hsla(0, 0%, 0%, 0.05),
    0 1px 4px hsla(0, 0%, 0%, 0.05),
    0 2px 8px hsla(0, 0%, 0%, 0.05);
`;

const DetailButton = styled.button`
  padding: 0.8rem 0;
  color: #9f9f9f;
`;

const HeaderDesc = styled.div`
  display: flex;
  flex: 6;
  flex-direction: column;
  color: #1c5690;
  h1 {
    color: #000;
    font-size: x-large;
    line-height: 1.5;
    font-weight: 700;
    margin-bottom: 1.5rem;
  }
  .category {
    font-weight: 600;
    &::before {
      content: '〉';
      margin-right: 0.5rem;
    }
  }
  div {
    display: flex;
    gap: 0.4rem;
    align-items: center;
    margin-bottom: 0.5rem;
  }
`;

export const DetailHeader = ({ data }: { data: LectureDto | undefined }) => {
  return (
    <div>
      <Wrapper>
        <div className="container px-8">
          <div className="flex gap-10 items-center">
            <Thumbnail>
              <img src={data?.image_url} />
            </Thumbnail>
            <HeaderDesc>
              <div className="flex gap-2 mb-2">
                <span>전체 강의</span>
                <span className="category">{data?.category}</span>
              </div>
              <h1>{data?.title}</h1>
              <div>
                <CreatorSVG width={20} height={20} />
                <span>{data?.creator}</span>
              </div>
              <div>
                <LocationSVG width={20} height={20} />
                <span>{data?.region}</span>
              </div>
              <div>
                <TargetSVG width={20} height={20} />
                <span>{data?.learning_target}</span>
              </div>
            </HeaderDesc>
          </div>
        </div>
      </Wrapper>
      <DetailMenu>
        <div className="container flex gap-10 px-8">
          <Link to="#intro">
            <DetailButton>강좌 소개</DetailButton>
          </Link>
          <Link to="#curriculum">
            <DetailButton>강좌 상세 내용</DetailButton>
          </Link>
        </div>
      </DetailMenu>
    </div>
  );
};
