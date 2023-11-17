import styled from 'styled-components';
import { useState, useEffect } from 'react';
import { LectureDto } from '../../../types/LectureTypes';
import { Link } from 'react-router-dom';
import LocationSVG from '../../../assets/images/location.svg?react';
import TargetSVG from '../../../assets/images/target.svg?react';
import CreatorSVG from '../../../assets/images/creator.svg?react';

interface DetailHeaderProps {
  data: LectureDto | undefined;
  introSectionRef: React.RefObject<HTMLDivElement>;
  curriculumSectionRef: React.RefObject<HTMLDivElement>;
}

export const DetailHeader: React.FC<DetailHeaderProps> = ({
  data,
  introSectionRef,
  curriculumSectionRef,
}) => {
  const [curRef, setCurRef] = useState<'intro' | 'curriculum' | null>('intro');
  const tabHeight = 64 + 51.59;

  const scrollToSection = (ref: React.RefObject<HTMLDivElement>) => {
    if (ref.current) {
      window.scrollTo({
        top: ref.current.offsetTop + tabHeight + 250,
        behavior: 'smooth',
      });
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;

      if (introSectionRef.current && curriculumSectionRef.current) {
        const curriculumOffset =
          curriculumSectionRef.current.offsetTop + tabHeight + 240;

        if (scrollY >= curriculumOffset) {
          setCurRef('curriculum');
        } else {
          setCurRef('intro');
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [tabHeight, introSectionRef, curriculumSectionRef]);

  return (
    <>
      <Wrapper>
        <div className="container px-8">
          <div className="flex gap-10 items-center">
            <Thumbnail>
              <img src={data?.image_url} />
            </Thumbnail>
            <HeaderDesc>
              <div className="flex mb-2">
                <Status $status={data?.status}>{data?.status}</Status>
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
          <Link to="#intro" replace={true}>
            <DetailButton
              onClick={() => scrollToSection(introSectionRef)}
              $isHighlighted={curRef === 'intro'}
            >
              강좌 소개
            </DetailButton>
          </Link>
          <Link to="#curriculum" replace={true}>
            <DetailButton
              onClick={() => scrollToSection(curriculumSectionRef)}
              $isHighlighted={curRef === 'curriculum'}
            >
              커리큘럼
            </DetailButton>
          </Link>
        </div>
      </DetailMenu>
    </>
  );
};

const Status = styled.span<{ $status?: string }>`
  width: fit-content;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 1rem;
  color: white;
  border: none;
  background-color: ${({ $status }) => {
    // data.status 값에 따라 다른 색상을 지정
    switch ($status) {
      case '진행상태':
        return '#f99c74'; // 예시: 진행 중인 경우 초록색
      case '신청가능상태':
        return 'var(--primaryColor)'; // 예시: 완료된 경우 파란색
      default:
        return '#1c5690'; // 기본 색상
    }
  }};
  font-size: 0.9rem;
  padding: 0.3rem 0.7rem;
`;

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
  position: sticky;
  top: 64px;
  z-index: 10;
  background-color: #fff;
  width: 100%;
  box-shadow:
    0 1px 2px hsla(0, 0%, 0%, 0.05),
    0 1px 4px hsla(0, 0%, 0%, 0.05),
    0 2px 8px hsla(0, 0%, 0%, 0.05);
`;

const DetailButton = styled.button<{ $isHighlighted?: boolean }>`
  padding: 0.8rem 0;
  color: #9f9f9f;
  ${({ $isHighlighted }) =>
    $isHighlighted &&
    `
    font-weight: 700;
    color: #000;
    border-bottom: 2px solid`}
`;

const HeaderDesc = styled.div`
  display: flex;
  flex: 5.5;
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
      content: '>';
      margin-right: 0.5rem;
    }
  }
  div {
    display: flex;
    font-weight: 500;
    gap: 0.4rem;
    align-items: center;
    margin-bottom: 0.5rem;
  }
`;
