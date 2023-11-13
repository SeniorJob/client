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

// 주차별 학습내용 컴포넌트 관련 코드
const WeekClassTitle = tw.div`
  flex
  bg-stone-100
  mt-4
  p-2
  text-xl
  font-bold

  justify-between
`;

const WeekClassContent = styled.div`
  padding: 10px;
  background-color: white;
  font-size: 1.2rem;
`;

const ActionButton = tw.div`
  text-lg
  font-normal
`;

const AddContentButton = tw.div`
  flex
  p-2
  text-lg
  justify-center
  m-auto
  bg-white
`;

interface WeekClassProps {
  // 빌드 오류로 인해 수정하였습니다
  // 수정 전 코드
  // week: number;
  week: number[];
  classTitle: string | null;
}

const WeekClass: FC<WeekClassProps> = ({ week, classTitle }) => {
  const [contents, setContents] = useState<string[]>([]);

  const addContent = () => {
    const newContent = prompt('새로운 컨텐츠를 입력하세요');
    if (newContent !== null) {
      setContents([...contents, newContent]);
    }
  };

  return (
    <div>
      <WeekClassTitle>
        <div>
          {week}주차 {classTitle}
        </div>
        <div className="flex gap-2">
          <ActionButton>수정</ActionButton>
          <ActionButton>삭제</ActionButton>
        </div>
      </WeekClassTitle>
      {contents.map((content, index) => (
        <WeekClassContent key={index}>{content}</WeekClassContent>
      ))}
      <AddContentButton onClick={addContent}>
        상세내용 추가하기
      </AddContentButton>
    </div>
  );
};

const ClassDetail: FC<ClassDetailProps> = ({ nextTab }) => {
  // 빌드 오류로 인해 수정하였습니다
  // 수정 전 코드
  // const [week, setWeek] = useState(1);
  const [week, setWeek] = useState([1]);
  const [classTitle, setClassTitle] = useState('');

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
