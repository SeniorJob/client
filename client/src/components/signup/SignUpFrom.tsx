import tw from 'tailwind-styled-components';
import styled from 'styled-components';

const SingUpFrom = () => {
  return (
    <SignUpInputForm>
      <InputWrapper>
        <InputLabel>이메일</InputLabel>
        <Input type="text" placeholder="exemple@sinior.com" />
      </InputWrapper>
      <InputWrapper>
        <InputLabel>비밀번호</InputLabel>
        <Input type="password" />
      </InputWrapper>
      <InputWrapper>
        <InputLabel>비밀번호 확인</InputLabel>
        <Input type="password" />
      </InputWrapper>
    </SignUpInputForm>
  );
};

export default SingUpFrom;

const SignUpInputForm = styled.div``;
const InputWrapper = tw.div`
    mb-6
`;
const InputLabel = styled.label`
  display: block;
  font-weight: bold;
`;
const Input = styled.input``;
