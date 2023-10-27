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
  const [selectedJobOption, setSelectedJobOption] = useState('');
  const [selectedInterestOption, setSelectedInterestOption] = useState('');

  const jobOptions = ['자영업자', '공무원', '프리랜서', '직장인', '전문직'];
  const interestCategoryOption = [
    '외식',
    '서비스',
    '사무직',
    '생산',
    '운전',
    '디자인',
    'IT',
    '기술',
    '교육',
    '의료',
  ];

  const SignUpSubmit = (event: React.FormEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  // 강좌 시작 날짜 선택을 처리하는 함수
  const handleBirthdayDate = (birthday: string) => {
    setBirthday(birthday);
  };

  const handleJobOptionsSelectChange = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    setSelectedJobOption(event.target.value);
  };

  const handleInterestCategorySelectChange = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    setSelectedInterestOption(event.target.value);
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
          <JobSelectBox
            value={selectedJobOption || ''}
            onChange={handleJobOptionsSelectChange}
          >
            <option value={''}>선택하세요</option>
            {jobOptions.map((option, index) => (
              <option key={index} value={option}>
                {option}
              </option>
            ))}
          </JobSelectBox>
        </InputWrapper>
        <InputWrapper>
          <InputLabel>관심 카테고리</InputLabel>
          <InterCatagorySelectBox
            value={selectedInterestOption || ''}
            onChange={handleInterestCategorySelectChange}
          >
            <option value={''}>선택하세요</option>
            {interestCategoryOption.map((option, index) => (
              <option key={index} value={option}>
                {option}
              </option>
            ))}
          </InterCatagorySelectBox>
        </InputWrapper>
        <InputWrapper>
          <div>
            <InputLabel>주소</InputLabel>
            <button>우편번호 찾기</button>
          </div>
          <div>
            <input className="w-[320px] h-[50px] p-[10px] border" />
          </div>
        </InputWrapper>
        <SignUpBtn onClick={SignUpSubmit}>가입하기</SignUpBtn>
      </SignUpInputForm>
    </SignUpFromLayout>
  );
};

export default SingUpFrom;

const SignUpFromLayout = styled.div``;

const SignUpInputForm = styled.form`
  margin-top: 60px;
`;

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

const JobSelectBox = tw.select`

  w-[320px]
  h-[50px] 
  p-[10px] 
  border
`;

const InterCatagorySelectBox = tw.select`
  w-[320px]
  h-[50px] 
  p-[10px] 
  border
`;
