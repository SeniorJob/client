import styled from 'styled-components';
import Location from '../../../assets/images/location.svg';
import Applicant from '../../../assets/images/IdIcon.svg';

interface LectureCard_I {
  type?: '제안';
}

const LectureCard = ({ type }: LectureCard_I) => {
  return type !== '제안' ? (
    <Container>
      <UpperWrapper>
        <Title>대세는 먹방</Title>
        <CategoryStatusWrapper>
          <Category>외식</Category>
          <Status>모집중</Status>
        </CategoryStatusWrapper>
        {/* 내가 개설한 강좌일 때 */}
        <AdminButton>수정하기 | 삭제하기</AdminButton>
      </UpperWrapper>

      <Region>
        <RegionImage src={Location} alt="위치 아이콘" />
        경기도 안양시 만안구
      </Region>

      <Date>23/10/27 ~ 23/11/27</Date>
      <Price>\ 12,000</Price>

      <ApplicationWrapper>
        <CurrentApplicant>
          <ApplicantImage src={Applicant} />
          현재신청자 50/50
        </CurrentApplicant>
        {/* 내가 개설한 강좌가 아닐 때 */}
        <Cancel>신청취소하기</Cancel>
      </ApplicationWrapper>
    </Container>
  ) : (
    <Container>
      <UpperWrapper>
        <Title>대세는 먹방</Title>
        <CategoryStatusWrapper>
          <Category>외식</Category>
        </CategoryStatusWrapper>
        <AdminButton>수정하기 | 삭제하기</AdminButton>
      </UpperWrapper>

      <SuggestionContent>
        3줄 이상 생략
        내용이들어감내용이들어감내용이들어감내용이들어감내용이들어감내용이들어감
        내용이들어감내용이들어감내용이들어감내용이들어감내용이들어감내용이들어감
      </SuggestionContent>

      <Region>
        <RegionImage src={Location} alt="위치 아이콘" />
        경기도 안양시 만안구
      </Region>
      <Date>23/10/27 ~ 23/11/27</Date>
    </Container>
  );
};

export default LectureCard;

const Container = styled.li`
  border: 1px solid lightgray;
  border-radius: 10px;
  padding: 18px 24px;
`;

const UpperWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;
const Title = styled.h3`
  font-size: 24px;
  font-weight: bold;
  margin-right: 12px;
`;

const CategoryStatusWrapper = styled.div`
  display: flex;
  gap: 10px;
  font-size: 14px;
`;
const Category = styled.div`
  border: 1px solid black;
  padding: 4px 8px;
  border-radius: 10px;
`;
const Status = styled.div`
  border: 1px solid black;
  padding: 4px 8px;
  border-radius: 10px;
`;
const AdminButton = styled.div`
  position: absolute;
  right: 0;
  top: 0;
  font-size: 14px;
`;

const Region = styled.div`
  display: flex;
  align-items: center;
  font-size: 18px;
  margin-top: 6px;
`;
const RegionImage = styled.img`
  width: 24px;
  height: 24px;
`;

const Date = styled.div`
  margin-left: 24px;
  font-size: 14px;
`;

const Price = styled.div`
  margin: 4px 0 0 6px;
  font-size: 20px;
`;

const ApplicationWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
`;
const CurrentApplicant = styled.div`
  display: flex;
  align-items: center;
`;
const ApplicantImage = styled.img`
  height: 24px;
  margin-right: 4px;
`;

const Cancel = styled.button.attrs({ type: 'button' })`
  border: 1px solid gray;
  padding: 4px 6px;
  border-radius: 10px;
`;

const SuggestionContent = styled.div`
  border: 1px solid lightgray;
  margin-top: 8px;
  padding: 4px 6px;
  height: 80px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
`;
