import { useEffect, useState } from 'react';
import MyPageLayout from '../../components/MyPage/MyPageLayout';
import MyPageTitle from '../../components/MyPage/MyPageTitle';
import { getSuggestionLectures } from '../../api/mypage';
import FilterBar from '../../components/MyPage/FilterBar';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useLecturesStore } from '../../store/user';
import { useSearchParams } from 'react-router-dom';
import CardList from '../../components/MyPage/LectureCard/CardList';
import Pagination from '../../components/MyPage/Pagination';

const Suggestion = () => {
  const { mySuggestionLectures, setMySuggestionLectures } = useLecturesStore();
  const [searchParams] = useSearchParams();
  const [totalPage, setTotalPage] = useState<number | null>();
  const [page, setPage] = useState<number>(1);
  const curPage = searchParams.get('page') as string;

  useEffect(() => {
    curPage && setPage(parseInt(curPage));

    const handleGetOpeningLectures = async () => {
      const params = searchParams.toString();
      const res = await getSuggestionLectures(params);

      if (res.status === 200) {
        setMySuggestionLectures(res.data.content);
        setTotalPage(res.data.totalPages);
      } else {
        setMySuggestionLectures([]);
        setTotalPage(null);
        curPage ? setPage(parseInt(curPage)) : setPage(1);
      }
    };
    handleGetOpeningLectures();
  }, [curPage, searchParams, setMySuggestionLectures]);

  return (
    <MyPageLayout>
      <MyPageTitle title="제안" />
      <RecommendDiv>
        새로운 강좌에 참여하고 싶은신가요?
        <RecommendLink to="/lectures">강좌 탐색하기</RecommendLink>
      </RecommendDiv>

      <FilterBar type="제안" />

      <CardList type="제안" sugLectures={mySuggestionLectures} />
      {totalPage && (
        <Pagination totalPages={totalPage} page={page} setPage={setPage} />
      )}
    </MyPageLayout>
  );
};

export default Suggestion;

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
