import styled from 'styled-components';
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

export const DetailContent = ({
  data,
}: {
  data: LectureDetailProps | null | undefined;
}) => {
  const lectureDto = data?.lectureDto;
  const weekDto = data?.weekDto;
  const weekPlanDto = data?.weekPlanDto;

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
          <h2>커리큘럼</h2>
          {weekDto?.map((weekItem, weekIndex) => (
            <div key={weekIndex}>
              <h3>
                <span>{weekIndex + 1}</span>주차 {weekItem.week_title}
              </h3>
              <ul>
                {weekPlanDto
                  ?.filter(planItem => planItem.week_id === weekItem.week_id)
                  .map((planItem, planIndex) => (
                    <li key={planIndex}>{planItem.detail}</li>
                  ))}
              </ul>
            </div>
          ))}
        </section>
      </Content>
    </ContentWrapper>
  );
};
