import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import styled from 'styled-components';
import {
  deleteLecture,
  getDetailOfSuggestionLectures,
  updateSuggestionLecture,
} from '../../../api/mypage';
import SignPostCode from '../../signup/SignPostCode';
import { INTEREST_CATEGORY_OPTIONS } from '../../../constants/Profile';

type LectureDto = {
  title: string;
  content: string;
  category: string;
  region: string;
};

const EditSuggestionModal = ({
  proposalId,
  setShowModal,
}: {
  proposalId?: number;
  setShowModal: Dispatch<SetStateAction<boolean>>;
}) => {
  const [lectureDto, setLectureDto] = useState<LectureDto>({
    title: '',
    content: '',
    category: '',
    region: '',
  });
  const { title, content, category, region } = lectureDto;

  const handleUpdateLecture = async () => {
    const data = { title, content, region, category };

    if (proposalId) await updateSuggestionLecture(proposalId, data);
    handleCloseModal();
    location.reload();
  };

  const handleDeleteLecture = async () => {
    await deleteLecture({ type: '제안', id: proposalId });
    handleCloseModal();
    location.reload();
  };

  const handleCloseModal = () => setShowModal(false);

  useEffect(() => {
    const handleGetDetailOfSuggestionLectures = async () => {
      if (proposalId) {
        const res = await getDetailOfSuggestionLectures(proposalId);
        res.status === 200 && setLectureDto(res.data);
      }
    };

    handleGetDetailOfSuggestionLectures();
  }, []);

  return (
    <>
      <Container>
        <Label>
          제목
          <Input
            value={title}
            onChange={e =>
              setLectureDto({ ...lectureDto, title: e.target.value })
            }
          />
        </Label>
        <Label>
          내용
          <TextArea
            value={content}
            onChange={e =>
              setLectureDto({ ...lectureDto, content: e.target.value })
            }
          />
        </Label>
        <Label>
          관심 카테고리
          <Select
            value={category}
            onChange={e =>
              setLectureDto({ ...lectureDto, category: e.target.value })
            }
          >
            <option>선택하세요</option>
            {INTEREST_CATEGORY_OPTIONS.map((option, index) => (
              <option key={index} value={option}>
                {option}
              </option>
            ))}
          </Select>
        </Label>
        <Label>
          <SignPostCode setForm={setLectureDto} />
          <Input
            type="text"
            value={region}
            onChange={e =>
              setLectureDto({ ...lectureDto, region: e.target.value })
            }
          ></Input>
        </Label>
        <ButtonContainer>
          <Button onClick={handleUpdateLecture}>제안수정하기</Button>
          <Button onClick={handleDeleteLecture}>제안삭제하기</Button>
        </ButtonContainer>
        <Button onClick={handleCloseModal}>창닫기</Button>
      </Container>
      <ModalBackground onClick={handleCloseModal}></ModalBackground>
    </>
  );
};

export default EditSuggestionModal;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  background-color: #fff;
  width: 400px;
  height: 640px;
  z-index: 101;
  border-radius: 10px;
  padding: 30px;
`;

const Label = styled.label`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const Input = styled.input`
  border: 1px solid lightgray;
  padding: 10px;
  border-radius: 10px;
  outline: none;
  margin-top: 4px;
  &:focus {
    border-color: green;
  }
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

const Select = styled.select`
  border: 1px solid lightgray;
  border-radius: 10px;
  padding: 10px;
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
