import { OpenButton } from '../OpenButton';
import styled from 'styled-components';
import WeekClass from './WeekClass';
import useCreateClass from '../../../store/createClass';
import axios from 'axios';
import { useEffect, useState } from 'react';

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

type WeekDtoType = {
  week_id: number;
  create_id: number;
  lectureTitle: string;
  week_number: number;
  week_title: string;
  createdDate: string;
};

function ClassDetail({ nextTab }: { nextTab: () => void }) {
  const { createId } = useCreateClass();
  const [weekDto, setWeekDto] = useState<WeekDtoType[]>([]);

  const apiUrl =
    import.meta.env.VITE_API_URL + `/api/lecturesStepTwo/${createId}`;
  const accessToken = localStorage.getItem('accessToken');
  const headers = {
    Authorization: `Bearer ${accessToken}`,
  };

  useEffect(() => {
    // 강좌개설 3단계 API 불러오기
    axios
      .get(apiUrl + '/review')
      .then(res => {
        setWeekDto(res.data.weekDto);
        console.log(weekDto);
      })
      .catch(err => console.log(err));
  }, []);

  return (
    <>
      <Container>
        <SubTitle>주차 정보 및 주차별 학습 내용 입력</SubTitle>
        {weekDto.map((week, index) => (
          <div key={index}> {week.week_number} 주차 </div>
        ))}
        {/* {weeks.map((weekClass, index) => (
          <WeekClass
            key={index}
            week={weekClass.week}
            classTitle={weekClass.classTitle}
            weekId={weekClass.weekId}
            updateWeekTitle={updateWeekTitle}
            deleteWeekPlan={deleteWeekPlan}
          />
        ))} */}
      </Container>
      <AddWeekButton>주차 추가하기</AddWeekButton>
      <OpenButton onClick={() => nextTab()}>다음으로</OpenButton>
    </>
  );
}

export default ClassDetail;
