import styled from 'styled-components';

const Container = styled.div`
  padding: 20px;
`;

const Title = styled.div`
  margin-top: 10px;
  font-size: 1.5rem;
  font-weight: bold;
`;

const SubTitle = styled(Title)`
  border-top: 1px solid black;
  padding: 10px;
`;

const Confirmation = () => {
  // TODO: GET 요청

  return (
    <>
      <Container>
        <div className="flex gap-10">
          <div className="border-2 border-red-500 w-60 h-60">메인 이미지</div>
          <div>
            <Title>먹방의 달인</Title>
            <div>개설자: </div>
            <div>카테고리: </div>
            <div>직업: </div>
            <div>(한 줄 설명)</div>
          </div>
        </div>
        <SubTitle>강의 소개</SubTitle>
        <div className="p-6">(강의 소개가 들어갈 곳)</div>
        <SubTitle>강좌 날짜</SubTitle>
        <div className="p-6">주 {2} 회</div>
        <div className="p-6">모집마감날짜</div>
        <div className="p-6">강좌시작날짜</div>
        <div className="p-6">강좌종료날짜</div>
      </Container>
    </>
  );
};

export default Confirmation;
