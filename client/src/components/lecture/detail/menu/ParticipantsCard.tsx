import styled from 'styled-components';
import { LectureDto } from '../../../../types/LectureTypes';
import { AsideCard } from '../../../../assets/styles/MenuStyle';

export const ParticipantsCard = ({
  data,
}: {
  data: LectureDto | undefined;
}) => {
  return (
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
  );
};

const Participants = styled(AsideCard)`
  position: relative;
`;
