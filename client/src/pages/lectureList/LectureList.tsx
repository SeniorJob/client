import { LectureFilter } from '../../components/lecture/LectureFilter';
import { LectureContents } from '../../components/lecture/LectureContents';

export const LectureList = () => {
  return (
    <main id="main">
      <section className="lecture-list">
        <div className="container p-8 relative">
          <div className="flex gap-5 w-full">
            <LectureFilter />
            <LectureContents />
          </div>
        </div>
      </section>
    </main>
  );
};
