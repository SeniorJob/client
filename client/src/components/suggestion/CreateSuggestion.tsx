import {
  CreateSuggestionLayOut,
  CreateSuggestionBox,
  SuggestUser,
  Content,
  InputWrapper,
  InputLabel,
  Input,
} from '../../assets/styles/CreateSuggestStyle';
// import { categoryData } from '../category/categoryData';
// import axios from 'axios';
import { useState } from 'react';
import { useUserStore } from '../../store/user';
import PostCode from '../../components/signup/SignPostCode';
const CreateSuggestion: React.FC = () => {
  const userDetail = useUserStore().userDetail;
  const [form, setForm] = useState({
    title: '',
    Introduce: '',
    category: '',
    address: '',
  });
  return (
    <CreateSuggestionLayOut>
      <SuggestUser>{userDetail.name}님의 제안 강좌</SuggestUser>
      <CreateSuggestionBox>
        <Content>
          <InputWrapper>
            <InputLabel>제안강좌 제목</InputLabel>
            <Input
              type="text"
              placeholder="강좌 제목을 입력해주세요"
              value={form.title}
              onChange={e => setForm({ ...form, title: e.target.value })}
            ></Input>
          </InputWrapper>

          <InputWrapper>
            <InputLabel>제안강좌 소개</InputLabel>
            <Input
              type="text"
              placeholder="강좌의 내용을 입력해주세요"
              value={form.Introduce}
              onChange={e => setForm({ ...form, Introduce: e.target.value })}
            ></Input>
          </InputWrapper>

          <InputWrapper>
            <InputLabel>카테고리 선택</InputLabel>
          </InputWrapper>

          <InputWrapper>
            <InputLabel>강좌개설 지역</InputLabel>
            <PostCode setForm={setForm} />
            <Input
              type="text"
              value={form.address}
              onChange={e => setForm({ ...form, address: e.target.value })}
            ></Input>
          </InputWrapper>
        </Content>
      </CreateSuggestionBox>
    </CreateSuggestionLayOut>
  );
};

export default CreateSuggestion;
