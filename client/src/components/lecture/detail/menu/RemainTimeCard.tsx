import styled from 'styled-components';
import { AsideCard } from '../../../../assets/styles/MenuStyle';
import { LectureDto } from '../../../../types/LectureTypes';
import { calculateRemain } from '../../../../utils/calculateRemain';

export const RemainTimeCard = ({ data }: { data: LectureDto | undefined }) => {
  const remainTime = calculateRemain(data?.recruitEnd_date);
  return (
    <RemainTime>
      <h1>모집 기한</h1>
      {data?.status === '신청가능상태' ? (
        <span>
          {/* 정규식 이용하여 숫자만 추출 */}
          <strong>{remainTime?.match(/\d+/)?.[0]}</strong>
          {remainTime?.includes('시간') ? <span>시간</span> : <span>일</span>}
          <span></span>
          <span className="ml-1">남았습니다!</span>
        </span>
      ) : (
        <span>-</span>
      )}
    </RemainTime>
  );
};

const RemainTime = styled(AsideCard)`
  flex-grow: 1;
  span {
    font-size: 1rem;
  }
`;
