import { ChangeEvent, Dispatch, useState } from 'react';
import styled from 'styled-components';
import {
  BANK_NAMES,
  INTEREST_CATEGORY_OPTIONS,
} from '../../../constants/Profile';
import { FirstStep_T } from '../../../types/LectureTypes';
import SignPostCode from '../../signup/SignPostCode';
import { updateFirstStep } from '../../../api/mypage';
import { useNavigate } from 'react-router-dom';

type EditFirstStep_T = {
  id?: number;
  firstInfo: FirstStep_T;
  setFirstInfo: Dispatch<FirstStep_T>;
};

const EditFirstStep = ({ id, firstInfo, setFirstInfo }: EditFirstStep_T) => {
  const {
    title,
    content,
    category,
    learning_target,
    week,
    recruitEnd_date,
    start_date,
    end_date,
    max_participants,
    region,
    price,
    bank_name,
    account_name,
    account_number,
  } = firstInfo;

  const formData = new FormData();
  const [image, setImage] = useState<string>();
  const [selectedImage, setSelectedImage] = useState<string | Blob>('');
  const navigate = useNavigate();

  const handleChangeImage = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;

    if (files) {
      setImage(URL.createObjectURL(files[0]));
      setSelectedImage(files[0]);
    }
  };

  const handleUpdateFirstStep = async () => {
    formData.append('file', selectedImage);
    formData.append('lectureDto', JSON.stringify(firstInfo));
    if (id) {
      const res = await updateFirstStep({ create_id: id, formData });
      if (res.status === 200) {
        alert('수정완료');
        navigate(-1);
      } else alert(res);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <Title>강의 기본 정보 입력</Title>
      <Label>
        대표 이미지를 재설정해주세요
        {selectedImage && <Image src={image} alt="이미지를 추가해주세요" />}
        <InputImage type="file" onChange={handleChangeImage} />
      </Label>
      <Label width="300px">
        강의 제목
        <Input
          value={title}
          onChange={e => setFirstInfo({ ...firstInfo, title: e.target.value })}
        />
      </Label>

      <Label>
        강의 소개
        <TextArea
          value={content}
          onChange={e =>
            setFirstInfo({ ...firstInfo, content: e.target.value })
          }
        />
      </Label>

      <Label width="200px">
        카테고리 선택
        <Select
          value={category}
          onChange={e =>
            setFirstInfo({ ...firstInfo, category: e.target.value })
          }
        >
          <option>선택하세요</option>
          {INTEREST_CATEGORY_OPTIONS.map((option, index) => (
            <option key={index} value={option}>
              {option}
            </option>
          ))}
        </Select>
      </Label>

      <Label>
        학습 대상
        <Input
          value={learning_target}
          onChange={e =>
            setFirstInfo({ ...firstInfo, learning_target: e.target.value })
          }
        />
      </Label>

      <div style={{ display: 'flex', gap: '20px' }}>
        <Label>
          강의 횟수
          <div>
            주
            <Input
              style={{ width: '44px', margin: '4px 4px 0 8px' }}
              value={week}
              onChange={e =>
                setFirstInfo({ ...firstInfo, week: parseInt(e.target.value) })
              }
            />
            회
          </div>
        </Label>

        <Label>
          최대 참가자 수
          <div>
            <Input
              style={{ width: '50px', height: '40px' }}
              value={max_participants}
              onChange={e =>
                setFirstInfo({
                  ...firstInfo,
                  max_participants: parseInt(e.target.value),
                })
              }
            />
            명
          </div>
        </Label>

        <Label>
          강의 모집마감 날짜
          <Input
            type="date"
            value={recruitEnd_date.slice(0, 10)}
            onChange={e =>
              setFirstInfo({
                ...firstInfo,
                recruitEnd_date: `${e.target.value}T00:00:00`,
              })
            }
          />
        </Label>

        <Label>
          강의 시작 날짜
          <Input
            type="date"
            value={start_date.slice(0, 10)}
            onChange={e =>
              setFirstInfo({
                ...firstInfo,
                start_date: `${e.target.value}T00:00:00`,
              })
            }
          />
        </Label>
        <Label>
          강의 종료 날짜
          <Input
            type="date"
            value={end_date.slice(0, 10)}
            onChange={e =>
              setFirstInfo({
                ...firstInfo,
                end_date: `${e.target.value}T00:00:00`,
              })
            }
          />
        </Label>
      </div>

      <div style={{ display: 'flex', gap: '20px', alignItems: 'flex-end' }}>
        <Label width="500px">
          <SignPostCode setForm={setFirstInfo} />
          <Input
            type="text"
            value={region}
            onChange={e =>
              setFirstInfo({ ...firstInfo, region: e.target.value })
            }
          ></Input>
        </Label>

        <Label>
          가격
          <div>
            <Input
              style={{ width: '110px' }}
              value={price}
              onChange={e =>
                setFirstInfo({ ...firstInfo, price: parseInt(e.target.value) })
              }
            />
            원
          </div>
        </Label>
      </div>

      <div style={{ display: 'flex', gap: '20px' }}>
        <Label width="200px">
          은행
          <Select
            style={{ height: '46px', marginTop: '4px' }}
            value={bank_name}
            onChange={e =>
              setFirstInfo({ ...firstInfo, bank_name: e.target.value })
            }
          >
            <option>선택하세요</option>
            {BANK_NAMES.map((option, index) => (
              <option key={index} value={option}>
                {option}
              </option>
            ))}
          </Select>
        </Label>
        <Label width="200px">
          예금주
          <Input
            value={account_name}
            onChange={e =>
              setFirstInfo({ ...firstInfo, account_name: e.target.value })
            }
          />
        </Label>
        <Label width="200px">
          계좌번호
          <Input
            value={account_number}
            onChange={e =>
              setFirstInfo({ ...firstInfo, account_number: e.target.value })
            }
          />
        </Label>
      </div>
      <Button onClick={handleUpdateFirstStep}>수정하기</Button>
    </div>
  );
};

export default EditFirstStep;

const Title = styled.h3`
  text-align: center;
  font-size: 32px;
  font-weight: bold;
`;

const Label = styled.label<{ width?: string }>`
  display: flex;
  flex-direction: column;
  width: ${props => (props.width ? props.width : '100%')};
`;

const Input = styled.input`
  border: 1px solid lightgray;
  padding: 10px;
  border-radius: 10px;
  outline: none;
  margin-top: 4px;
  &:focus {
    border-color: green;
  }
`;

const TextArea = styled.textarea`
  border: 1px solid lightgray;
  padding: 10px;
  border-radius: 10px;
  resize: none;
  height: 180px;
  margin-top: 4px;
  outline: none;
  &:focus {
    border-color: green;
  }
`;

const Select = styled.select`
  border: 1px solid lightgray;
  border-radius: 10px;
  padding: 10px;
  outline: none;
  &:focus {
    border-color: green;
  }
`;

const Image = styled.img`
  border: 1px solid lightgray;
  width: 200px;
  height: 200px;
`;

const InputImage = styled.input.attrs({
  type: 'file',
  accept: 'image/jpg, image/png, image/jpeg',
  name: '프로필 이미지 인풋',
})`
  /* display: none; */
`;

const Button = styled.button.attrs({ type: 'button' })`
  border: 1px solid lightgray;
  width: 50%;
  height: 54px;
  padding: 12px;
  border-radius: 10px;
  margin-top: 20px;
  margin-left: 25%;
  margin-bottom: 20px;
  &:hover {
    border-color: green;
  }
`;
