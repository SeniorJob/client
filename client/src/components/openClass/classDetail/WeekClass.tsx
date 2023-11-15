import axios, { AxiosResponse } from 'axios';
import { FC, useState } from 'react';
import styled from 'styled-components';
import { WeekPlanDtoType } from './ClassDetail';

const WeekClassTitle = styled.div`
  display: flex;
  background-color: #f5f5f5;
  padding: 8px;
  font-size: 1.5rem;
  font-weight: bold;
  justify-content: space-between;
`;

const WeekClassContent = styled.div`
  padding: 10px 20px;
  font-size: 1.3rem;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;

  border-top: 1px solid lightgray;
`;

const ActionButton = styled.div`
  font-size: 1.2rem;
  font-weight: normal;
  display: flex;
  align-items: center;
  cursor: pointer;
  &:hover {
    color: #ff0000;
  }
`;

const AddContentButton = styled.div`
  display: flex;
  padding: 8px;
  font-size: 1.2rem;
  justify-content: center;
  margin: auto;
  border-top: 1px solid lightgray;
  cursor: pointer;

  &:hover {
    color: red;
  }
`;

const WeekClassContainer = styled.div`
  border: 1px solid black;
  margin-top: 16px;
`;

const Image = styled.svg`
  width: 50px;
  padding: 0.5em;
  cursor: pointer;
`;

interface WeekClassProps {
  apiUrl: string;
  headers: object;
  weekNumber: number;
  weekTitle: string;
  weekId: number;
  onDelete: () => void;
  createId: number;
  weekPlans: WeekPlanDtoType[];
}

