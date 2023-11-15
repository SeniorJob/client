import styled from 'styled-components';
import TextareaAutosize from 'react-textarea-autosize';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { deleteWeekList, updateWeekPlan } from '../../../api/mypage';

type SecondStepList_T = {
  create_id: number;
  week_id: number;
  plan_id: number;
  week_number: number;
  detail_number: number;
  detail: string;
};

const SecondStepList = ({
  create_id,
  week_id,
  plan_id,
  detail,
  detail_number,
  week_number,
}: SecondStepList_T) => {
  const navigate = useNavigate();
  const [edit, setEdit] = useState(false);
  const [content, setContent] = useState('');

  const handlePlayEdit = () => setEdit(true);

  const handleUpdateLecture = async () => {
    const res = await updateWeekPlan({
      le_id: create_id,
      weekId: week_id,
      planId: plan_id,
      detail: content,
    });
    if (res.status === 200) {
      alert('내용 업데이트 성공');
      setEdit(false);
    }
  };

  const handleDeleteLecture = async () => {
    const res = await deleteWeekList({
      lectureId: create_id,
      weekId: week_id,
      planId: plan_id,
    });
    if (res.status === 200) {
      console.log(res);
      alert('선택한 내용 삭제 성공');
      navigate(0);
    }
  };

  const handleResetEdit = () => {
    setEdit(false);
    setContent(detail);
  };

  useEffect(() => {
    setContent(detail.replace(/(<br>|<br\/>|<br \/>)/g, '\r\n'));
  }, []);

  return (
    <LabelList>
      <div style={{ position: 'absolute', top: '6px', left: '10px' }}>
        {week_number}-{detail_number}
      </div>
      <TextArea
        disabled={!edit}
        defaultValue={detail}
        value={content}
        onChange={e => setContent(e.target.value)}
      />
      <ButtonWrapper>
        {edit ? (
          <Button onClick={handleUpdateLecture}>수정완료</Button>
        ) : (
          <Button onClick={handlePlayEdit}>수정하기</Button>
        )}
        <Button onClick={handleDeleteLecture}>삭제하기</Button>
        <Button onClick={handleResetEdit}>수정취소</Button>
      </ButtonWrapper>
    </LabelList>
  );
};

export default SecondStepList;

const LabelList = styled.label`
  position: relative;
  display: flex;
  align-items: center;
`;

const TextArea = styled(TextareaAutosize)`
  border: 1px solid lightgray;
  padding: 6px 12px;
  resize: none;
  flex: 1;
  border-top: none;
  padding-left: 40px;
`;

const ButtonWrapper = styled.div`
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  gap: 4px;
  display: flex;
`;

const Button = styled.button.attrs({ type: 'button' })`
  font-size: 12px;
  background-color: #fff;
  padding: 4px 6px;
  border: 1px solid gray;
  border-radius: 5px;
`;
