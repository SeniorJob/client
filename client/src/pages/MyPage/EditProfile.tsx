import { ChangeEvent, useState } from 'react';
import defaultImage from '../../assets/images/imageDefault.png';
import styled from 'styled-components';
import MyPageLayout from '../../components/MyPage/MyPageLayout';
import SignPostCode from '../../components/signup/SignPostCode';

const EditProfile = () => {
  const formData = new FormData();
  const [image, setImage] = useState(defaultImage);
  const [userDTO, setUserDTO] = useState({
    name: '',
    dateOfBirth: '',
    job: '',
    address: '',
    addressDetail: '',
    category: '',
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
  ];

  const handleChangeImage = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;

    if (files) {
      setImage(URL.createObjectURL(files[0]));
      formData.append('file', files[0]);
    }
  };

  const handleUpdateProfile = () => {
    const { name, job, dateOfBirth, category, address, addressDetail } =
      userDTO;
    console.log(userDTO);
    formData.append(
      'userDto',
      JSON.stringify({
        name,
        job,
        dateOfBirth,
        category,
        address: address + ' ' + addressDetail,
      }),
    );
  };

  return (
    <MyPageLayout>
      <Form>
        <Label>
          <Image src={image} alt="프로필 이미지" />
          <InputImage type="file" onChange={handleChangeImage} />
        </Label>
        <Label>
          이름
          <Input
            placeholder="예) 홍길동"
            onChange={e => setUserDTO({ ...userDTO, name: e.target.value })}
          />
        </Label>
        <Label>
          <SignPostCode setForm={setUserDTO} />
          <Input
            type="text"
            value={userDTO.address}
            onChange={e => setUserDTO({ ...userDTO, address: e.target.value })}
          ></Input>
        </Label>
        <Label>
          상세주소
          <Input
            onChange={e =>
              setUserDTO({ ...userDTO, addressDetail: e.target.value })
            }
          />
        </Label>
        <Label>
          생일
          <Input
            type="date"
            onChange={e =>
              setUserDTO({ ...userDTO, dateOfBirth: e.target.value })
            }
          />
        </Label>
        <Label>
          직업
          <Select
            onChange={e => setUserDTO({ ...userDTO, job: e.target.value })}
          >
            <option>선택하세요</option>
            {jobOptions.map((option, index) => (
              <option key={index} value={option}>
                {option}
              </option>
            ))}
          </Select>
        </Label>
        <Label>
          관심 카테고리
          <Select
            onChange={e => setUserDTO({ ...userDTO, category: e.target.value })}
          >
            <option>선택하세요</option>
            {interestCategoryOption.map((option, index) => (
              <option key={index} value={option}>
                {option}
              </option>
            ))}
          </Select>
        </Label>

        <Button type="button" onClick={handleUpdateProfile}>
          프로필 정보 변경
        </Button>
      </Form>
    </MyPageLayout>
  );
};

export default EditProfile;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
`;

const Image = styled.img`
  border: 1px solid lightgray;
  border-radius: 50%;
  width: 200px;
  height: 200px;
`;

const InputImage = styled.input.attrs({
  type: 'file',
  accept: 'image/jpg, image/png, image/jpeg',
  name: '프로필 이미지 인풋',
})`
  display: none;
`;

const Label = styled.label`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  border: 1px solid lightgray;
  width: 320px;
  padding: 12px;
  margin-top: 6px;
`;

const Select = styled.select`
  border: 1px solid lightgray;
  width: 320px;
  height: 54px;
  padding: 12px;
  margin-top: 6px;
`;

const Button = styled.button`
  border: 1px solid #16aa16;
  width: 320px;
  height: 54px;
  padding: 12px;
  color: #161616;
`;