const WeekClass: FC<WeekClassProps> = ({
  apiUrl,
  headers,
  weekNumber,
  weekTitle,
  weekId,
  onDelete,
  createId,
  weekPlans,
}) => {
  const [title, setTitle] = useState(weekTitle);
  const [content, setContent] = useState<WeekPlanDtoType[]>(weekPlans);

  const handleEditTitle = async () => {
    const newTitle = prompt('주차 제목을 입력하세요:');
    if (newTitle === null || newTitle.trim() === '') {
      alert('주차 제목을 입력해주세요!');
      return;
    }

    try {
      await axios.put(
        `${apiUrl}/weeks/${weekId}/week-update?title=${newTitle}`,
        {},
        {
          headers,
        },
      );
      setTitle(newTitle);
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async () => {
    if (window.confirm('정말로 이 주차를 삭제하시겠습니까?')) {
      try {
        await axios.delete(`${apiUrl}/weeks/${weekId}/week-delete`, {
          headers,
        });
        alert('주차가 성공적으로 삭제되었습니다!');
        onDelete();
      } catch (err) {
        console.error(err);
        alert('주차를 삭제하는 데 실패했습니다. 다시 시도해 주세요.');
      }
    }
  };

  const handleAddContent = async () => {
    const newContent = prompt('추가할 내용을 입력하세요');
    if (newContent === null || newContent.trim() === '') {
      alert('내용을 입력해주세요!');
      return;
    }
    try {
      const response: AxiosResponse = await axios.post(
        `${
          import.meta.env.VITE_API_URL
        }/api/lecturesStepTwo/lectures/${createId}/weeks/${weekId}/plans?detail=${newContent}`,
        {},
        {
          headers,
        },
      );
      setContent(response.data.details);
    } catch (err) {
      console.error(err);
    }
  };

  const handleEditContent = async (planId: number) => {
    const newContent = prompt('수정할 내용을 입력하세요');
    if (newContent === null || newContent.trim() === '') {
      alert('내용을 입력해주세요!');
      return;
    }
    try {
      await axios.put(
        `${
          import.meta.env.VITE_API_URL
        }/api/lecturesStepTwo/${createId}/weeks/${weekId}/plans/${planId}/plan-update?detail=${newContent}`,
        {},
        {
          headers,
        },
      );
      setContent(prevContent =>
        prevContent.map(item =>
          item.plan_id === planId ? { ...item, detail: newContent } : item,
        ),
      );
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteContent = async (planId: number) => {
    if (window.confirm('정말로 이 항목을 삭제하시겠습니까?')) {
      try {
        await axios.delete(
          `${apiUrl}/weeks/${weekId}/plans/${planId}/plan-delete`,
          {
            headers,
          },
        );
        alert('항목이 성공적으로 삭제되었습니다!');
        setContent(prevContent =>
          prevContent.filter(item => item.plan_id !== planId),
        );
      } catch (err) {
        console.error(err);
        alert('항목을 삭제하는 데 실패했습니다. 다시 시도해 주세요.');
      }
    }
  };

  return (
    <WeekClassContainer>
      <WeekClassTitle>
        <div>
          {weekNumber}주차 : {title}
        </div>
        <div className="flex gap-2">
          <ActionButton onClick={handleEditTitle}>수정</ActionButton>
          <ActionButton onClick={handleDelete}>삭제</ActionButton>
        </div>
      </WeekClassTitle>
      {content &&
        content.map((plan: WeekPlanDtoType, index: number) => (
          <div key={index}>
            <div>
              <WeekClassContent key={index}>
                {plan.detail}
                <div className="flex">
                  <Image
                    xmlns="http://www.w3.org/2000/svg"
                    data-name="Layer 1"
                    viewBox="0 0 24 24"
                    id="edit"
                    onClick={() => handleEditContent(plan.plan_id)}
                  >
                    <path d="M3.5,24h15A3.51,3.51,0,0,0,22,20.487V12.95a1,1,0,0,0-2,0v7.537A1.508,1.508,0,0,1,18.5,22H3.5A1.508,1.508,0,0,1,2,20.487V5.513A1.508,1.508,0,0,1,3.5,4H11a1,1,0,0,0,0-2H3.5A3.51,3.51,0,0,0,0,5.513V20.487A3.51,3.51,0,0,0,3.5,24Z"></path>
                    <path d="M9.455,10.544l-.789,3.614a1,1,0,0,0,.271.921,1.038,1.038,0,0,0,.92.269l3.606-.791a1,1,0,0,0,.494-.271l9.114-9.114a3,3,0,0,0,0-4.243,3.07,3.07,0,0,0-4.242,0l-9.1,9.123A1,1,0,0,0,9.455,10.544Zm10.788-8.2a1.022,1.022,0,0,1,1.414,0,1.009,1.009,0,0,1,0,1.413l-.707.707L19.536,3.05Zm-8.9,8.914,6.774-6.791,1.4,1.407-6.777,6.793-1.795.394Z"></path>
                  </Image>
                  <Image
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 32 32"
                    id="delete"
                    onClick={() => handleDeleteContent(plan.plan_id)}
                  >
                    <path d="M24.2,12.193,23.8,24.3a3.988,3.988,0,0,1-4,3.857H12.2a3.988,3.988,0,0,1-4-3.853L7.8,12.193a1,1,0,0,1,2-.066l.4,12.11a2,2,0,0,0,2,1.923h7.6a2,2,0,0,0,2-1.927l.4-12.106a1,1,0,0,1,2,.066Zm1.323-4.029a1,1,0,0,1-1,1H7.478a1,1,0,0,1,0-2h3.1a1.276,1.276,0,0,0,1.273-1.148,2.991,2.991,0,0,1,2.984-2.694h2.33a2.991,2.991,0,0,1,2.984,2.694,1.276,1.276,0,0,0,1.273,1.148h3.1A1,1,0,0,1,25.522,8.164Zm-11.936-1h4.828a3.3,3.3,0,0,1-.255-.944,1,1,0,0,0-.994-.9h-2.33a1,1,0,0,0-.994.9A3.3,3.3,0,0,1,13.586,7.164Zm1.007,15.151V13.8a1,1,0,0,0-2,0v8.519a1,1,0,0,0,2,0Zm4.814,0V13.8a1,1,0,0,0-2,0v8.519a1,1,0,0,0,2,0Z"></path>
                  </Image>
                </div>
              </WeekClassContent>
            </div>
          </div>
        ))}
      <AddContentButton onClick={handleAddContent}>
        상세내용 추가하기
      </AddContentButton>
    </WeekClassContainer>
  );
};

export default WeekClass;
