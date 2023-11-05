import { useLocation } from 'react-router-dom';
import { DetailContent } from '../../components/lecture/detail/DetailContent';
import { DetailAside } from '../../components/lecture/detail/DetailAside';
import { useEffect, useState } from 'react';
import { getLectureDetail } from '../../api/lecture';
import { LectureDetailProps } from '../../types/LectureTypes';
import { DetailHeader } from '../../components/lecture/detail/DetailHeader';
import { Helmet } from 'react-helmet-async';

export const LectureDetail = () => {
  const [data, setData] = useState<LectureDetailProps | null>();
  const location = useLocation();
  const currentURL = location.pathname;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const lectureDetail = await getLectureDetail(`${currentURL}`);
        setData(lectureDetail);
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, [currentURL]);

  return (
    <main id="main">
      <Helmet>
        <title>{data?.lectureDto.title}</title>
      </Helmet>
      <section className="lecture-detail">
        <DetailHeader data={data?.lectureDto} />
        <div className="container relative">
          <div className="lecture-detail-contents flex gap-5 px-8 py-6 w-full">
            <DetailContent />
            <DetailAside data={data?.lectureDto} />
          </div>
        </div>
      </section>
    </main>
  );
};
