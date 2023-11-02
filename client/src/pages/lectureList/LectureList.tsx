import styled from 'styled-components';
import { SearchBar } from '../../components/header/SearchBar';
import { useState, useEffect } from 'react';
import { LectureObject } from '../../types/LectureTypes';
import { getLecture } from '../../api/lecture';
import { LectureData } from '../../components/lecture/LectureData';
import { useLocation } from 'react-router-dom';
import { Nodata } from './NoData';

const LectureFilter = styled.div`
  width: 200px;
  border: 1px solid #ccc;
`;

const LectureContents = styled.div`
  min-height: 700px;
  width: 100%;
`;

const LectureHeader = styled.header`
  display: flex;
  justify-content: space-between;
  margin-bottom: 1.5rem;
`;

const LectureContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const LectureItem = styled.div`
  width: 25%;
  padding: 0.7rem 0.4rem;
`;

export const LectureList = () => {
  const [data, setData] = useState<LectureObject[]>();
  const location = useLocation();
  const searchParams = location.search;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const lectureData = await getLecture(`filter${searchParams}`, {
          filter: 'latest',
          descending: true,
        });
        setData(lectureData);
        console.log(lectureData);
        console.log(searchParams);
      } catch (error) {
        console.error('에러 발생:', error);
      }
    };

    fetchData();
  }, [searchParams]);

  return (
    <main id="main">
      <section className="lecture-list">
        <div className="container p-8 relative">
          <div className="flex gap-5 w-full">
            <aside>
              <LectureFilter>필터</LectureFilter>
            </aside>
            <LectureContents>
              <LectureHeader>
                <h1 className="text-xl font-bold">강좌 탐색</h1>
                <SearchBar />
              </LectureHeader>
              <div>
                <LectureContainer>
                  {data && data.length > 0 ? (
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
            </LectureContents>
          </div>
        </div>
      </section>
    </main>
  );
};
