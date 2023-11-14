import styled from 'styled-components';
import { categoryData } from '../category/categoryData';
import axios from 'axios';
import { useState } from 'react';

const Input = styled.input`
  width: 400px;
  border: 1px solid black;
`;

const TextBox = styled(Input).attrs({ type: 'text' })``;

const TextArea = styled(Input).attrs({ as: 'textarea' })``;

const SelectBox = styled.select`
  border: 1px solid black;
`;

const Title = styled.div`
  font-size: 1.3rem;
  font-weight: bold;
`;

const CreateButton = styled.button`
  border: 1px solid black;
`;

const CreateSuggestion = () => {
  const [category, setCategory] = useState('');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [region, setRegion] = useState('');

  const apiUrl = import.meta.env.VITE_API_URL + '/api/lectureproposal/apply';

  const handleCreate = async () => {
    const data = {
      category,
      title,
      content,
      region,
    };

    axios
      .post(apiUrl, data)
      .then(res => {
        console.log(res.data);
      })
      .catch(err => {
        console.error('에러 : ' + err.message);
      });
  };

  return (
    <>
      <Title>제안하고 싶은 내용을 작성해주세요!</Title>
      <Title>제안강좌제목</Title>
      <TextBox
        type="text"
        placeholder="제안강좌제목을 입력해주세요."
        onChange={e => setTitle(e.target.value)}
      />
      <Title>제안강좌의 소개</Title>
      <TextArea
        placeholder="예) 제안강좌의 목적 또는 학습목표의 내용을 간략하게 기재해 다른 사람들에게 소개해보세요!"
        onChange={e => setContent(e.target.value)}
      />
      <Title>카테고리 선택</Title>
      <SelectBox
        name="category"
        id="category"
        onChange={e => setCategory(e.target.value)}
      >
        {categoryData.map(data => {
          return <option value={data.id}>{data.title}</option>;
        })}
      </SelectBox>
      <Title>지역</Title>
      <TextBox
        className="bg-gray-200"
        type="text"
        placeholder="지역을 선택하면 자동으로 입력됩니다."
        readOnly
        onChange={e => setRegion(e.target.value)}
      />
      <CreateButton onClick={handleCreate}>강좌제안개설</CreateButton>
    </>
  );
};

export default CreateSuggestion;
