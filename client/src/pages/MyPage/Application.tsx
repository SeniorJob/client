import { Link } from 'react-router-dom';
import MyPageLayout from '../../components/MyPage/MyPageLayout';
import styled from 'styled-components';
import LectureCardList from '../../components/MyPage/LectureCard/LectureCardList';
import FilterBar from '../../components/MyPage/FilterBar';
import MyPageTitle from '../../components/MyPage/MyPageTitle';

const Application = () => {
  return (
    <MyPageLayout>
      <MyPageTitle />

      <RecommendDiv>
        새로운 강좌에 참여하고 싶은신가요?
        <RecommendLink to="">강좌 탐색하기</RecommendLink>
      </RecommendDiv>

      <FilterBar />
      <LectureCardList />
    </MyPageLayout>
  );
};

export default Application;

const RecommendDiv = styled.div`
  border: 1px solid lightgray;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 16px;
  margin-top: 20px;
  border-radius: 10px;
  font-size: 18px;
`;

const RecommendLink = styled(Link)`
  background-color: #70e270;
  padding: 10px;
  border-radius: 10px;
  font-size: 14px;
  font-weight: 700;
`;
