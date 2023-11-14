import { Dispatch } from 'react';
import styled from 'styled-components';
import { deleteLecture } from '../../../api/mypage';
import { Link } from 'react-router-dom';

type EditOpeningModal_T = {
  title: string;
  create_id?: number;
  setShowModal: Dispatch<boolean>;
};

const EditOpeningModal = ({
  title,
  create_id,
  setShowModal,
}: EditOpeningModal_T) => {
  const handleDeleteLecture = async () => {
    if (create_id) await deleteLecture({ type: '개설', id: create_id });
    handleCloseModal();
    location.reload();
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };
  console.log(create_id);

  return (
    <>
      <Container>
        <Title>{title}</Title>
        <Button>
          <Link
            style={{
              display: 'flex',
              justifyContent: 'center',
              height: '100%',
              alignItems: 'center',
            }}
            to={`/mypage/lecture/edit/${create_id}`}
          >
            강좌수정하기
          </Link>
        </Button>
        <Button onClick={handleDeleteLecture}>강좌삭제하기</Button>
        <Button onClick={handleCloseModal}>창닫기</Button>
      </Container>

      <ModalBackground onClick={handleCloseModal}></ModalBackground>
    </>
  );
};

export default EditOpeningModal;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  background-color: #fff;
  width: 400px;
  z-index: 101;
  border-radius: 10px;
  padding: 30px;
  gap: 14px;
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
