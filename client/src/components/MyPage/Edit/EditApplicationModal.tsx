import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import styled from 'styled-components';
import {
  deleteLecture,
  getDetailOfApplyLectures,
  updateApplyReason,
} from '../../../api/mypage';

const EditApplicationModal = ({
  title,
  createId,
  leId,
  setShowModal,
}: {
  title: string;
  createId?: number;
  leId?: number;
  setShowModal: Dispatch<SetStateAction<boolean>>;
}) => {
  const [reason, setReason] = useState('');
  const handleCloseModal = () => setShowModal(false);

  const handleUpdateApplyReason = async () => {
    if (createId) {
      await updateApplyReason({
        lectureId: createId,
        newApplyReason: reason,
      });
    }

    handleCloseModal();
  };

  const handleDeleteLecture = async () => {
    await deleteLecture({ type: '신청', id: leId });

    handleCloseModal();
    location.reload();
  };

  useEffect(() => {
    const handleGetDetailOfApplyLectures = async () => {
      if (createId) {
        const res = await getDetailOfApplyLectures(createId);
        res.status === 200 && setReason(res.data.lectureApplyDto.applyReason);
      }
    };

    handleGetDetailOfApplyLectures();
  }, []);

  return (
    <>
      <Container>
        <Title>{title}</Title>
        <Label>
          신청이유
          <TextArea value={reason} onChange={e => setReason(e.target.value)} />
        </Label>
        <ButtonContainer>
          <Button onClick={handleUpdateApplyReason}>이유수정하기</Button>
          <Button onClick={handleDeleteLecture}>신청철회하기</Button>
        </ButtonContainer>
        <Button onClick={handleCloseModal}>창닫기</Button>
      </Container>
      <ModalBackground onClick={handleCloseModal}></ModalBackground>
    </>
  );
};

export default EditApplicationModal;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  background-color: #fff;
  width: 400px;
  height: 440px;
  z-index: 101;
  border-radius: 10px;
  padding: 30px;
`;

const Label = styled.label`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const TextArea = styled.textarea`
  border: 1px solid lightgray;
  padding: 10px;
  border-radius: 10px;
  resize: none;
  height: 180px;
  margin-top: 4px;
  outline: none;
  &:focus {
    border-color: green;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  gap: 10px;
  margin-top: 10px;
`;
const Button = styled.button.attrs({ type: 'button' })`
  border: 1px solid lightgray;
  border-radius: 10px;
  height: 44px;
  width: 100%;
  &:hover {
    border-color: green;
  }
`;

const ModalBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  backdrop-filter: blur(4px);
  background-color: rgba(0, 0, 0, 0.2);
  z-index: 100;
  cursor: pointer;
`;

const Title = styled.div`
  font-size: 22px;
  font-weight: bold;
  width: 240px;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  text-align: center;
`;
