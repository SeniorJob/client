import { OpenButton } from '../OpenButton';
import { FC, useState } from 'react';
import styled from 'styled-components';
import WeekClass from './WeekClass';

const Container = styled.div`
  margin: 16px 16px 0 16px;
`;

const SubTitle = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
  padding-bottom: 16px;
  border-bottom: 4px dotted;
`;

const AddWeekButton = styled.div`
  font-size: 2rem;
  padding: 8px;
  display: flex;
  justify-content: center;

  cursor: pointer;

  &:hover {
    color: red;
  }
`;

interface ClassDetailProps {
  nextTab: () => void;
}

const ClassDetail: FC<ClassDetailProps> = ({ nextTab }) => {
  const [weeks, setWeeks] = useState([{ week: 1, classTitle: '강의 소개' }]);

  const addWeek = () => {
    const newWeek = weeks.length + 1;
    const newTitle = prompt('주차별 학습 소제목을 입력하세요');
    if (newTitle !== null) {
      setWeeks([...weeks, { week: newWeek, classTitle: newTitle }]);
    }
  };

  return (
    <>
      <Container>
        <SubTitle>주차 정보 및 주차별 학습 내용 입력</SubTitle>
        {weeks.map((weekClass, index) => (
          <WeekClass
            key={index}
            week={weekClass.week}
            classTitle={weekClass.classTitle}
          />
        ))}
      </Container>
      <AddWeekButton onClick={addWeek}>주차 추가하기</AddWeekButton>
      <OpenButton onClick={() => nextTab()}>다음으로</OpenButton>
    </>
  );
};

export default ClassDetail;
