import tw from 'tailwind-styled-components';

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

const OneLineTextBox = tw.textarea`
    ml-4
    p-2
    w-3/4
    resize-none
    h-10
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
        {/* TODO: 추후 추가 */}
        <SelectArea>
          <SubTitle>강좌 대표 이미지</SubTitle>
        </SelectArea>

        <SelectArea>
          <SubTitle>강좌 제목</SubTitle>
          <OneLineTextBox
            onKeyDown={(e: React.KeyboardEvent<HTMLTextAreaElement>) => {
              if (
                e.key === 'Enter' ||
                (e.currentTarget.value.length >= 30 && e.key !== 'Backspace')
              ) {
                e.preventDefault(); // 엔터 입력 방지 및 30자 초과 입력 방지
              }
            }}
            placeholder="강좌 제목을 입력해주세요. 30자 이하"
          />
        </SelectArea>
        <SelectArea>
          <SubTitle>강좌 소개</SubTitle>
        </SelectArea>
        <SelectArea>
          <SubTitle>학습 대상</SubTitle>
        </SelectArea>
        <SelectArea>
          <SubTitle>강좌 날짜 선택</SubTitle>
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
