import { Modal } from '../../common/Modal';
import styled from 'styled-components';
import { RegButton } from '../../../assets/styles/CommonStyles';
<<<<<<< HEAD
=======
import { closeLecture } from '../../../api/lecture';
>>>>>>> 75c7b6d4cecf3c045f7d46ceb225c92bbf0f9c85

const Close_C = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 1rem 0 0.6rem 0;
  gap: 1rem;
  h2 {
    font-size: 1.1rem;
    font-weight: 600;
  }
`;

const CancelButton = styled(RegButton)`
  background-color: #abc3eb;
<<<<<<< HEAD
  &:hover {
    background-color: #abc3ebd6;
  }
`;

const DeleteButton = styled(RegButton)`
  background-color: #f9827d;
  &:hover {
    background-color: #f9817dd6;
  }
=======
`;

const CloseButton = styled(RegButton)`
  background-color: #f9827d;
>>>>>>> 75c7b6d4cecf3c045f7d46ceb225c92bbf0f9c85
`;

type CloseLecture_T = {
  title?: string;
  lectureId?: number;
  closeModal: () => void;
};

export const CloseLecture: React.FC<CloseLecture_T> = ({
  title,
<<<<<<< HEAD
  closeModal,
}) => {
=======
  lectureId,
  closeModal,
}) => {
  const handleLectureClose = async () => {
    try {
      const response = await closeLecture(lectureId!);
      if (response?.status === 200) {
        alert('성공적으로 모집이 마감되었습니다!');
        closeModal();
      }
    } catch (error) {
      console.error('강의 마감 오류', error);
    }
  };
>>>>>>> 75c7b6d4cecf3c045f7d46ceb225c92bbf0f9c85
  return (
    <Modal closeModal={closeModal}>
      <Close_C>
        <h2>{title}</h2>
<<<<<<< HEAD
        <div>정말 마감하시겠습니까?</div>
        <div className="w-full flex gap-2">
          <CancelButton onClick={closeModal}>닫기</CancelButton>
          <DeleteButton></DeleteButton>
=======
        <div className="flex flex-col items-center">
          <p>정말 모집을 마감하시겠습니까?</p>
          <p>
            해당 작업은 <strong>취소할 수 없습니다.</strong>
          </p>
        </div>
        <div className="w-full flex gap-4">
          <CancelButton onClick={closeModal}>닫기</CancelButton>
          <CloseButton onClick={handleLectureClose}>모집 마감</CloseButton>
>>>>>>> 75c7b6d4cecf3c045f7d46ceb225c92bbf0f9c85
        </div>
      </Close_C>
    </Modal>
  );
};
