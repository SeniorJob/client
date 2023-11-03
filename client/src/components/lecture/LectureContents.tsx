import styled from 'styled-components';
import { LectureData } from './LectureData';
import { SearchBar } from '../header/SearchBar';
import { LoadingSpinner } from './LoadingSpinner';
import { useState, useEffect } from 'react';
import { LectureObject } from '../../types/LectureTypes';
import { Nodata } from '../../pages/lectureList/NoData';
import { getLecture } from '../../api/lecture';
import { useLocation } from 'react-router-dom';
import { useSearchStore } from '../../store/store';
import { LectureFilter } from './LectureFilter';

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
  flex-wrap: wrap;
`;

const LectureItem = styled.div`
  width: 25%;
  padding: 0.7rem 0.4rem;
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
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { category, filterMethod, descending } = useSearchStore();
  const location = useLocation();
  const searchParams = location.search;
  const searchParam = new URLSearchParams(location.search);
  const curCategory = searchParam.get('category');

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const params: { filter?: string; descending?: boolean } = {};
        if (filterMethod) params.filter = filterMethod;
        if (!descending) params.descending = descending; // descending의 기본값은 true이므로 false일때만 추가

        const lectureData = await getLecture(
          `lectures/filter${searchParams}`,
          params,
        );
        setData(lectureData);
      } catch (error) {
        console.error('에러 발생:', error);
      } finally {
        setTimeout(() => {
          setIsLoading(false); // .5초 후에 로딩 상태를 해제
        }, 200);
      }
    };

    fetchData();
  }, [searchParams, category, descending, filterMethod]);

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
    </Contents>
  );
};
