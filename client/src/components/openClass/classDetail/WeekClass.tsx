import axios from 'axios';
import { FC, useState } from 'react';
import styled from 'styled-components';

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
}

const WeekClass: FC<WeekClassProps> = ({
  apiUrl,
  headers,
  weekNumber,
  weekTitle,
  weekId,
}) => {
  const [title, setTitle] = useState(weekTitle);

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

  return (
    <WeekClassContainer>
      <WeekClassTitle>
        <div>
          {weekNumber}주차 : {title}
        </div>
        <div className="flex gap-2">
          <ActionButton onClick={handleEditTitle}>수정</ActionButton>
          <ActionButton>삭제</ActionButton>
        </div>
      </WeekClassTitle>
      {/* {contents.map((content, index) => (
        <WeekClassContent key={index}>{content}</WeekClassContent>
      ))} */}
      <AddContentButton>상세내용 추가하기</AddContentButton>
    </WeekClassContainer>
  );
};

export default WeekClass;
