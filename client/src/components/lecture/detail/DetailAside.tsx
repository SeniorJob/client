import styled from 'styled-components';
import { LectureDto } from '../../../types/LectureTypes';
import { calculateRemain } from '../../../utils/calculateRemain';
import { formatDate } from '../../../utils/formatData';

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
  height: 75px;
  border: 1px solid #ccc;
  border-radius: 0.5rem;
  padding: 0.6rem 1.3rem;
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

const RegButton = styled.button`
  width: 100%;
  padding: 1rem 1rem;
  background-color: var(--primaryColor);
  color: #fff;
  font-size: 1rem;
  font-weight: 600;
  border-radius: 0.5rem;
`;

const Closed = styled(RegButton)`
  cursor: unset;
  background-color: #ccc;
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
            <RegButton>신청하기</RegButton>
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
    </div>
  );
};
