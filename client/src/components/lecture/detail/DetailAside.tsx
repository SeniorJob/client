import styled from 'styled-components';
import { LectureDto } from '../../../types/LectureTypes';
import { useLoginModalStore, useUserStore } from '../../../store/user';
import { useEffect, useState } from 'react';
import { ApplyLecture } from './ApplyLecture';
import { DeleteLecture } from './DeleteLecure';
import { getAppliedLectureId } from '../../../api/lecture';
import { createPortal } from 'react-dom';
import EditOpeningModal from '../../MyPage/Edit/EditOpeningModal';
import { getDetailOfApplyLectures } from '../../../api/mypage';
import { AdminMenu } from './menu/AdminMenu';
import { ParticipantsCard } from './menu/ParticipantsCard';
import { RemainTimeCard } from './menu/RemainTimeCard';
import { ApplyMenu } from './menu/ApplyMenu';
import { PeriodMenu } from './menu/PeriodMenu';
import { ManageMember } from './ManageMember';
import { CloseLecture } from './CloseLecture';

export const DetailAside = ({ data }: { data: LectureDto | undefined }) => {
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
      res.status === 200 && setLectureId(res.data.lectureApplyDto.leId);
    };

    getLectureId();
  }, [data?.create_id]);

  const handleModal = (type: string) => {
    if (!isLoggedIn) {
      // 로그인이 되어 있지 않으면 로그인 창을 띄움
      alert('로그인이 필요한 기능입니다.');
      handleLoginModal();
    } else {
      if (
        type === '신청' &&
        data?.current_participants === data?.max_participants
      ) {
        alert('모집 정원이 초과되었습니다.');
      } else {
        setShowModal(true);
        setModalType(type);
        fetchAppliedLectureIds();
      }
    }
  };

  const isAdmin = data?.uid === userDetail?.uid;

  return (
    <div className="basis-1/3">
      <Aside>
        <CurrentStatus>
          <ParticipantsCard data={data} />
          <RemainTimeCard data={data} />
        </CurrentStatus>

        {/* 어드민 메뉴 */}
        {isAdmin ? (
          <AdminMenu status={data?.status} handleModal={handleModal} />
        ) : (
          <ApplyMenu
            data={data}
            isApplied={isApplied}
            handleModal={handleModal}
          />
        )}
        <PeriodMenu data={data} />
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
            {modalType === '인원관리' && (
              <ManageMember
                lectureId={data?.create_id}
                closeModal={() => setShowModal(false)}
              />
            )}
            {modalType === '마감' && (
              <CloseLecture
                title={data?.title}
                lectureId={data?.create_id}
                closeModal={() => setShowModal(false)}
              />
            )}
            {modalType === '강좌관리' && (
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
