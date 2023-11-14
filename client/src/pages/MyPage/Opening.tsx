import styled from 'styled-components';
import MyPageLayout from '../../components/MyPage/MyPageLayout';
import FilterBar from '../../components/MyPage/FilterBar';
import { Link } from 'react-router-dom';
import MyPageTitle from '../../components/MyPage/MyPageTitle';
import { useEffect, useState } from 'react';
import CardList from '../../components/MyPage/LectureCard/CardList';
import { useLecturesStore } from '../../store/user';
import { getOpeningLectures } from '../../api/mypage';
import { useSearchParams } from 'react-router-dom';
import Pagination from '../../components/MyPage/Pagination';

const Opening = () => {
  const { myOpeningLectures, setMyOpeningLectures } = useLecturesStore();
  const [searchParams] = useSearchParams();
  const [totalPage, setTotalPage] = useState<number | null>();
  const [page, setPage] = useState<number>(1);
  const curPage = searchParams.get('page') as string;

  useEffect(() => {
    curPage && setPage(parseInt(curPage));

    const handleGetOpeningLectures = async () => {
      const params = searchParams.toString();
      const res = await getOpeningLectures(params);

      if (res.status === 200) {
        setMyOpeningLectures(res.data.content);
        setTotalPage(res.data.totalPages);
      } else {
        setMyOpeningLectures([]);
        setTotalPage(null);
        curPage ? setPage(parseInt(curPage)) : setPage(1);
      }
    };

    handleGetOpeningLectures();
  }, [curPage, searchParams, setMyOpeningLectures]);

  return (
    <MyPageLayout>
      <MyPageTitle title="개설" />
      <RecommendDiv>
        새로운 강좌에 참여하고 싶은신가요?
        <RecommendLink to="/lectures">강좌 탐색하기</RecommendLink>
      </RecommendDiv>

      <FilterBar type="개설" />

      <CardList type="개설" lectures={myOpeningLectures} />
      {totalPage && (
        <Pagination totalPages={totalPage} page={page} setPage={setPage} />
      )}
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
