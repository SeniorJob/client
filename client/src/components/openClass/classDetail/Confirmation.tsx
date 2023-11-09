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

const Content = styled.div`
  padding: 20px;
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
        <Content>(강의 소개가 들어갈 곳)</Content>
        <SubTitle>강좌 날짜</SubTitle>
        <Content>주 {2} 회</Content>
        <Content>모집마감날짜</Content>
        <Content>강좌시작날짜</Content>
        <Content>강좌종료날짜</Content>
        <SubTitle>최대 참가자 수</SubTitle>
        <Content>{30}명</Content>
        <SubTitle>계좌 정보</SubTitle>
        <Content>은행이름</Content>
        <Content>예금주</Content>
        <Content>계좌번호</Content>
        <SubTitle>강의 상세 내용</SubTitle>
      </Container>
    </>
  );
};

export default Confirmation;
