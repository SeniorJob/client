import tw from 'tailwind-styled-components';
import { OpenButton } from '../OpenButton';
import { FC, useState } from 'react';
import styled from 'styled-components';

const Container = tw.div`
  m-4
  p-4

  bg-signature
`;

const SubTitle = tw.div`
  text-2xl
  font-bold
  pb-4
  border-b-4
  border-dotted
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

const AddButton = tw.div`
  flex
  p-2
  text-lg
  justify-center
  m-auto
  bg-white
`;

interface WeekClassProps {
  week: number;
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
      <AddButton onClick={addContent}>상세내용 추가하기</AddButton>
    </div>
  );
};

const ClassDetail: FC<ClassDetailProps> = ({ nextTab }) => {
  const [week, setWeek] = useState(1);
  const [classTitle, setClassTitle] = useState('');

  const addWeek = () => {
    setWeek([...week, week.length + 1]);
  };

  return (
    <>
      <Container>
        <SubTitle>주차 정보 및 주차별 학습 내용 입력</SubTitle>
        <WeekClass week={week} classTitle={classTitle} />
        <OpenButton onClick={() => nextTab()}>다음으로</OpenButton>
      </Container>
    </>
  );
};

export default ClassDetail;
