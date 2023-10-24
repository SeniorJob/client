import tw from 'tailwind-styled-components';

const Container = tw.div`
    flex-col

    p-6
`;

const Title = tw.div`
    font-bold
`;

const Tabs = tw.div`
    flex
    gap-4
    justify-center

    p-4
`;

const Tab = tw.div`
    border-solid
    border-1
    rounded-xl
    cursor-pointer

    px-4
    py-1

    shadow-md

   hover:bg-signature
   hover:font-bold
`;

const TabContainer = () => {
  return (
    <>
      <Container>
        <Title>{'OOO'}님의 강좌개설</Title>

        <Tabs>
          <Tab>기본정보입력</Tab>
          <Tab>강좌상세내용</Tab>
          <Tab>개설정보확인</Tab>
        </Tabs>
      </Container>
    </>
  );
};

export default TabContainer;
