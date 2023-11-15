import styled from 'styled-components';
import { LectureDto } from '../../../types/LectureTypes';
import { calculateRemain } from '../../../utils/calculateRemain';
import { formatDate } from '../../../utils/formatData';
import { useLoginModalStore, useUserStore } from '../../../store/user';
import { useEffect, useState } from 'react';
import { ApplyLecture } from './ApplyLecture';
import { RegButton } from '../../../assets/styles/CommonStyles';
import { DeleteLecture } from './DeleteLecure';
import { getAppliedLectureId } from '../../../api/lecture';
import { createPortal } from 'react-dom';
import EditOpeningModal from '../../MyPage/Edit/EditOpeningModal';
import { getDetailOfApplyLectures } from '../../../api/mypage';

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

const AdminMenu = styled(AsideCard)`
  gap: 1rem;
  padding: 1rem;
`;

const ModifyButton = styled(RegButton)`
  background-color: #abc3eb;
  &:hover {
    background-color: #abc3ebd6;
  }
`;

const DeleteButton = styled(RegButton)`
  background-color: #f9827d;
  &:hover {
    background-color: #f9817dd6;
  }
`;

export const DetailAside = ({ data }: { data: LectureDto | undefined }) => {
  const remainTime = calculateRemain(data?.recruitEnd_date);
  const startDate = data ? formatDate(data?.start_date) : '';
  const endDate = data ? formatDate(data?.end_date) : '';
  const { isLoggedIn, userDetail } = useUserStore();
  const { handleLoginModal } = useLoginModalStore();
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState('');
  const [appliedLectureIds, setAppliedLectureIds] = useState<Array<number>>([]);
  const [lectureId, setLectureId] = useState<number>();
  // 유저가 신청한 강의인지 확인
  const isApplied = appliedLectureIds.includes(data?.create_id || 0);

  type AppliedLectureIds_T = {
    create_id: number;
    le_id: number;
    uid: number;
    userName: string;
  };
  // 사용자가 신청한 강의 ID 불러오기
  const fetchAppliedLectureIds = async () => {
    try {
      const response = await getAppliedLectureId();
      setAppliedLectureIds(
        response.map((item: AppliedLectureIds_T) => item.create_id),
      );
    } catch (error) {
      console.error('강의 아이디 불러오기 오류:', error);
    }
  };
  useEffect(() => {
    fetchAppliedLectureIds();
  }, []);

  useEffect(() => {
    const getLectureId = async () => {
      const res = await getDetailOfApplyLectures(data?.create_id);
      res.status === 200 && setLectureId(res.data.lectureApplyDto.le_id);
    };

    getLectureId();
  }, [data?.create_id]);

  const handleModal = (type: string) => {
    if (!isLoggedIn) {
      // 로그인이 되어 있지 않으면 로그인 창을 띄움
      alert('로그인이 필요한 기능입니다.');
      handleLoginModal();
    } else {
      setShowModal(true);
      setModalType(type);
      fetchAppliedLectureIds();
    }
  };

  const isAdmin = data?.uid === userDetail?.uid;

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

        {/* 어드민 메뉴 */}
        {isAdmin ? (
          <AdminMenu>
            <h1>관리자 메뉴</h1>
            <div className="w-full flex gap-3">
              <ModifyButton onClick={() => handleModal('수정')}>
                수정하기
              </ModifyButton>
              <DeleteButton onClick={() => handleModal('삭제')}>
                삭제하기
              </DeleteButton>
            </div>
          </AdminMenu>
        ) : (
          <Price>
            <div>
              <span className="price">{data?.price.toLocaleString()}원</span>
            </div>
            {data?.status === '신청가능상태' ? (
              isApplied ? (
                <RegButton onClick={() => handleModal('취소')}>
                  신청 취소하기
                </RegButton>
              ) : (
                <RegButton onClick={() => handleModal('신청')}>
                  신청하기
                </RegButton>
              )
            ) : (
              <Closed>해당 강좌의 모집은 마감되었습니다.</Closed>
            )}
          </Price>
        )}
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
      {/* 강의 삭제 Modal */}
      {showModal &&
        createPortal(
          <>
            {modalType === '삭제' && (
              <DeleteLecture
                type="개설"
                title={data?.title}
                lectureId={data?.create_id}
                closeModal={() => setShowModal(false)}
              />
            )}
            {modalType === '취소' && (
              <DeleteLecture
                type="신청"
                title={data?.title}
                lectureId={lectureId}
                closeModal={() => setShowModal(false)}
              />
            )}
            {modalType === '신청' && (
              <ApplyLecture
                lectureId={data?.create_id}
                closeModal={() => setShowModal(false)}
              />
            )}
            {modalType === '수정' && (
              <EditOpeningModal
                title={data?.title}
                create_id={data?.create_id}
                setShowModal={setShowModal}
              />
            )}
          </>,
          document.body,
        )}
    </div>
  );
};
