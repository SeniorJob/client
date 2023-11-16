import ImageUploader from '../../../utils/ImageUploader';
import Calendar from '../../../utils/Calendar';
import { OneLineTextBox, TextBox } from '../../../utils/TextBox';
import LectureCountInput from '../../../utils/CountInput';
import { OpenButton } from '../OpenButton';
import { FC, useState } from 'react';
import styled from 'styled-components';
import DaumPostcode from 'react-daum-postcode';
import { Modal } from './Modal';
import tw from 'tailwind-styled-components';
import axios from 'axios';
import { AxiosError } from 'axios';
import useCreateClass from '../../../store/createClass';

const Container = styled.div``;

const SubTitle = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
`;

const SelectArea = styled.div`
  margin: 1rem 0;
  display: flex;
  gap: 1rem;
`;

const SelectCategory = styled.select`
  font-size: 1.3rem;
  border: 1px solid black;
  border-radius: 10px;
`;

interface EnterClassInfomationProps {
  nextTab: () => void;
}

interface AddressData {
  address: string;
  addressType: string;
  bname: string;
  buildingName: string;
}

const SearchAddressBtn = tw.button`
  bg-signature
  p-2
  rounded-xl
  h-[50px]

  hover:text-red-500
`;

const EnterClassInfomation: FC<EnterClassInfomationProps> = ({ nextTab }) => {
  const category = [
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
    '기타',
  ];

  const [address, setAddress] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [selectedCategory, setSelectedCategory] = useState('외식');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [learningTarget, setLearningTarget] = useState('');
  const [week, setWeek] = useState(0);
  const [recruitEndDate, setRecruitEndDate] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [maxParticipants, setMaxParticipants] = useState(0);
  const [region, setRegion] = useState('');
  const [price, setPrice] = useState<number>(0);
  const [bankName, setBankName] = useState('');
  const [accountName, setAccountName] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [selectedImage, setSelectedImage] = useState<File | null>(null);

  const { setCreateId } = useCreateClass();

  const handleAddress = (data: AddressData) => {
    let fullAddress = data.address;
    let extraAddress = '';

    if (data.addressType === 'R') {
      if (data.bname !== '') {
        extraAddress += data.bname;
      }
      if (data.buildingName !== '') {
        extraAddress +=
          extraAddress !== '' ? `, ${data.buildingName}` : data.buildingName;
      }
      fullAddress += extraAddress !== '' ? ` (${extraAddress})` : '';
    }

    setAddress(fullAddress);
    setRegion(data.address);
    setIsModalOpen(false);
  };

  const handleSubmit = async () => {
    const data = new FormData();
    const lectureDto = {
      category: selectedCategory,
      title: title,
      content: content,
      learning_target: learningTarget,
      week: week,
      recruitEnd_date: recruitEndDate + 'T00:00:00',
      start_date: startDate + 'T00:00:00',
      end_date: endDate + 'T00:00:00',
      max_participants: maxParticipants,
      region: region,
      price: price,
      bank_name: bankName,
      account_name: accountName,
      account_number: accountNumber,
    };
    data.append('lectureDto', JSON.stringify(lectureDto));

    if (selectedImage) {
      data.append('file', selectedImage);
    }

    const apiUrl = import.meta.env.VITE_API_URL + '/api/lectures/create';
    console.log(lectureDto);
    console.log(selectedImage);

    if (!apiUrl) {
      console.error('환경변수 설정 에러');
      return;
    }
    if (!selectedImage) {
      alert('강좌 대표 이미지를 선택해주세요!');
      return;
    }
    if (!selectedCategory) {
      alert('카테고리를 선택해주세요!');
      return;
    }
    if (!title) {
      alert('제목을 입력해주세요!');
      return;
    }
    if (!content) {
      alert('강좌소개을 입력해주세요!');
      return;
    }
    if (!learningTarget) {
      alert('학습대상을 입력해주세요!');
      return;
    }
    if (!week) {
      alert('주차별 횟수를 입력해주세요!');
      return;
    }
    if (week < 1 || week > 5) {
      alert('주차별 횟수는 1회이상 5회 이하로 설정해 주세요');
      return;
    }
    if (!recruitEndDate) {
      alert('모집 마감 날짜를 입력해주세요!');
      return;
    }
    if (!startDate) {
      alert('시작 날짜를 입력해주세요!');
      return;
    }
    if (!endDate) {
      alert('종료 날짜를 입력해주세요!');
      return;
    }
    if (!maxParticipants) {
      alert('최대 인원 수를 입력해주세요!');
      return;
    }
    if (!region) {
      alert('지역을 입력해주세요!');
      return;
    }
    if (!price) {
      alert('가격을 입력해주세요!');
      return;
    }
    if (!bankName) {
      alert('은행명을 입력해주세요!');
      return;
    }
    if (!accountName) {
      alert('계좌주를 입력해주세요!');
      return;
    }
    if (!accountNumber) {
      alert('계좌번호를 입력해주세요!');
      return;
    }

    try {
      const accessToken = localStorage.getItem('accessToken');
      const res = await axios.post(apiUrl, data, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      console.log(res.data);
      const createId = res.data.create_id;
      console.log(createId);
      setCreateId(createId);
      nextTab();
    } catch (err) {
      const error = err as AxiosError;
      if (error.response) {
        const data = error.response.data as { errorMessage: string };
        console.log(data.errorMessage);
        alert(data.errorMessage);
      } else if (error.request) {
        console.log(error.request);
        alert('서버에서 응답이 없습니다.');
      } else {
        console.log('Error', error.message);
        alert(error.message);
      }
    }
  };

  return (
    <>
      <Container>
        <SelectArea>
          <SubTitle>카테고리 선택</SubTitle>
          <form className="flex items-center">
            <SelectCategory
              name="category"
              id="category"
              onChange={e => setSelectedCategory(e.target.value)}
            >
              {category.map((item, index) => (
                <option key={index} value={item}>
                  {item}
                </option>
              ))}
            </SelectCategory>
          </form>
        </SelectArea>
        <SelectArea>
          <SubTitle>강좌 대표 이미지</SubTitle>
          <ImageUploader setSelectedImage={setSelectedImage} />
        </SelectArea>
        <SelectArea>
          <SubTitle>강좌 제목</SubTitle>
          <OneLineTextBox
            maxLength={30}
            placeholder="ex) 강좌 제목을 입력해주세요. (30자 이하)"
            onChange={e => setTitle(e.target.value)}
          />
        </SelectArea>
        <SelectArea>
          <SubTitle>강좌 소개</SubTitle>
          <TextBox
            maxLength={200}
            placeholder="ex) 강좌의 목적 또는 학습목표의 내용을 간략하게 기재해 다른 사람들에게 소개해보세요! (200자 이하)"
            onChange={e => setContent(e.target.value)}
          ></TextBox>
        </SelectArea>
        <SelectArea>
          <SubTitle>학습 대상</SubTitle>
          <OneLineTextBox
            maxLength={30}
            placeholder="ex) 음식을 좋아하는 누구나! (30자 이하)"
            onChange={e => setLearningTarget(e.target.value)}
          />
        </SelectArea>
        <div className="mt-4">
          <SubTitle>강좌 날짜 선택</SubTitle>
          <div>
            <Calendar
              recruitEndDate={recruitEndDate}
              startDate={startDate}
              endDate={endDate}
              setRecruitEndDate={setRecruitEndDate}
              setStartDate={setStartDate}
              setEndDate={setEndDate}
            />
            <LectureCountInput
              labelTitle="강의 회차: "
              labelText="한 주에 실시되는 강좌의 횟수를 알려주세요!"
              setCount={setWeek}
            />
          </div>
        </div>
        <SelectArea>
          <SubTitle>최대 참가자 수</SubTitle>
          <LectureCountInput
            labelText="강좌에 참가할 수 있는 최대 인원을 설정해주세요!"
            setCount={setMaxParticipants}
          />
        </SelectArea>
        <SelectArea className="flex">
          <SubTitle>지역</SubTitle>
          <div className="flex w-3/4 gap-2">
            <OneLineTextBox
              value={address}
              placeholder="ex) 경기도 안양시 만안구 삼덕로 37번길 22"
              onClick={() => setIsModalOpen(true)}
            />
            <SearchAddressBtn onClick={() => setIsModalOpen(true)}>
              주소 검색
            </SearchAddressBtn>
          </div>
          <Modal isOpen={isModalOpen} close={() => setIsModalOpen(false)}>
            <DaumPostcode onComplete={handleAddress} />
          </Modal>
        </SelectArea>
        <SelectArea>
          <SubTitle>가격</SubTitle>
          <div className="w-3/4">
            <OneLineTextBox
              placeholder="ex) 15000"
              onChange={e => setPrice(parseInt(e.target.value))}
            />
          </div>
        </SelectArea>
        <SelectArea>
          <SubTitle>은행</SubTitle>
          <div className="w-3/4">
            <OneLineTextBox
              placeholder="ex) 은행을 입력해주세요"
              onChange={e => setBankName(e.target.value)}
            />
          </div>
        </SelectArea>
        <SelectArea>
          <SubTitle>예금주</SubTitle>
          <div className="w-3/4">
            <OneLineTextBox
              placeholder="ex) 신이어"
              onChange={e => setAccountName(e.target.value)}
            />
          </div>
        </SelectArea>
        <SelectArea>
          <SubTitle>계좌번호</SubTitle>
          <div className="w-3/4">
            <OneLineTextBox
              placeholder="ex) '-' 없이 입력해주세요"
              onChange={e => setAccountNumber(e.target.value)}
            />
          </div>
        </SelectArea>
        <OpenButton onClick={handleSubmit}>다음으로</OpenButton>
      </Container>
    </>
  );
};

export default EnterClassInfomation;
