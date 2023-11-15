import { deleteLecture } from '../../../api/mypage';
import { Modal } from '../../common/Modal';
import styled from 'styled-components';
import { RegButton } from '../../../assets/styles/CommonStyles';
import { useNavigate } from 'react-router-dom';

const DeleteContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 1rem 0 0.5rem 0;
  gap: 1rem;
  h2 {
    font-size: 1.1rem;
    font-weight: 600;
  }
`;

const CancelButton = styled(RegButton)`
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

type DeleteLecture_T = {
  title?: string;
  lectureId?: number;
  closeModal: () => void;
};

export const DeleteLecture: React.FC<DeleteLecture_T> = ({
  title,
  lectureId,
  closeModal,
}) => {
  const navigate = useNavigate();
  const handleDeleteLecture = async () => {
    try {
      await deleteLecture({ type: '개설', id: lectureId });

      closeModal();
      alert('강좌가 성공적으로 삭제되었습니다.');
      navigate('/');
    } catch {
      console.log('에러뜸');
    }
  };

  return (
    <Modal closeModal={closeModal}>
      <DeleteContainer>
        <h2>{title}</h2>
        <div>정말 삭제하시겠습니까?</div>
        <div className="w-full flex gap-3">
          <CancelButton onClick={closeModal}>취소</CancelButton>
          <DeleteButton onClick={handleDeleteLecture}>삭제하기</DeleteButton>
        </div>
      </DeleteContainer>
    </Modal>
  );
};
