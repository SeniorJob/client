import { useEffect } from 'react';
import styled from 'styled-components';
import defaultImage from '../../../assets/images/imageDefault.png';
import { ChangeEvent, useState } from 'react';
import SignPostCode from '../../signup/SignPostCode';
import { Link } from 'react-router-dom';
import { useUserStore } from '../../../store/user';
import {
  INTEREST_CATEGORY_OPTIONS,
  JOB_OPTIONS,
} from '../../../constants/Profile';
import { getProfile, updateProfile } from '../../../api/mypage';
import { useNavigate } from 'react-router-dom';

interface ProfileInfo_I {
  mode?: '수정';
}

interface UserDTO_I {
  name: string | undefined;
  dateOfBirth: string | undefined;
  job: string | undefined;
  address: string | undefined;
  // addressDetail: string | undefined;
  category: string | undefined;
}

const ProfileInfo = ({ mode }: ProfileInfo_I) => {
  const navigate = useNavigate();
  const userStore = useUserStore();
  const userDetail = userStore.userDetail;

  const formData = new FormData();
  const [image, setImage] = useState(
    userDetail.imgKey ? userDetail.imgKey : defaultImage,
  );
  const [selectedImage, setSelectedImage] = useState<string | Blob>(image);
  const [userDTO, setUserDTO] = useState<UserDTO_I>({
    name: undefined,
    dateOfBirth: undefined,
    job: undefined,
    address: undefined,
    // addressDetail: undefined,
    category: undefined,
  });

  useEffect(() => {
    const { name, dateOfBirth, job, region, category } = userDetail;
    setUserDTO(prev => {
      return {
        ...prev,
        name,
        dateOfBirth,
        job,
        address: region,
        category,
      };
    });
  }, []);

  const handleChangeImage = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;

    if (files) {
      setImage(URL.createObjectURL(files[0]));
      setSelectedImage(files[0]);
    }
  };

  const handleGetProfile = async () => {
    const info = await getProfile();
    // 빌드 오류로 인해 임시 수정하였습니다
    // 수정 전 코드
    // userStore.setUserDetail(info);
    if (info !== undefined) userStore.setUserDetail(info);
  };

  const handleUpdateProfile = async () => {
    const { name, job, dateOfBirth, category, address } = userDTO;
    formData.append('file', selectedImage);
    formData.append(
      'userDto',
      JSON.stringify({
        name,
        job,
        dateOfBirth,
        category,
        region: address,
      }),
    );
    const res = await updateProfile(formData);
    await handleGetProfile();
    res.status === 200 && navigate('/mypage');
  };

  return (
    <Form>
      <Label>
        <Image src={image} alt="프로필 이미지" />
        {mode === '수정' && (
          <InputImage type="file" onChange={handleChangeImage} />
        )}
      </Label>
      <Label>
        이름
        <Input
          disabled={mode !== '수정'}
          defaultValue={userDTO.name}
          onChange={e => setUserDTO({ ...userDTO, name: e.target.value })}
        />
      </Label>
      <Label>
        {mode === '수정' ? <SignPostCode setForm={setUserDTO} /> : '주소'}
        <Input
          disabled={mode !== '수정'}
          type="text"
          defaultValue={userDTO.address}
          onChange={e => setUserDTO({ ...userDTO, address: e.target.value })}
        ></Input>
      </Label>
      {/* <Label>
        상세주소
        <Input
          disabled={mode !== '수정'}
          onChange={e =>
            setUserDTO({ ...userDTO, addressDetail: e.target.value })
          }
        />
      </Label> */}
      <Label>
        생일
        <Input
          disabled={mode !== '수정'}
          type="date"
          value={userDTO.dateOfBirth}
          onChange={e =>
            setUserDTO({ ...userDTO, dateOfBirth: e.target.value })
          }
        />
      </Label>
      <Label>
        직업
        <Select
          disabled={mode !== '수정'}
          onChange={e => setUserDTO({ ...userDTO, job: e.target.value })}
        >
          <option>선택하세요</option>
          {JOB_OPTIONS.map((option, index) => (
            <option
              key={index}
              value={option}
              selected={option === userDTO.job}
            >
              {option}
            </option>
          ))}
        </Select>
      </Label>
      <Label>
        관심 카테고리
        <Select
          disabled={mode !== '수정'}
          onChange={e => setUserDTO({ ...userDTO, category: e.target.value })}
        >
          <option>선택하세요</option>
          {INTEREST_CATEGORY_OPTIONS.map((option, index) => (
            <option
              key={index}
              value={option}
              selected={option === userDTO.category}
            >
              {option}
            </option>
          ))}
        </Select>
      </Label>

      {mode === '수정' ? (
        <div style={{ display: 'flex', width: '320px', gap: '10px' }}>
          <Button type="button" onClick={handleUpdateProfile}>
            변경 완료
          </Button>
          <LinkButton
            to="/mypage"
            style={{
              border: '1px solid lightgray',
            }}
          >
            취소
          </LinkButton>
        </div>
      ) : (
        <LinkButton to="/mypage/editprofile">프로필 정보 변경</LinkButton>
      )}
    </Form>
  );
};

export default ProfileInfo;

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

const LinkButton = styled(Link)`
  border: 1px solid #16aa16;
  width: 320px;
  height: 54px;
  padding: 12px;
  text-align: center;
`;
