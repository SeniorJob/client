import tw from 'tailwind-styled-components';

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

const ClassDetail = () => {
  return (
    <>
      <Container>
        <SubTitle>주차 정보 및 주차별 학습 내용 입력</SubTitle>
      </Container>
    </>
  );
};

export default ClassDetail;
