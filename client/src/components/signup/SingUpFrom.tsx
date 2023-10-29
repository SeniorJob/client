import { useState } from 'react';
import PostCode from './SignPostCode';
import axios from 'axios';
import {
  SignUpFromLayout,
  SignUpInputForm,
  InputWrapper,
  InputLabel,
  Input,
  JobSelectBox,
  InterCatagorySelectBox,
  SignUpBtn,
} from './SignUpFrom';

export const SingUpFrom: React.FC = () => {
  const [name, setName] = useState<string>('');
  const [phon, setPhon] = useState<string>('');
  const [pw, setPw] = useState<string>('');
  const [repw, setRepw] = useState<string>('');
  const [birthday, setBirthday] = useState<string | null>(null);
  const [selectedJobOption, setSelectedJobOption] = useState<string>('');
  const [selectedInterestOption, setSelectedInterestOption] =
    useState<string>('');
  const [address, setAddress] = useState<string>('');
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

    const userData = {
      name,
      phon,
      pw,
      repw,
      birthday,
      selectedJobOption,
      selectedInterestOption,
    };

    axios.post(
      'http://ec2-52-78-219-176.ap-northeast-2.compute.amazonaws.com:8080/api/users/join',
      userData,
    );
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
          <InputLabel>주소</InputLabel>
          <div>
            <PostCode address={setAddress} />
            <Input type="text" value={address}></Input>
          </div>
        </InputWrapper>
        <SignUpBtn onClick={SignUpSubmit}>가입하기</SignUpBtn>
      </SignUpInputForm>
    </SignUpFromLayout>
  );
};
