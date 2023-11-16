import {
  CreateSuggestFormLayOut,
  CreateSuggestionBox,
  Content,
  InputWrapper,
  InputLabel,
  Input,
  InputBixBox,
  CreateBtn,
} from '../../assets/styles/CreateSuggestStyle';
import { useState } from 'react';
import PostCode from './SuggstPostCode';
import axios from 'axios';

const CreateSuggestForm = () => {
  const [form, setForm] = useState({
    title: '',
    Introduce: '',
    category: '',
    address: '',
  });

  const accessToken = localStorage.getItem('accessToken');
  const CreateSubmit = (event: React.FormEvent<HTMLButtonElement>) => {
    event.preventDefault();

    axios.post(
      `${import.meta.env.VITE_API_URL}/api/lectureproposal/apply`,
      {},
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );
  };

  return (
    <CreateSuggestFormLayOut>
      <CreateSuggestionBox>
        <Content>
          <InputWrapper>
            <InputLabel>제안강좌 제목</InputLabel>
            <Input
              placeholder="강좌 제목을 입력해주세요"
              value={form.title}
              onChange={e => setForm({ ...form, title: e.target.value })}
            ></Input>
          </InputWrapper>

          <InputWrapper>
            <InputLabel>제안강좌 소개</InputLabel>
            <InputBixBox
              placeholder="강좌의 간단한 설명을 입력해 주세요"
              value={form.Introduce}
              onChange={e => setForm({ ...form, Introduce: e.target.value })}
            ></InputBixBox>
          </InputWrapper>

          <InputWrapper>
            <InputLabel>카테고리 선택</InputLabel>
          </InputWrapper>

          <InputWrapper>
            <InputLabel>강좌개설 지역</InputLabel>
            <PostCode setForm={setForm} />
            <Input
              value={form.address}
              onChange={e => setForm({ ...form, address: e.target.value })}
            ></Input>
          </InputWrapper>
          <InputWrapper>
            <InputLabel>지도 API</InputLabel>
          </InputWrapper>
          <CreateBtn onClick={CreateSubmit}>강좌 제안</CreateBtn>
          <CreateBtn>취소하기</CreateBtn>
        </Content>
      </CreateSuggestionBox>
    </CreateSuggestFormLayOut>
  );
};

export default CreateSuggestForm;
