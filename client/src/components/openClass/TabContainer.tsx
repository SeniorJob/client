import tw from 'tailwind-styled-components';
import { FC } from 'react';

const Container = tw.div`
    flex-col
    p-6
    pb-2

    border-b-2
    border-black
`;

const Title = tw.div`
    font-bold
    text-2xl
`;

const Tabs = tw.div`
    flex
    gap-4
    justify-center
    p-4
    text-gray-500
    font-bold
`;

interface TabContainerProps {
  setActiveTab: (index: number) => void;
}

const Tab = tw.div`
    border-solid
    border-1
    rounded-xl
    cursor-pointer

    text-2xl

    px-4
    py-1

    shadow-md

   hover:bg-signature
   hover:font-bold
   hover:text-black
`;

const TabContainer: FC<TabContainerProps> = ({ setActiveTab }) => {
  return (
    <>
      <Container>
        <Title>{'OOO'}님의 강좌개설</Title>

        <Tabs>
          <Tab onClick={() => setActiveTab(0)}>기본정보입력</Tab>
          <Tab onClick={() => setActiveTab(1)}>강좌상세내용</Tab>
          <Tab onClick={() => setActiveTab(2)}>개설정보확인</Tab>
        </Tabs>
      </Container>
    </>
  );
};

export default TabContainer;
