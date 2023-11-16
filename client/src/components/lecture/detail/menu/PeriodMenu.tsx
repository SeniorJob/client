import styled from 'styled-components';
import { LectureDto } from '../../../../types/LectureTypes';
import { formatDate } from '../../../../utils/formatData';
import { AsideCard } from '../../../../assets/styles/MenuStyle';

export const PeriodMenu = ({ data }: { data: LectureDto | undefined }) => {
  const startDate = data ? formatDate(data?.start_date) : '';
  const endDate = data ? formatDate(data?.end_date) : '';

  return (
    <PeriodCard>
      <div className="flex gap-6 w-full">
        <div>
          <h1>교육 기간</h1>
        </div>
        <div className="period">
          <span>{startDate}</span>
          <span> ~</span>
          <div className="text-end">
            <span>{endDate}</span>
          </div>
        </div>
      </div>
    </PeriodCard>
  );
};

const PeriodCard = styled(AsideCard)`
  height: unset;
  gap: 1.2rem;
  padding: 1.4rem 1.5rem;
  .period {
    flex: 7;
  }
`;
