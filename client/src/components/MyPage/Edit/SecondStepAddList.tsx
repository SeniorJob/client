import TextareaAutosize from 'react-textarea-autosize';
import styled from 'styled-components';
import { addWeekList } from '../../../api/mypage';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

type SecondStepAddList_T = {
  create_id: number;
  week_id: number;
  week_number: number;
};

const SecondStepAddList = ({
  create_id,
  week_id,
  week_number,
}: SecondStepAddList_T) => {
  const navigate = useNavigate();
  const [content, setContent] = useState<string>('');

  const handleAddWeekList = async () => {
    const res = await addWeekList({
      lectureId: create_id,
      weekId: week_id,
      content,
    });

    if (res.status === 200) {
      alert('입력한 내용 추가 성공');
      navigate(0);
    }
  };

  return (
    <Label>
      <div style={{ margin: '10px 0 4px 0' }}>
        {'[ ' + week_number + '주차 내용 추가' + ' ]'}
      </div>
      <div style={{ display: 'flex', border: '1px solid lightgray' }}>
        <TextArea
          value={content}
          onChange={e => {
            setContent(e.target.value);
          }}
          placeholder="내용을 입력하세요"
          style={{ flex: '1' }}
        />
        <AddButton onClick={handleAddWeekList}>내용 추가</AddButton>
      </div>
    </Label>
  );
};

export default SecondStepAddList;

const Label = styled.label`
  display: flex;
  flex-direction: column;
  text-align: center;
  margin-top: 10px;
`;

const AddButton = styled.button.attrs({ type: 'button' })`
  border: none;
  border-left: 1px solid lightgray;
  padding: 6px 12px;
`;

const TextArea = styled(TextareaAutosize)`
  border: none;
  padding: 6px 12px;
  resize: none;
  flex: 1;
  border-top: none;
  outline: none;
`;
