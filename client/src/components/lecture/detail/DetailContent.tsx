import styled from 'styled-components';
import { useState, useEffect } from 'react';
import { LectureDetailProps } from '../../../types/LectureTypes';

const ContentWrapper = styled.div`
  flex-basis: calc(100% * 2 / 3);
  max-width: calc(100% * 2 / 3);
  h2 {
    font-size: 1.4rem;
    font-weight: 600;
    margin-bottom: 0.5rem;
  }
`;

const Content = styled.div`
  max-width: 700px;
  padding-right: 2rem;
`;

const AccordionHeader = styled.div`
  cursor: pointer;
  user-select: none;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.8rem 1rem;
  background-color: #f2f2f2;
`;

const Curriculum = styled.div`
  border: 1px solid #ddd;
  background-color: #fafafa;
  border-radius: 0.3rem;
  overflow: hidden;
`;

const CurriculumHeader = styled.div`
  margin-bottom: 0.5rem;
  .curriculum-title {
    font-size: 1.4rem;
    font-weight: 600;
  }
  .curriculum-info {
    margin-left: 0.6rem;
    font-size: 0.9rem;
    font-weight: 500;
    color: #aaa;
  }
`;

const AccordionItem = styled.div`
  font-weight: 600;
`;

const AccordionContent = styled.ul<{ $isOpen: boolean }>`
  list-style-type: none;
  margin: 0;
  padding: 0;
  display: ${({ $isOpen }) => ($isOpen ? 'block' : 'none')};
`;

const AccordionContentItem = styled.li`
  padding: 0.8rem 1rem;
  font-size: 0.9rem;
  font-weight: 400;
`;

export const DetailContent = ({
  data,
}: {
  data: LectureDetailProps | null | undefined;
}) => {
  const lectureDto = data?.lectureDto;
  const weekDto = data?.weekDto;
  const weekPlanDto = data?.weekPlanDto;

  const [accordion, setAccordion] = useState<{ [key: number]: boolean }>({});

  useEffect(() => {
    setAccordion(
      weekDto?.reduce(
        (acc, week) => {
          acc[week.week_id] = true;
          return acc;
        },
        {} as { [key: number]: boolean },
      ) || {},
    );
  }, [weekDto]); // weekDto가 변경될 때마다 useEffect가 실행되도록 설정

  // 아코디언 토글 함수
  const toggleAccordion = (weekId: number) => {
    setAccordion(prev => ({ ...prev, [weekId]: !prev[weekId] }));
    console.log(accordion);
  };

  return (
    <ContentWrapper>
      <Content>
        {/* 인트로 섹션 */}
        <section id="intro" className="mb-8">
          <h2>강좌 소개</h2>
          <p>{lectureDto?.content}</p>
        </section>

        {/* 커리큘럼 섹션 */}
        <section id="curriculum">
          <CurriculumHeader>
            <span className="curriculum-title">커리큘럼</span>
            <span className="curriculum-info">
              총 {weekDto?.length}주, {weekPlanDto?.length}개 수업
            </span>
          </CurriculumHeader>
          <Curriculum>
            {weekDto?.map((weekItem, weekIndex: number) => (
              <AccordionItem key={weekIndex}>
                <AccordionHeader
                  onClick={() => toggleAccordion(weekItem.week_id)}
                >
                  <span>
                    <span>{weekIndex + 1}</span>주차. {weekItem.week_title}
                  </span>
                  <span>{accordion[weekItem.week_id] ? '-' : '+'}</span>
                </AccordionHeader>
                <AccordionContent $isOpen={accordion[weekItem.week_id]}>
                  {weekPlanDto
                    ?.filter(planItem => planItem.week_id === weekItem.week_id)
                    .map((planItem, planIndex: number) => (
                      <AccordionContentItem key={planIndex}>
                        <span>
                          <span>{`${weekIndex + 1}-${planIndex + 1}.`}</span>
                          {} {planItem.detail}
                        </span>
                      </AccordionContentItem>
                    ))}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Curriculum>
        </section>
      </Content>
    </ContentWrapper>
  );
};
