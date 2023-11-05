import styled from 'styled-components';
import { LectureDto } from '../../../types/LectureTypes';

const Aside = styled.div`
  flex-basis: calc(100% * 1 / 3);
  max-width: calc(100% * 1 / 3);
  margin-right: 1.5rem;
`;

const CurrentStatus = styled.div`
  display: flex;
  gap: 0.8rem;
`;

const AsideCard = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  height: 75px;
  border: 1px solid #ccc;
  border-radius: 0.5rem;
  padding: 0.6rem 0.9rem;
  font-size: 0.9rem;
  font-weight: 500;
  color: #222222;
  h1 {
    font-weight: 700;
    color: #2d5e87;
  }
  strong {
    font-size: 1.5rem;
    font-weight: 700;
    color: #1c5690;
  }
`;

const Participants = styled(AsideCard)`
  width: 120px;
`;

const RemainTime = styled(AsideCard)`
  flex-grow: 1;
  span {
    font-size: 1rem;
  }
`;

export const DetailAside = ({ data }: { data: LectureDto | undefined }) => {
  return (
    <Aside>
      nav
      <CurrentStatus>
        <Participants>
          <h1>모집 인원</h1>
          <div className="flex gap-0.5 items-baseline">
            <div>
              <strong>{data?.current_participants}</strong>
              <span>명</span>
            </div>
            <span>/</span>
            <span>{data?.max_participants}명</span>
          </div>
        </Participants>
        <RemainTime>
          <h1>모집 기한</h1>
          <span>{data?.daysUntilRecruitEndMessage}</span>
        </RemainTime>
      </CurrentStatus>
    </Aside>
  );
};
