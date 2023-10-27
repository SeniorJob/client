import { useState } from 'react';
import 'react-calendar/dist/Calendar.css'; // css import

import axios from 'axios';

import tw from 'tailwind-styled-components';
import styled from 'styled-components';

const SingUpFrom = () => {
  const [name, setName] = useState<string>('');
  const [phon, setPhon] = useState<string>('');
  const [pw, setPw] = useState<string>('');
  const [repw, setRepw] = useState<string>('');
  const [birthday, setBirthday] = useState<string | null>(null);
  const SignUpSubmit = (event: React.FormEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  // 강좌 시작 날짜 선택을 처리하는 함수
  const handleBirthdayDate = (birthday: string) => {
    setBirthday(birthday);
  };

  return (
    <SignUpFromLayout>
      <SignUpInputForm>
        <InputWrapper>
          <InputLabel>이름</InputLabel>
          <Input
            type="text"
            placeholder="예) 홍길동"
            value={name}
            onChange={e => setName(e.target.value)}
          />
        </InputWrapper>
        <InputWrapper>
          <InputLabel>전화번호</InputLabel>
          <Input
            type="text"
            placeholder="예) 01012345678"
            value={phon}
            onChange={e => setPhon(e.target.value)}
          />
        </InputWrapper>
        <InputWrapper>
          <InputLabel>비밀번호</InputLabel>
          <Input
            type="password"
            placeholder="******"
            value={pw}
            onChange={e => setPw(e.target.value)}
          />
        </InputWrapper>
        <InputWrapper>
          <InputLabel>비밀번호 확인</InputLabel>
          <Input
            type="password"
            placeholder="******"
            value={repw}
            onChange={e => setRepw(e.target.value)}
          />
        </InputWrapper>
        <InputWrapper>
          <InputLabel>생년월일</InputLabel>
          <div>
            <input
              className="w-[320px] h-[50px] p-[10px] border"
              type="date"
              value={birthday || ''}
              onChange={e => handleBirthdayDate(e.target.value)}
            />
          </div>
        </InputWrapper>
        <InputWrapper>
          <InputLabel>직업</InputLabel>
          <Input type="text" placeholder="예) 학생, 회사원, 자영업자 등" />
        </InputWrapper>
        <InputWrapper>
          <InputLabel>관심 카테고리</InputLabel>
        </InputWrapper>
        <SignUpBtn onClick={SignUpSubmit}>가입하기</SignUpBtn>
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
