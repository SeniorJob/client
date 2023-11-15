import { useState } from 'react';
import styled from 'styled-components';
import { addWeekTitle } from '../../../api/mypage';
import { useNavigate } from 'react-router-dom';

const AddWeek = ({ lectureId }: { lectureId: number }) => {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');

  const handleAddWeekTitle = async () => {
    const res = await addWeekTitle({ lectureId, title });
    if (res.status === 200) {
      alert('커리큘럼이 추가되었습니다');
      navigate(0);
    }
  };

  return (
    <Label>
      [ 강의 커리큘럼 추가 ]
      <div
        style={{
          display: 'flex',
          border: '1px solid lightgray',
          margin: '4px 0',
        }}
      >
        <Input
          value={title}
          onChange={e => {
            setTitle(e.target.value);
          }}
          placeholder="타이틀을 입력하세요"
          style={{ flex: '1' }}
        />
        <AddButton onClick={handleAddWeekTitle}>주차 추가</AddButton>
      </div>
    </Label>
  );
};

export default AddWeek;

const Label = styled.label`
  text-align: center;
  display: flex;
  flex-direction: column;
`;

const AddButton = styled.button.attrs({ type: 'button' })`
  border: none;
  border-left: 1px solid lightgray;
  padding: 12px 24px;
`;

const Input = styled.input`
  padding: 6px 12px;
  flex: 1;
  border-top: none;
  outline: none;
`;
