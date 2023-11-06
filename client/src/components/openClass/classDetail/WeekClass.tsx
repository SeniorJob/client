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
  week: number;
  classTitle: string | null;
}

const WeekClass: FC<WeekClassProps> = ({ week, classTitle }) => {
  const [contents, setContents] = useState<string[]>([]);

  const addContent = () => {
    const newContent = prompt('새로운 컨텐츠를 입력하세요');
    if (newContent !== null) {
      setContents([...contents, newContent]);
    }
  };

  return (
    <WeekClassContainer>
      <WeekClassTitle>
        <div>
          {week}주차 : {classTitle}
        </div>
        <div className="flex gap-2">
          <ActionButton>수정</ActionButton>
          <ActionButton>삭제</ActionButton>
        </div>
      </WeekClassTitle>
      {contents.map((content, index) => (
        <WeekClassContent key={index}>{content}</WeekClassContent>
      ))}
      <AddContentButton onClick={addContent}>
        상세내용 추가하기
      </AddContentButton>
    </WeekClassContainer>
  );
};

export default WeekClass;
