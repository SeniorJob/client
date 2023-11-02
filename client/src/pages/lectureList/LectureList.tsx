import { LectureFilter } from '../../components/lecture/LectureFilter';
import { LectureContents } from '../../components/lecture/LectureContents';
import { useEffect } from 'react';
import { useSearchStore } from '../../store/store';

export const LectureList = () => {
  // 카테고리 초기화
  const { setCategory } = useSearchStore();

  useEffect(() => {
    setCategory('');
  }, [setCategory]);

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
