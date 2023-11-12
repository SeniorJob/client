import { useState } from 'react';
import { Modal } from '../../common/Modal';
import styled from 'styled-components';
import { RegButton } from '../../../assets/styles/CommonStyles';

const ApplyContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  margin: 1rem 0 0.5rem 0;
  h2 {
    font-size: 1.1rem;
    font-weight: 600;
  }
`;

const ApplyForm = styled.form`
  position: relative;
  display: flex;
  width: 100%;
  border: 1px solid #ccc;
  border-radius: 0.5rem;
  padding: 0.4rem 0.6rem;
  font-size: 0.9rem;
`;

const ApplyInput = styled.textarea`
  width: 100%;
  resize: none;
  &:focus-within {
    outline: none;
  }
`;

export const LectureApply = ({ closeModal }: { closeModal: () => void }) => {
  const [text, setText] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const inputValue = e.target.value;
    if (inputValue.length <= 50) setText(inputValue);
    if (inputValue.length === 51) return;
    console.log('신청 이유 : ' + text);
  };

  return (
    <Modal closeModal={closeModal}>
      <ApplyContainer>
        <h2>신청 이유를 작성해주세요.</h2>
        <ApplyForm>
          <ApplyInput
            value={text}
            maxLength={50}
            onChange={handleChange}
            placeholder="50자까지 작성 가능합니다. (공란 가능)"
            rows={3}
          />
        </ApplyForm>
        <RegButton>신청하기</RegButton>
      </ApplyContainer>
    </Modal>
  );
};
