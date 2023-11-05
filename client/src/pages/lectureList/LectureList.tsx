import { LectureNav } from '../../components/lecture/LectureNav';
import { LectureContents } from '../../components/lecture/LectureContents';
import { Helmet } from 'react-helmet-async';

export const LectureList = () => {
  return (
    <main id="main">
      <Helmet>
        <title>강좌 탐색</title>
      </Helmet>
      <section className="lecture-list">
        <div className="container p-8 relative">
          <div className="flex gap-5 w-full">
            <LectureNav />
            <LectureContents />
          </div>
        </div>
      </section>
    </main>
  );
};
