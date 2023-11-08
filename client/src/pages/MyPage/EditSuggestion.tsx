import { useState } from 'react';
import MyPageLayout from '../../components/MyPage/MyPageLayout';
import MyPageTitle from '../../components/MyPage/MyPageTitle';
import styled from 'styled-components';
import SignPostCode from '../../components/signup/SignPostCode';
import { useNavigate } from 'react-router-dom';

const EditSuggestion = () => {
  const navigate = useNavigate();
  const [suggestionDTO, setSuggestionDTO] = useState({
    title: '',
    content: '',
    category: '',
    address: '',
    addressDetail: '',
  });

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

  return (
    <MyPageLayout>
      <MyPageTitle title="제안" type="edit" />

      <hr style={{ margin: '20px 0' }} />

      <Label>
        제안한 강좌 제목
        <Input type="text" name="title" />
      </Label>

      <Label>
        제안한 강좌 소개
        <textarea
          style={{
            border: '1px solid lightgray',
            padding: '10px',
            height: '300px',
            resize: 'none',
            marginTop: '6px',
            marginBottom: '20px',
          }}
          placeholder="강좌 소개를 적어주세요"
        ></textarea>
      </Label>

      <Label>
        관심 카테고리
        <Select
          style={{ marginTop: '6px', marginBottom: '20px' }}
          onChange={e =>
            setSuggestionDTO({ ...suggestionDTO, category: e.target.value })
          }
        >
          <option>선택하세요</option>
          {interestCategoryOption.map((option, index) => (
            <option key={index} value={option}>
              {option}
            </option>
          ))}
        </Select>
      </Label>

      <Label>
        <SignPostCode setForm={setSuggestionDTO} />
        <Input
          type="text"
          value={suggestionDTO.address}
          onChange={e =>
            setSuggestionDTO({ ...suggestionDTO, address: e.target.value })
          }
        ></Input>
      </Label>
      <Label>
        상세주소
        <Input
          onChange={e =>
            setSuggestionDTO({
              ...suggestionDTO,
              addressDetail: e.target.value,
            })
          }
        />
      </Label>

      <hr style={{ margin: '20px 0' }} />

      <div style={{ display: 'flex', justifyContent: 'center', gap: '20px' }}>
        <Button>수정완료</Button>
        <Button onClick={() => navigate(-1)}>취소</Button>
      </div>
    </MyPageLayout>
  );
};

export default EditSuggestion;

const Label = styled.label`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  border: 1px solid lightgray;
  width: 100%;
  padding: 12px;
  margin-top: 6px;
  margin-bottom: 20px;
`;

const Select = styled.select`
  border: 1px solid lightgray;
  width: 320px;
  height: 54px;
  padding: 12px;
  margin-top: 6px;
`;

const Button = styled.button.attrs({ type: 'button' })`
  border: 1px solid lightgray;
  width: 140px;
  padding: 10px 8px;
  border-radius: 10px;
  &:hover {
    border: 1px solid green;
  }
`;
