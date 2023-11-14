import { Link } from 'react-router-dom';
import MyPageLayout from '../../components/MyPage/MyPageLayout';
import styled from 'styled-components';
import MyPageTitle from '../../components/MyPage/MyPageTitle';
import { getApplicationLectures } from '../../api/mypage';
import { useEffect, useState } from 'react';
import FilterBar from '../../components/MyPage/FilterBar';
import CardList from '../../components/MyPage/LectureCard/CardList';
import { useSearchParams } from 'react-router-dom';
import { useLecturesStore } from '../../store/user';
import Pagination from '../../components/MyPage/Pagination';

const Application = () => {
  const { myApplicationLectures, setMyApplicationLectures } =
    useLecturesStore();
  const [searchParams] = useSearchParams();
  const [totalPage, setTotalPage] = useState<number | null>();
  const [page, setPage] = useState<number>(1);
  const curPage = searchParams.get('page') as string;

  useEffect(() => {
    curPage && setPage(parseInt(curPage));

    const handleGetApplicationLectures = async () => {
      const params = searchParams.toString();
      const res = await getApplicationLectures(params);

      if (res.status === 200) {
        setMyApplicationLectures(res.data.content);
        setTotalPage(res.data.totalPages);
      } else {
        setMyApplicationLectures([]);
        setTotalPage(null);
        curPage ? setPage(parseInt(curPage)) : setPage(1);
      }
    };
    handleGetApplicationLectures();
  }, [curPage, searchParams, setMyApplicationLectures]);

  return (
    <MyPageLayout>
      <MyPageTitle title="신청" />
      <RecommendDiv>
        새로운 강좌에 참여하고 싶은신가요?
        <RecommendLink to="/lectures">강좌 탐색하기</RecommendLink>
      </RecommendDiv>

      <FilterBar type="신청" />

      <CardList type="신청" lectures={myApplicationLectures} />

      {totalPage && (
        <Pagination totalPages={totalPage} page={page} setPage={setPage} />
      )}
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
