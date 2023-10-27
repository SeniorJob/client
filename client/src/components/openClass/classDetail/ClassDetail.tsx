import tw from 'tailwind-styled-components';
import { OpenButton } from '../OpenButton';
import { FC, useState } from 'react';

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
    border-gray-300
`;

interface ClassDetailProps {
  nextTab: () => void;
}

// 주차별 학습내용 컴포넌트 관련 코드
interface WeekClassProps {
  week: number;
  classTitle: string;
}

const WeekClassTitle = tw.div`
  flex
  bg-stone-100
  my-4
  p-2
  text-xl
  font-bold
`;

const WeekClass: FC<WeekClassProps> = ({ week, classTitle }) => {
  return (
    <div>
      <WeekClassTitle>
        {week}주차 {classTitle}
      </WeekClassTitle>
    </div>
  );
};

const ClassDetail: FC<ClassDetailProps> = ({ nextTab }) => {
  const [week, setWeek] = useState(1);
  const [classTitle, setClassTitle] = useState('(주차 제목이 들어갈 곳)');

  // const addWeek = () => {
  //   setWeeks([...week, weeks.length + 1]);
  // };

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
