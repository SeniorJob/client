import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { getDetailOfOpeningLectures } from '../../../api/mypage';
import { LectureDto, WeekDto, WeekPlan } from '../../../types/LectureTypes';
import EditFirstStep from './EditFirstStep';
import EditSecondStep from './EditSecondStep';

type EditOpeningLecture_T = {
  le_id?: number;
  createId?: number;
};

const EditOpeningLecture = ({ le_id, createId }: EditOpeningLecture_T) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [info1, setInfo1] = useState<LectureDto>();
  const [info2, setInfo2] = useState<WeekDto[]>();
  const [info3, setInfo3] = useState<WeekPlan[]>();

  useEffect(() => {
    const handleGetDetailOfOpenLecture = async () => {
      if (createId) {
        const res = await getDetailOfOpeningLectures(createId);
        setInfo1(res.data.lectureDto);
        setInfo2(res.data.weekDto);
        setInfo3(res.data.weekPlanDto);
      }
    };
    handleGetDetailOfOpenLecture();
  }, []);
  console.log(info1);

  return (
    <Container>
      <button
        type="button"
        onClick={() => {
          console.log(info1);
          console.log(info2);
          console.log(info3);
        }}
      >
        asdfasdfasdfs
      </button>
      {info1 && currentPage === 1 && (
        <EditFirstStep info={info1} setInfo={setInfo1} />
      )}
      {info2 && currentPage === 2 && (
        <EditSecondStep
          le_id={le_id}
          secondInfo={info2}
          thirdInfo={info3}
          setSecondInfo={setInfo2}
          setThirdInfo={setInfo3}
        />
      )}

      <ButtonContainer>
        {(currentPage === 2 || currentPage === 3) && (
          <Button onClick={() => setCurrentPage(currentPage - 1)}>
            이전페이지
          </Button>
        )}
        {(currentPage === 1 || currentPage === 2) && (
          <Button onClick={() => setCurrentPage(currentPage + 1)}>
            다음페이지
          </Button>
        )}
        {currentPage === 3 && <Button>수정완료</Button>}
      </ButtonContainer>
      <ButtonContainer>
        <Button>나가기</Button>
      </ButtonContainer>
    </Container>
  );
};

export default EditOpeningLecture;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  /* align-items: center; */
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  background-color: #fff;
  width: 800px;
  height: 800px;
  z-index: 101;
  border-radius: 10px;
  padding: 30px;
  gap: 14px;
  overflow: scroll;
`;

const ButtonContainer = styled.div`
  display: flex;
  width: 100%;
  row-gap: 20px;
  column-gap: 10px;
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
