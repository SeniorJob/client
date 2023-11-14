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
  font-size: 1.2rem;

  border: 1px solid lightgray;
`;

const ActionButton = styled.div`
  font-size: 1.2rem;
  font-weight: normal;
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
  border: 1px solid lightgray;
  cursor: pointer;

  &:hover {
    color: red;
  }
`;

const WeekClassContainer = styled.div`
  border: 1px solid black;
  margin-top: 16px;
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

  console.log(weekPlans);

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
        }/api/lecturesStepTwo/lectures/${105}/weeks/${weekId}/plans?detail=${newContent}`, // TODO: createId 수정해야함
        {},
        {
          headers,
        },
      );

      setContent(response.data.details);
      console.log(response.data);
    } catch (err) {
      console.error(err);
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
            <WeekClassContent key={index}>{plan.detail}</WeekClassContent>
          </div>
        ))}
      <AddContentButton onClick={handleAddContent}>
        상세내용 추가하기
      </AddContentButton>
    </WeekClassContainer>
  );
};

export default WeekClass;
