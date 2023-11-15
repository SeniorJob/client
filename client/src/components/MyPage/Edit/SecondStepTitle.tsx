import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { deleteWeekTitle, updateWeekTitle } from '../../../api/mypage';
import { useNavigate } from 'react-router-dom';

type SecondStepTitle_T = {
  create_id: number;
  week_title: string;
  week_number: number;
  week_id: number;
};

const SecondStepTitle = ({
  create_id,
  week_title,
  week_number,
  week_id,
}: SecondStepTitle_T) => {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [edit, setEdit] = useState(false);

  const handlePlayEdit = () => setEdit(true);

  const handleUpdateLecture = async () => {
    const res = await updateWeekTitle({
      title,
      weekId: week_id,
      lectureId: create_id,
    });
    if (res.status === 200) {
      alert('제목이 변경되었습니다');
      setEdit(false);
    }
  };

  const handleDeleteLecture = async () => {
    const res = await deleteWeekTitle({ createId: create_id, weekId: week_id });
    if (res.status === 200) {
      alert('선택한 주차 내용이 삭제되었습니다');
      navigate(0);
    }
  };

  const handleResetEdit = () => {
    setEdit(false);
    setTitle(week_title);
  };

  useEffect(() => {
    setTitle(week_title);
  }, []);

  return (
    <>
      <Container>
        <Wrapper>
          &nbsp;&nbsp;{week_number + '주차 :'}
          <Input
            defaultValue={week_title}
            value={title}
            onChange={e => setTitle(e.target.value)}
            edit={edit}
          />
        </Wrapper>
        <ButtonWrapper>
          {edit ? (
            <Button onClick={handleUpdateLecture}>수정완료</Button>
          ) : (
            <Button onClick={handlePlayEdit}>수정하기</Button>
          )}
          <Button onClick={handleDeleteLecture}>삭제하기</Button>
          <Button onClick={handleResetEdit}>수정취소</Button>
        </ButtonWrapper>
      </Container>
    </>
  );
};

export default SecondStepTitle;

const Container = styled.label`
  display: flex;
  align-items: center;
  position: relative;
`;

const Wrapper = styled.div`
  border: 1px solid lightgray;
  display: flex;
  background: #f4f4f4;
  flex: 1;
  height: 50px;
  align-items: center;
  font-size: 20px;
`;

const Input = styled.input<{ edit: boolean }>`
  width: 410px;
  border-right: 1px solid lightgray;
  padding: 6px 4px;
  background: ${props => (props.edit ? 'white' : 'none')};
  outline: none;
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
  font-size: 14px;
  background-color: #fff;
  padding: 4px 6px;
  border: 1px solid gray;
  border-radius: 5px;
`;
