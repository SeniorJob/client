import { Dispatch } from 'react';
import styled from 'styled-components';

type DeleteButton_T = {
  type: '개설' | '신청' | '제안';
  status: string;
  setShowModal: Dispatch<boolean>;
};

const DeleteButton = ({ type, status, setShowModal }: DeleteButton_T) => {
  return (
    <>
      {type === '개설' && (
        <Button onClick={() => setShowModal(true)}>개설취소</Button>
      )}
      {type === '신청' &&
        (status === '신청가능상태' || status === '개설대기상태') && (
          <Button onClick={() => setShowModal(true)}>신청취소</Button>
        )}
      {type === '제안' && (
        <Button onClick={() => setShowModal(true)}>제안취소</Button>
      )}
    </>
  );
};

export default DeleteButton;

const Button = styled.button.attrs({ type: 'button' })`
  position: absolute;
  right: 10px;
  top: 10px;
  border: 1px solid lightgray;
  font-size: 14px;
  padding: 4px 6px;
  border-radius: 10px;
`;
