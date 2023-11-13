import styled from 'styled-components';
import { LectureDto } from '../../../types/LectureTypes';
import { calculateRemain } from '../../../utils/calculateRemain';
import { formatDate } from '../../../utils/formatData';
import { useLoginModalStore, useUserStore } from '../../../store/user';
import { useState } from 'react';
import { LectureApply } from './LectureApply';
import { RegButton } from '../../../assets/styles/CommonStyles';

const Aside = styled.aside`
  margin-right: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  position: sticky;
  top: 134px;
`;

const CurrentStatus = styled.div`
  display: flex;
  gap: 1rem;
`;

const AsideCard = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  border: 1px solid #ccc;
  border-radius: 0.5rem;
  padding: 0.7rem 1.3rem;
  font-size: 1rem;
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
  position: relative;
`;

const RemainTime = styled(AsideCard)`
  flex-grow: 1;
  span {
    font-size: 1rem;
  }
`;

const Price = styled(AsideCard)`
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
`;

const LectureDate = styled(AsideCard)`
  height: unset;
  gap: 1.2rem;
  padding: 1.4rem 1.5rem;
  .period {
    flex: 7;
  }
`;

export const DetailAside = ({ data }: { data: LectureDto | undefined }) => {
  const remainTime = calculateRemain(data?.recruitEnd_date);
  const startDate = data ? formatDate(data?.start_date) : '';
  const endDate = data ? formatDate(data?.end_date) : '';
  const { isLoggedIn } = useUserStore();
  const { handleLoginModal } = useLoginModalStore();
  const [isApplyModalOpen, setIsApplyModalOpen] = useState(false);

  const handleEnrollClick = () => {
    // 수강신청 버튼을 클릭했을 때 로그인 여부 확인
    if (!isLoggedIn) {
      // 로그인이 되어 있지 않으면 로그인 창을 띄움
      alert('로그인이 필요한 기능입니다.');
      handleLoginModal();
    } else {
      // 로그인이 되어 있으면 수강신청 로직을 진행
      setIsApplyModalOpen(true);
    }
  };

  const closeApplyModal = () => {
    setIsApplyModalOpen(false);
  };

  return (
    <div className="basis-1/3">
      <Aside>
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
            {data?.status === '신청가능상태' ? (
              <span>
                {/* 정규식 이용하여 숫자만 추출 */}
                <strong>{remainTime?.match(/\d+/)?.[0]}</strong>
                {remainTime?.includes('시간') ? (
                  <span>시간</span>
                ) : (
                  <span>일</span>
                )}
                <span></span>
                <span className="ml-1">남았습니다!</span>
              </span>
            ) : (
              <span>-</span>
            )}
          </RemainTime>
        </CurrentStatus>
        <Price>
          <div>
            <span className="price">{data?.price.toLocaleString()}원</span>
          </div>
          {data?.status === '신청가능상태' ? (
            <RegButton onClick={handleEnrollClick}>신청하기</RegButton>
          ) : (
            <Closed>해당 강좌의 모집은 마감되었습니다.</Closed>
          )}
        </Price>
        <LectureDate>
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
        </LectureDate>
      </Aside>
      {/* 강의 신청 Modal */}
      {isApplyModalOpen && (
        <LectureApply
          lectureId={data?.create_id}
          closeModal={closeApplyModal}
        />
      )}
    </div>
  );
};
