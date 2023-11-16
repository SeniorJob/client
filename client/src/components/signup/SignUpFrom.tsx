import { useState } from 'react';
// import 'react-calendar/dist/Calendar.css'; // css import
import PostCode from './SignPostCode';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { categoryData } from '../category/categoryData'; // 후에 카테고리 데이터 변경
import tw from 'tailwind-styled-components';
import styled from 'styled-components';
import { PwValid, PwcfValid } from '../../utils/Valiable';

axios.defaults.withCredentials = true;

const SingUpFrom: React.FC = () => {
  const navigate = useNavigate();
  const [err, setErr] = useState<string | null>(null);
  const [pwValid, setPwValid] = useState<boolean | null>(null); // Fixed declaration
  const [pwcfValid, setPwcfValid] = useState<boolean | null>(null); // Fixed declaration
  const [form, setForm] = useState({
    name: '',
    phone: '',
    pw: '',
    pwcf: '',
    birthday: '',
    job: '',
    interest: '',
    address: '',
    DtAddress: '',
  });

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
    '기타',
  ];

  const SignUpSubmit = (event: React.FormEvent<HTMLButtonElement>) => {
    event.preventDefault();

    if (!isFormValid(form)) {
      alert('모든 필드를 입력해주세요.');
      return;
    }

    if (!pwValid) {
      alert('비밀번호가 유효하지 않습니다.');
      return;
    }

    if (!pwcfValid) {
      alert('비밀번호 확인이 일치하지 않습니다.');
      return;
    }

    const userDto = JSON.stringify({
      name: form.name,
      phoneNumber: form.phone,
      encryptionCode: form.pw,
      confirmPassword: form.pwcf,
      job: form.job,
      dateOfBirth: form.birthday,
      category: form.interest,
      region: form.address + form.DtAddress,
    });

    console.log(userDto);
    axios
      .post(`${import.meta.env.VITE_API_URL}/api/users/join`, userDto, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then(response => {
        // 요청이 성공하면 서버 응답을 처리합니다.
        console.log('서버 응답:', response.data);
        alert('회원가입이 정상적으로 완료 되었습니다.');
        navigate('/');
      })
      .catch(error => {
        // 요청이 실패하면 에러를 처리합니다.
        setErr(error.message);
        alert(err);
      });
  };

  // 유효성 검사 함수
  const isFormValid = (form: any) => {
    for (const key in form) {
      if (!form[key]) {
        return false;
      }
    }
    return true;
  };

  const changePw = (e: React.ChangeEvent<HTMLInputElement>) => {
    const pw = e.target.value;
    setForm({ ...form, pw });
    setPwValid(PwValid(pw));
    setPwcfValid(null); // Reset pwcfValid when pw changes
  };

  const changePwcf = (e: React.ChangeEvent<HTMLInputElement>) => {
    const pwcf = e.target.value;
    setForm({ ...form, pwcf });
    setPwcfValid(PwcfValid(form.pw, pwcf));
  };

  return (
    <SignUpFromLayout>
      <SignUpInputForm>
        <InputWrapper>
          <InputLabel>이름</InputLabel>
          <Input
            type="text"
            placeholder="예) 홍길동"
            value={form.name}
            onChange={e => setForm({ ...form, name: e.target.value })}
          />
        </InputWrapper>
        <InputWrapper>
          <InputLabel>전화번호</InputLabel>
          <Input
            type="text"
            placeholder="예) 01012345678"
            value={form.phone}
            onChange={e => setForm({ ...form, phone: e.target.value })}
          />
        </InputWrapper>
        <InputWrapper>
          <InputLabel>비밀번호</InputLabel>
          <Input
            type="password"
            placeholder="비밀번호를 입력해 주세요"
            value={form.pw}
            onChange={changePw}
          />
          {pwValid === null ? null : pwValid ? (
            <span className="text-[green] text-[13px] pl-[5px]">
              비밀번호가 정상적으로 입력 되었습니다.
            </span>
          ) : (
            <span className="text-[#FF0000] text-[13px] pl-[5px]">
              숫자 + 문자의 합이 8자 이상이 되게 입력해주세요
            </span>
          )}
        </InputWrapper>
        <InputWrapper>
          <InputLabel>비밀번호 확인</InputLabel>
          <Input
            type="password"
            placeholder="비밀번호를 입력해 주세요"
            value={form.pwcf}
            onChange={changePwcf}
          />
          {pwcfValid === null ? null : pwcfValid ? (
            <span className="text-[green] text-[13px] pl-[5px]">
              비밀번호 확인이 일치합니다.
            </span>
          ) : (
            <span className="text-[#FF0000] text-[13px] pl-[5px]">
              비밀번호가 일치하지 않습니다.
            </span>
          )}
        </InputWrapper>
        <InputWrapper>
          <InputLabel>생년월일</InputLabel>
          <div>
            <input
              className="w-[320px] h-[50px] p-[10px] border"
              type="date"
              value={form.birthday || ''}
              onChange={e => setForm({ ...form, birthday: e.target.value })}
            />
          </div>
        </InputWrapper>
        <InputWrapper>
          <InputLabel>직업</InputLabel>
          <JobSelectBox
            value={form.job || ''}
            onChange={e => setForm({ ...form, job: e.target.value })}
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
            value={form.interest || ''}
            onChange={e => setForm({ ...form, interest: e.target.value })}
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
          <PostCode setForm={setForm} />
          <Input
            type="text"
            value={form.address}
            onChange={e => setForm({ ...form, address: e.target.value })}
          ></Input>
          <InputLabel>상세 주소</InputLabel>
          <Input
            type="text"
            value={form.DtAddress || ''}
            onChange={e => setForm({ ...form, DtAddress: e.target.value })}
          ></Input>
        </InputWrapper>
        {/* <InputWrapper>
          <InputLabel>프로필 이미지</InputLabel>
          <Input type="file" accept="image/*" onChange={handleFileSelect} />
          {form.img && (
            <div>
              <img
                className="mt-[10px]"
                src={URL.createObjectURL(form.img)}
                alt="프로필 이미지 미리보기"
                width="320"
              />
            </div>
          )}
        </InputWrapper> */}
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
