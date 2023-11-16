import { Modal } from '../../common/Modal';
import styled from 'styled-components';
import { RegButton } from '../../../assets/styles/CommonStyles';

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

const DeleteButton = styled(RegButton)`
  background-color: #f9827d;
`;

type CloseLecture_T = {
  title?: string;
  lectureId?: number;
  closeModal: () => void;
};

export const CloseLecture: React.FC<CloseLecture_T> = ({
  title,
  closeModal,
}) => {
  return (
    <Modal closeModal={closeModal}>
      <Close_C>
        <h2>{title}</h2>
        <div>정말 마감하시겠습니까?</div>
        <div className="w-full flex gap-2">
          <CancelButton onClick={closeModal}>닫기</CancelButton>
          <DeleteButton></DeleteButton>
        </div>
      </Close_C>
    </Modal>
  );
};
