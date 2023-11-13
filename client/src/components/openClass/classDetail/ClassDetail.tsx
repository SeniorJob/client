import { OpenButton } from '../OpenButton';
import { useState } from 'react';
import styled from 'styled-components';
import WeekClass from './WeekClass';
import useCreateClass from '../../../store/createClass';
import axios from 'axios';

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
  padding: 8px;
  display: flex;
  justify-content: center;

  cursor: pointer;

  &:hover {
    color: red;
  }
`;

function ClassDetail({ nextTab }: { nextTab: () => void }) {
  const [weeks, setWeeks] = useState<
    { week: number; classTitle: string; weekId: null | number }[]
  >([{ week: 1, classTitle: '강의 소개', weekId: null }]);
  const { createId } = useCreateClass();
  console.log(createId);

  const apiUrl =
    import.meta.env.VITE_API_URL + `/api/lecturesStepTwo/${createId}`;
  console.log(apiUrl);
  const accessToken = localStorage.getItem('accessToken');
  const headers = {
    Authorization: `Bearer ${accessToken}`,
  };

  const addWeekTitle = async (title: string) => {
    try {
      const res = await axios.post(`${apiUrl}/weeks`, { title }, { headers });
      console.log(res.data);
      return res.data.week_id;
    } catch (err) {
      console.error(err);
    }
  };

  const updateWeekTitle = async (weekId: number, title: string) => {
    try {
      const res = await axios.put(
        `${apiUrl}/weeks/${weekId}/week-update`,
        { title },
        { headers },
      );
      console.log(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const deleteWeekPlan = async (weekId: number, planId: number) => {
    try {
      const res = await axios.put(
        `${apiUrl}/weeks/${weekId}/plans/${planId}/plan-delete`,
        {},
        { headers },
      );
      console.log(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const addWeek = async () => {
    const newWeek = weeks.length + 1;
    const newTitle = prompt('주차별 학습 소제목을 입력하세요');
    if (newTitle !== null) {
      const weekId = await addWeekTitle(newTitle);
      setWeeks([...weeks, { week: newWeek, classTitle: newTitle, weekId }]);
    }
  };

  return (
    <>
      <Container>
        <SubTitle>주차 정보 및 주차별 학습 내용 입력</SubTitle>
        {weeks.map((weekClass, index) => (
          <WeekClass
            key={index}
            week={weekClass.week}
            classTitle={weekClass.classTitle}
            weekId={weekClass.weekId}
            updateWeekTitle={updateWeekTitle}
            deleteWeekPlan={deleteWeekPlan}
          />
        ))}
      </Container>
      <AddWeekButton onClick={addWeek}>주차 추가하기</AddWeekButton>
      <OpenButton onClick={() => nextTab()}>다음으로</OpenButton>
    </>
  );
}

export default ClassDetail;
