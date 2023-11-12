import styled from 'styled-components';
import MyPageLayout from '../../components/MyPage/MyPageLayout';
import FilterBar from '../../components/MyPage/FilterBar';
import { Link } from 'react-router-dom';
import MyPageTitle from '../../components/MyPage/MyPageTitle';
import { useEffect } from 'react';
import CardList from '../../components/MyPage/LectureCard/CardList';
import { useLecturesStore } from '../../store/user';
import { getOpeningLectures } from '../../api/mypage';
import { useSearchParams } from 'react-router-dom';

const Opening = () => {
  const { myLectures, setMyLectures } = useLecturesStore();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const handleGetOpeningLectures = async () => {
      const params = searchParams.toString();
      const res = await getOpeningLectures(params);
      setMyLectures(res);
    };
    handleGetOpeningLectures();
  }, [searchParams, setMyLectures]);

  return (
    <MyPageLayout>
      <MyPageTitle title="개설" />
      <RecommendDiv>
        새로운 강좌에 참여하고 싶은신가요?
        <RecommendLink to="">강좌 탐색하기</RecommendLink>
      </RecommendDiv>

      <FilterBar />

      <CardList lectures={myLectures} />
    </MyPageLayout>
  );
};

export default Opening;

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
  border: 1px solid gray;
  color: gray;
  padding: 10px;
  border-radius: 10px;
  font-size: 14px;
  font-weight: 700;
  &:hover {
    border-color: green;
    color: green;
  }
`;
