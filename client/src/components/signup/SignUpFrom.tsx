import tw from 'tailwind-styled-components';
import styled from 'styled-components';

const SingUpFrom = () => {
  return (
    <SignUpFromLayout>
      <SignUpInputForm>
        <InputWrapper>
          <InputLabel>이메일</InputLabel>
          <Input type="text" placeholder="exemple@sinior.com" />
        </InputWrapper>
        <InputWrapper>
          <InputLabel>비밀번호</InputLabel>
          <Input type="password" placeholder="******" />
        </InputWrapper>
        <InputWrapper>
          <InputLabel>비밀번호 확인</InputLabel>
          <Input type="password" placeholder="******" />
        </InputWrapper>
      </SignUpInputForm>
      <SignUpBtn>가입하기</SignUpBtn>
    </SignUpFromLayout>
  );
};

export default SingUpFrom;

const SignUpFromLayout = styled.div``;

const SignUpInputForm = styled.div``;

const InputWrapper = tw.div`
    mb-6
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

const SignUpBtn = tw.div`
  w-[320px]
  h-[52px]
  rounded
  text-center
  border
  p-[12px]
  
  cursor-pointer
`;
