import { useState } from 'react';

import tw from 'tailwind-styled-components';
import styled from 'styled-components';

const SingUpFrom = () => {
  const [id, setId] = useState('');

  return (
    <SignUpFromLayout>
      <SignUpInputForm>
        <InputWrapper>
          <InputLabel>이름</InputLabel>
          <Input type="text" placeholder="예) 홍길동" />
        </InputWrapper>
        <InputWrapper>
          <InputLabel>전화번호</InputLabel>
          <Input type="text" placeholder="예) 01012345678" />
        </InputWrapper>
        <InputWrapper>
          <InputLabel>비밀번호</InputLabel>
          <Input type="password" placeholder="******" />
        </InputWrapper>
        <InputWrapper>
          <InputLabel>비밀번호 확인</InputLabel>
          <Input type="password" placeholder="******" />
        </InputWrapper>
        <InputWrapper>
          <InputLabel>직업</InputLabel>
          <Input type="password" placeholder="******" />
        </InputWrapper>
        <InputWrapper>
          <InputLabel>생년월일</InputLabel>
          <Input type="password" placeholder="" />
        </InputWrapper>
        <SignUpBtn>가입하기</SignUpBtn>
      </SignUpInputForm>
    </SignUpFromLayout>
  );
};

export default SingUpFrom;

const SignUpFromLayout = styled.div``;

const SignUpInputForm = styled.form``;

const InputWrapper = tw.div`
    mb-[16px]
`;
const InputLabel = styled.label`
  display: block;
  font-size: 15px;
`;
const Input = tw.input`
  w-[320px]
  border
  rounded
  px-[12px]
  py-[13px]
  mt-[4px]
`;

const SignUpBtn = tw.button`
  w-[320px]
  h-[52px]
  rounded
  text-center
  border
  p-[12px]
  mt-[16px]
  mb-[12px]
  bg-[#1DC078]
  cursor-pointer
  text-[#fff]
`;
