import tw from 'tailwind-styled-components';
import ImageUploader from '../../utils/ImageUploader';
import 'react-calendar/dist/Calendar.css';
import MadeCalendar from './Calendar';
import { OneLineTextBox, TextBox } from '../../utils/TextBox';

const Container = tw.div`
    m-4
    p-4

    bg-signature
`;

const SubTitle = tw.div`
    text-lg
`;

const SelectArea = tw.div`
    mb-8
`;

const OpenClassDetail = () => {
  return (
    <>
      <Container>
        <SelectArea>
          <SubTitle>카테고리 선택</SubTitle>
          <form>
            <select name="category" id="category">
              <option value="외식">외식</option>
              <option value="서비스">서비스</option>
              <option value="사무직">사무직</option>
            </select>
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
            placeholder="강좌 제목을 입력해주세요. (30자 이하)"
          />
        </SelectArea>
        <SelectArea>
          <SubTitle>강좌 소개</SubTitle>
          <TextBox
            maxLength={200}
            placeholder="강좌의 목적 또는 학습목표의 내용을 간략하게 기재해 다른 사람들에게 소개해보세요! (200자 이하)"
          ></TextBox>
        </SelectArea>
        <SelectArea>
          <SubTitle>학습 대상</SubTitle>
          <OneLineTextBox
            maxLength={30}
            placeholder="예) 음식을 좋아하는 누구나! (30자 이하)"
          />
        </SelectArea>
        <SelectArea>
          <SubTitle>강좌 날짜 선택</SubTitle>
          <MadeCalendar />
        </SelectArea>
        <SelectArea>
          <SubTitle>최대 참가자 수</SubTitle>
        </SelectArea>
        <SelectArea>
          <SubTitle>지역</SubTitle>
        </SelectArea>
        <SelectArea>
          <SubTitle>가격</SubTitle>
        </SelectArea>
        <SelectArea>
          <SubTitle>은행</SubTitle>
        </SelectArea>
        <SelectArea>
          <SubTitle>계좌이름</SubTitle>
        </SelectArea>
        <SelectArea>
          <SubTitle>계좌번호</SubTitle>
        </SelectArea>
      </Container>
    </>
  );
};

export default OpenClassDetail;
