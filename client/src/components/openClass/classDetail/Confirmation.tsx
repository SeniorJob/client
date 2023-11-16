import axios from 'axios';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { WeekPlanDtoType } from './ClassDetail';
import { OpenButton } from '../OpenButton';
import { useNavigate } from 'react-router-dom';
import useCreateClass from '../../../store/createClass';

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
  font-size: 1.3rem;
  padding: 20px;
`;

const Detail = styled.div`
  width: 90%;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  border: 2px solid lightgray;
  border-bottom: none;
`;

const DetailStyle = styled.div`
  display: flex;
  width: 100%;
  border-bottom: 1px solid lightgray;
  padding: 8px;
`;

const DetailTitle = styled(DetailStyle)`
  font-size: 1.3rem;
  font-weight: bold;
  background-color: lightgrey;
`;

const DetailPlan = styled(DetailStyle)`
  font-size: 1.2rem;
  padding-left: 1.5rem;
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
  const { createId } = useCreateClass();

  const apiUrl =
    import.meta.env.VITE_API_URL + `/api/lecturesStepTwo/${createId}`;
  const accessToken = localStorage.getItem('accessToken');
  const headers = {
    Authorization: `Bearer ${accessToken}`,
  };
  const navigate = useNavigate();

  const [lectureInfo, setLectureInfo] = useState<LectureInfo | null>(null);
  const [weekDto, setWeekDto] = useState<WeekDto[]>([]);
  const [weekPlanDto, setWeekPlanDto] = useState<WeekPlanDto[]>([]);

  function formatDate(dateString: string) {
    const dateObj = new Date(dateString);

    const year = dateObj.getFullYear();
    const month = (dateObj.getMonth() + 1).toString().padStart(2, '0');
    const day = dateObj.getDate().toString().padStart(2, '0');

    const formattedDate = `${year}년 ${month}월 ${day}일`;

    return formattedDate;
  }

  const handleCreateClass = async () => {
    try {
      const response = await axios.get(`${apiUrl}/publish`, {
        headers: headers,
      });
      console.log(response.data);
      alert(`강좌번호 : ${createId} / 정상적으로 개설되었습니다.`);
      navigate(`/lectures/detail/${createId}`);
    } catch (err) {
      console.error(err);
    }
  };

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

  const groupedWeekPlans = weekPlanDto.reduce<{
    [key: string]: WeekPlanDtoType[];
  }>((grouped, plan) => {
    (grouped[plan.week_title] = grouped[plan.week_title] || []).push(plan);
    return grouped;
  }, {});

  return (
    <>
      <Container>
        <div className="flex gap-10">
          <div>
            <img
              className="object-cover border-2 h-60 w-96"
              src={lectureInfo ? lectureInfo.image_url : undefined}
            />
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
        <div className="flex flex-col items-center">
          {Object.entries(groupedWeekPlans).map(([weekTitle, plans], index) => (
            <Detail key={index}>
              <DetailTitle>{weekTitle}</DetailTitle>
              {plans.map((plan, index) => (
                <DetailPlan key={index}>{plan.detail}</DetailPlan>
              ))}
            </Detail>
          ))}
        </div>
      </Container>
      <OpenButton onClick={handleCreateClass}>강좌개설하기</OpenButton>
    </>
  );
};

export default Confirmation;
