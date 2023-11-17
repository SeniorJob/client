import styled from 'styled-components';
import { LectureData } from './LectureData';
import { SearchBar } from '../header/SearchBar';
import { LoadingSpinner } from './LoadingSpinner';
import { useState, useEffect } from 'react';
import { LectureObject } from '../../types/LectureTypes';
import { Nodata } from '../../pages/lectureList/NoData';
import { getLecture } from '../../api/lecture';
import { useLocation } from 'react-router-dom';
import { LectureFilter } from './LectureFilter';
import { LectureFooter } from './LectureFooter';
import { useSearchStore } from '../../store/store';

const Contents = styled.div`
  min-height: 700px;
  width: 100%;
`;

const LectureHeader = styled.header`
  display: flex;
  justify-content: space-between;
  margin-bottom: 1.5rem;
  .category {
    &::before {
      content: '/';
      font-weight: 400;
      margin-right: 12px;
    }
  }
`;

const LectureContainer = styled.div`
  min-height: 700px;
  position: relative;
  display: flex;
  align-content: flex-start;
  flex-wrap: wrap;
`;

const LectureItem = styled.div`
  width: 229px;
  padding: 0.3rem 0.4rem;
`;

const HeaderTitle = styled.h1`
  span {
    &:last-child {
      font-weight: 600;
    }
  }
`;

export const LectureContents = () => {
  const [data, setData] = useState<LectureObject[]>();
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number | null>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const location = useLocation();
  const searchParams = location.search;
  const searchParam = new URLSearchParams(location.search);
  const curCategory = searchParam.get('category');
  const curPage = Number(searchParam.get('page'));
  const { setInputValue } = useSearchStore();
  const curQuery = searchParam.get('title');

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const params = searchParams.toString();

        const lectureData = await getLecture(`filter${params}`);
        if (!lectureData) {
          setData([]);
          setTotalPages(null);
        } else {
          curPage ? setPage(curPage) : setPage(1);
          setData(lectureData.content);
          setTotalPages(lectureData.totalPages);
        }
      } catch (error) {
        console.error('에러 발생:', error);
      } finally {
        setIsLoading(false);
        curQuery && setInputValue(curQuery);
      }
    };

    fetchData();
  }, [searchParams, curPage, curQuery, setInputValue]);

  return (
    <Contents>
      <LectureHeader>
        <HeaderTitle className="text-xl flex gap-3">
          <span>전체 강의</span>
          {curCategory && <span className="category">{curCategory}</span>}
        </HeaderTitle>
        <SearchBar />
      </LectureHeader>
      <LectureFilter />
      <div>
        <LectureContainer>
          {isLoading ? (
            <LoadingSpinner />
          ) : data && data.length > 0 ? (
            data?.map(data => (
              <LectureItem key={data.create_id}>
                <LectureData data={data} />
              </LectureItem>
            ))
          ) : (
            <Nodata />
          )}
        </LectureContainer>
      </div>
      {/* 페이지네이션 */}
      {totalPages && (
        <LectureFooter totalPages={totalPages} page={page} setPage={setPage} />
      )}
    </Contents>
  );
};
