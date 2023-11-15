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
  margin: 1rem 0 0.6rem 0;
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
  type: '개설' | '신청' | '제안'; // 신청인 경우 추가
  closeModal: () => void;
};

export const DeleteLecture: React.FC<DeleteLecture_T> = ({
  title,
  lectureId,
  type,
  closeModal,
}) => {
  const navigate = useNavigate();
  const handleDeleteLecture = async () => {
    try {
      await deleteLecture({ type: type, id: lectureId });

      closeModal();
      alert(
        `강좌가 성공적으로 ${type === '개설' ? '삭제' : '취소'}되었습니다.`,
      );
      navigate('/');
    } catch (error) {
      console.error('API 요청에 실패했습니다:', error);
    }
  };

  return (
    <Modal closeModal={closeModal}>
      <DeleteContainer>
        <h2>{title}</h2>
        <div>정말 {type === '개설' ? '삭제' : '취소'}하시겠습니까?</div>
        <div className="w-full flex gap-2">
          <CancelButton onClick={closeModal}>닫기</CancelButton>
          <DeleteButton onClick={handleDeleteLecture}>
            {type === '개설' ? '삭제하기' : '신청 취소하기'}
          </DeleteButton>
        </div>
      </DeleteContainer>
    </Modal>
  );
};
