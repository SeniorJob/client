import tw from 'tailwind-styled-components';
import { OpenButton } from '../OpenButton';
import { FC } from 'react';

const Container = tw.div`
    m-4
    p-4

    bg-signature
`;

const SubTitle = tw.div`
    text-lg
    font-bold
`;

const SelectArea = tw.div`
    mb-8
`;

interface ClassDetailProps {
  nextTab: () => void;
  prevTab: () => void;
}

const ClassDetail: FC<ClassDetailProps> = ({ nextTab, prevTab }) => {
  return (
    <>
      <Container>
        <SubTitle>주차 정보 및 주차별 학습 내용 입력</SubTitle>
        <div className="flex justify-center gap-4">
          <OpenButton className="m-0" onClick={() => prevTab()}>
            이전으로
          </OpenButton>
          <OpenButton className="m-0" onClick={() => nextTab()}>
            다음으로
          </OpenButton>
        </div>
      </Container>
    </>
  );
};

export default ClassDetail;
