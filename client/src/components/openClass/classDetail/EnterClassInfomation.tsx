import ImageUploader from '../../../utils/ImageUploader';
import MadeCalendar from '../../../utils/Calendar';
import { OneLineTextBox, TextBox } from '../../../utils/TextBox';
import LectureCountInput from '../../../utils/CountInput';
import { OpenButton } from '../OpenButton';
import { FC, useState } from 'react';
import styled from 'styled-components';
import DaumPostcode from 'react-daum-postcode';
import { Modal } from './Modal';
import tw from 'tailwind-styled-components';

const Container = styled.div``;

const SubTitle = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
  padding-top: 10px;
`;

const SelectArea = styled.div``;

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
  m-2

  hover:
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
  ];

  const [address, setAddress] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

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
    setIsModalOpen(false);
  };

  return (
    <>
      <Container>
        <SelectArea>
          <SubTitle>카테고리 선택</SubTitle>
          <form>
            <SelectCategory name="category" id="category">
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
          <ImageUploader />
        </SelectArea>
        <SelectArea>
          <SubTitle>강좌 제목</SubTitle>
          <OneLineTextBox
            maxLength={30}
            placeholder="ex) 강좌 제목을 입력해주세요. (30자 이하)"
          />
        </SelectArea>
        <SelectArea>
          <SubTitle>강좌 소개</SubTitle>
          <TextBox
            maxLength={200}
            placeholder="ex) 강좌의 목적 또는 학습목표의 내용을 간략하게 기재해 다른 사람들에게 소개해보세요! (200자 이하)"
          ></TextBox>
        </SelectArea>
        <SelectArea>
          <SubTitle>학습 대상</SubTitle>
          <OneLineTextBox
            maxLength={30}
            placeholder="ex) 음식을 좋아하는 누구나! (30자 이하)"
          />
        </SelectArea>
        <SelectArea>
          <SubTitle>강좌 날짜 선택</SubTitle>
          <MadeCalendar />
          <LectureCountInput
            labelTitle="강의 회차: "
            labelText="한 주에 실시되는 강좌의 횟수를 알려주세요!"
          />
        </SelectArea>
        <SelectArea>
          <SubTitle>최대 참가자 수</SubTitle>
          <LectureCountInput labelText="강좌에 참가할 수 있는 최대 인원을 설정해주세요!" />
        </SelectArea>
        <SelectArea>
          <SubTitle>지역</SubTitle>
          <div className="flex">
            <OneLineTextBox
              value={address}
              placeholder="ex) 경기도 안양시 만안구 삼덕로 37번길 22"
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
          <OneLineTextBox placeholder="ex) 15000" />
        </SelectArea>
        <SelectArea>
          <SubTitle>은행</SubTitle>
          <OneLineTextBox placeholder="ex) 은행을 입력해주세요" />
        </SelectArea>
        <SelectArea>
          <SubTitle>예금주</SubTitle>
          <OneLineTextBox placeholder="ex) 신이어" />
        </SelectArea>
        <SelectArea>
          <SubTitle>계좌번호</SubTitle>
          <OneLineTextBox placeholder="ex) '-' 없이 입력해주세요" />
        </SelectArea>
        <OpenButton onClick={() => nextTab()}>다음으로</OpenButton>
      </Container>
    </>
  );
};

export default EnterClassInfomation;
