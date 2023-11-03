import { LectureNav } from '../../components/lecture/LectureNav';
import { LectureContents } from '../../components/lecture/LectureContents';

export const LectureList = () => {
  return (
    <main id="main">
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
