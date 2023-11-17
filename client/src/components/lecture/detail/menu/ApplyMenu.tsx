import styled from 'styled-components';
import { RegButton } from '../../../../assets/styles/CommonStyles';
import { AsideCard } from '../../../../assets/styles/MenuStyle';
import { LectureDto } from '../../../../types/LectureTypes';

interface ApplyMenu_T {
  data: LectureDto | undefined;
  isApplied: boolean;
  handleModal: (type: string) => void;
}

export const ApplyMenu: React.FC<ApplyMenu_T> = ({
  data,
  isApplied,
  handleModal,
}) => (
  <ApplyCard>
    <div>
      <span className="price">
        {data?.price === 0 ? '무료' : data?.price.toLocaleString() + '원'}
      </span>
    </div>
    {data?.status === '신청가능상태' ? (
      isApplied ? (
        <RegButton onClick={() => handleModal('취소')}>신청 취소하기</RegButton>
      ) : (
        <RegButton onClick={() => handleModal('신청')}>신청하기</RegButton>
      )
    ) : (
      <Closed>해당 강좌의 모집은 마감되었습니다.</Closed>
    )}
  </ApplyCard>
);

const ApplyCard = styled(AsideCard)`
  height: unset;
  gap: 1.2rem;
  align-items: baseline;
  padding: 1.4rem 1.5rem;
  .price {
    font-size: 1.5rem;
    font-weight: 700;
  }
`;

const Closed = styled(RegButton)`
  cursor: unset;
  opacity: 0.3;
  &:hover {
    opacity: 0.3;
  }
`;
