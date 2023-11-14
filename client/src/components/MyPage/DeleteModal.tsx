import { Dispatch, SetStateAction } from 'react';
import styled from 'styled-components';
import { deleteLecture } from '../../api/mypage';
import { useSearchParams } from 'react-router-dom';

type DeleteModal_T = {
  type: '개설' | '신청' | '제안';
  title: string;
  create_id?: number;
  le_id?: number;
  proposalId?: number;
  setShowModal: Dispatch<SetStateAction<boolean>>;
};

const DeleteModal = ({
  type,
  title,
  create_id,
  le_id,
  proposalId,
  setShowModal,
}: DeleteModal_T) => {
  const handleCloseModal = () => setShowModal(false);
  const [searchParams, setSearchParams] = useSearchParams();

  const handleDeleteLecture = async () => {
    type === '개설' && (await deleteLecture({ type, id: create_id }));
    type === '신청' && (await deleteLecture({ type, id: le_id }));
    type === '제안' && (await deleteLecture({ type, id: proposalId }));

    await handleCloseModal();
    searchParams.delete('page');
    setSearchParams(searchParams);
    location.reload();
  };

  return (
    <>
      <Modal>
        <Title>{title}</Title>
        <div>
          {type === '개설'
            ? '강좌를 삭제'
            : type === '신청'
            ? '강좌를 신청취소'
            : '제안을 취소'}
          하시겠습니까?
        </div>
        <ButtonWrapper>
          <Button onClick={handleDeleteLecture}>
            {type === '개설'
              ? '삭제'
              : type === '신청'
              ? '신청취소'
              : '제안취소'}
          </Button>
          <Button onClick={handleCloseModal}>닫기</Button>
        </ButtonWrapper>
      </Modal>
      <ModalBackground onClick={handleCloseModal}></ModalBackground>
    </>
  );
};

export default DeleteModal;

const ModalBackground = styled.div`
  border: 1px solid black;
  position: fixed;
  width: 100vw;
  height: 100vh;
  left: 0;
  top: 0;
  background-color: rgba(0, 0, 0, 0.2);
  z-index: 100;
  cursor: pointer;
`;

const Modal = styled.div`
  z-index: 101;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  background-color: #fff;
  width: 400px;
  height: 200px;
  border-radius: 20px;
  padding: 30px;
`;

const Title = styled.h3`
  font-size: 24px;
  font-weight: bold;
`;

const ButtonWrapper = styled.div`
  display: flex;
  gap: 20px;
  margin-top: auto;
`;

const Button = styled.button.attrs({ type: 'button' })`
  border: 1px solid lightgray;
  border-radius: 10px;
  width: 100px;
  height: 48px;

  &:hover {
    border-color: green;
  }
`;
