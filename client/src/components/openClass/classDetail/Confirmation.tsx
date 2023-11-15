import axios from 'axios';
import { useEffect, useState } from 'react';
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

type LectureInfo = {
  create_id: number;
  uid: number;
  userName: string;
  creator: string;
  category: string;
  image_url: string;
  title: string;
  content: string;
  learning_target: string;
  week: number;
  recruitEnd_date: string;
  start_date: string;
  end_date: string;
  max_participants: number;
  current_participants: number;
  region: string;
  price: number;
  bank_name: string;
  account_name: string;
  account_number: string;
  status: string;
  openStatus: null | string;
  createdDate: string;
  daysUntilRecruitEndMessage: string;
};

type WeekDto = {
  week_id: number;
  create_id: number;
  lectureTitle: string;
  week_number: number;
  week_title: string;
  createdDate: string;
};

type WeekPlanDto = {
  plan_id: number;
  week_id: number;
  week_title: string;
  create_id: number;
  detail_number: number;
  detail: string;
  createdDate: string;
};

const Confirmation = () => {
  const apiUrl = import.meta.env.VITE_API_URL + `/api/lecturesStepTwo/${105}`; // TODO: createId 수정해야함
  const accessToken = localStorage.getItem('accessToken');
  const headers = {
    Authorization: `Bearer ${accessToken}`,
  };

  const [lectureInfo, setLectureInfo] = useState<LectureInfo | null>(null);
  const [weekDto, setWeekDto] = useState<WeekDto[]>([]);
  const [weekPlanDto, setWeekPlanDto] = useState<WeekPlanDto[]>([]);

  function formatDate(dateString: string) {
    const dateObj = new Date(dateString);

    const year = dateObj.getFullYear();
    const month = (dateObj.getMonth() + 1).toString().padStart(2, '0');
    const day = dateObj.getDate().toString().padStart(2, '0');
    const hours = dateObj.getHours().toString().padStart(2, '0');
    const minutes = dateObj.getMinutes().toString().padStart(2, '0');

    const formattedDate = `${year}년 ${month}월 ${day}일`;

    return formattedDate;
  }

  // 강좌개설 3단계 API 불러오기
  useEffect(() => {
    axios
      .get(apiUrl + '/review')
      .then(res => {
        setLectureInfo(res.data.lectureInfo);
        setWeekDto(res.data.weekDto);
        setWeekPlanDto(res.data.weekPlanDto);
        console.log(weekDto);
        console.log(weekPlanDto);
        console.log(lectureInfo);
      })
      .catch(err => console.log(err));
  }, []);

  return (
    <>
      <Container>
        <div className="flex gap-10">
          <div className="object-cover border-2 h-60 w-96">
            <img src={lectureInfo ? lectureInfo.image_url : undefined} />
          </div>

          <div>
            <Title>{lectureInfo && lectureInfo.title}</Title>
            <div>개설자: {lectureInfo && lectureInfo.userName}</div>
            <div>카테고리: {lectureInfo && lectureInfo.category}</div>
            <div>직업: {lectureInfo && lectureInfo.creator}</div>
            <div>{lectureInfo && lectureInfo.content}</div>
          </div>
        </div>
        <SubTitle>강의 소개</SubTitle>
        <Content>{lectureInfo && lectureInfo.learning_target}</Content>
        <SubTitle>강좌 날짜</SubTitle>
        <Content>주 {lectureInfo && lectureInfo.week} 회</Content>
        <Content>
          모집마감날짜 {lectureInfo && formatDate(lectureInfo.recruitEnd_date)}
        </Content>
        <Content>
          강좌시작날짜 {lectureInfo && formatDate(lectureInfo.start_date)}
        </Content>
        <Content>
          강좌종료날짜 {lectureInfo && formatDate(lectureInfo.end_date)}
        </Content>
        <SubTitle>최대 참가자 수</SubTitle>
        <Content>{lectureInfo && lectureInfo.max_participants}명</Content>
        <SubTitle>계좌 정보</SubTitle>
        <Content>{lectureInfo && lectureInfo.bank_name}</Content>
        <Content>{lectureInfo && lectureInfo.account_name}</Content>
        <Content>{lectureInfo && lectureInfo.account_number}</Content>
        <SubTitle>강좌 상세 내용</SubTitle>
        {weekPlanDto &&
          weekPlanDto.map((plan, index) => (
            <div key={index}>
              <h3>{plan.week_title}</h3>
              <p>{plan.detail}</p>
            </div>
          ))}
      </Container>
    </>
  );
};

export default Confirmation;
