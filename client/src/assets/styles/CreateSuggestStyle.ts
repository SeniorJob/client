import tw from 'tailwind-styled-components';
import styled from 'styled-components';

export const CreateSuggestionLayOut = styled.div``;

export const SuggestUser = styled.div`
  font-size: 24px;
  margin: 10px 15% 10px 15%;
`;

export const CreateSuggestionBox = styled.div`
  display: flex;
  justify-content: center;
`;

export const Content = styled.form``;

export const InputWrapper = styled.div`
  margin-bottom: 10px;
`;

export const InputLabel = styled.div`
  font-size: 18px;
`;

export const Input = tw.input`
w-[320px]
border
rounded
px-[12px]
py-[13px]
mt-[4px]
`;

export const InputBixBox = tw.textarea`
w-[600px]
h-[250px]
border
rounded
px-[12px]
py-[13px]
mt-[4px]
`;

export const CreateSuggestFormLayOut = styled.div`
  display: flex;
  justify-content: center;
`;

export const CreateBtn = tw.button`
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
