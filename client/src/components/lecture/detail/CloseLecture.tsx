import { Modal } from '../../common/Modal';
import styled from 'styled-components';
import { RegButton } from '../../../assets/styles/CommonStyles';
import { closeLecture } from '../../../api/lecture';
import axios from 'axios';

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
`;

const CloseButton = styled(RegButton)`
  background-color: #f9827d;
`;

type CloseLecture_T = {
  title?: string;
  lectureId?: number;
  closeModal: () => void;
};

export const CloseLecture: React.FC<CloseLecture_T> = ({
  title,
  lectureId,
  closeModal,
}) => {
  const handleLectureClose = async () => {
    try {
      const response = await closeLecture(lectureId!);
      if (response?.status === 200) {
        alert('성공적으로 모집이 마감되었습니다!');
      }
    } catch (err) {
      if (axios.isAxiosError(err)) alert(err.response?.data.errorMessage);
    } finally {
      closeModal();
    }
  };
  return (
    <Modal closeModal={closeModal}>
      <Close_C>
        <h2>{title}</h2>
        <div className="flex flex-col items-center">
          <p>정말 모집을 마감하시겠습니까?</p>
          <p>
            해당 작업은 <strong>취소할 수 없습니다.</strong>
          </p>
        </div>
        <div className="w-full flex gap-4">
          <CancelButton onClick={closeModal}>닫기</CancelButton>
          <CloseButton onClick={handleLectureClose}>모집 마감</CloseButton>
        </div>
      </Close_C>
    </Modal>
  );
};
