import { OpenButton } from '../OpenButton';
import styled from 'styled-components';
import useCreateClass from '../../../store/createClass';
import axios from 'axios';
import { useEffect, useState } from 'react';
import WeekClass from './WeekClass';

const Container = styled.div`
  margin: 16px 16px 0 16px;
`;

const SubTitle = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
  padding-bottom: 16px;
  border-bottom: 4px dotted;
`;

const AddWeekButton = styled.div`
  font-size: 2rem;
  padding: 16px;
  display: flex;
  justify-content: center;
  color: gray;
  width: 30%;

  cursor: pointer;

  &:hover {
    color: red;
  }
`;

type WeekDtoType = {
  week_id: number;
  create_id: number;
  lectureTitle: string;
  week_number: number;
  week_title: string;
  createdDate: string;
};

export type WeekPlanDtoType = {
  plan_id: number;
  week_id: number;
  week_title: string;
  create_id: number;
  detail_number: number;
  detail: string;
  createdDate: string;
};

function ClassDetail({ nextTab }: { nextTab: () => void }) {
  const { createId } = useCreateClass();
  console.log(createId);
  const [weekDto, setWeekDto] = useState<WeekDtoType[]>([]);
  const [weekPlanDto, setWeekPlanDto] = useState<WeekPlanDtoType[]>([]);

  const apiUrl =
    import.meta.env.VITE_API_URL + `/api/lecturesStepTwo/${createId}`;
  const accessToken = localStorage.getItem('accessToken');
  const headers = {
    Authorization: `Bearer ${accessToken}`,
  };

  // 강좌개설 3단계 API 불러오기
  useEffect(() => {
    axios
      .get(apiUrl + '/review')
      .then(res => {
        setWeekDto(res.data.weekDto);
        setWeekPlanDto(res.data.weekPlanDto);
        console.log(weekDto);
        console.log(weekPlanDto);
      })
      .catch(err => alert(err.response.data.errorMessage));
  }, []);

  // 주차 추가하기
  const handleAddWeek = async () => {
    const weekTitle = prompt('주차 제목을 입력하세요:');
    if (weekTitle === null || weekTitle.trim() === '') {
      alert('주차 제목을 입력해주세요!');
      return;
    }

    try {
      const response = await axios.post(
        `${apiUrl}/weeks?title=${weekTitle}`,
        {},
        {
          headers,
        },
      );
      setWeekDto([...weekDto, response.data]);
    } catch (err) {
      if (axios.isAxiosError(err)) alert(err.response?.data.errorMessage);
    }
  };

  return (
    <>
      <Container>
        <SubTitle>주차 정보 및 주차별 학습 내용 입력</SubTitle>
        {weekDto.map((week, index) => {
          const weekPlans = weekPlanDto.filter(
            plan => plan.week_id === week.week_id,
          );
          return (
            <WeekClass
              apiUrl={apiUrl}
              headers={headers}
              key={index}
              weekNumber={week.week_number}
              weekTitle={week.week_title}
              weekId={week.week_id}
              weekPlans={weekPlans}
              onDelete={() => {
                setWeekDto(prevWeekDto =>
                  prevWeekDto.filter(
                    prevWeek => prevWeek.week_id !== week.week_id,
                  ),
                );
              }}
              createId={createId}
            />
          );
        })}
      </Container>
      <AddWeekButton onClick={handleAddWeek}>주차 추가하기</AddWeekButton>
      <OpenButton onClick={() => nextTab()}>다음으로</OpenButton>
    </>
  );
}

export default ClassDetail;
