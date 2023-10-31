import styled from 'styled-components';

const LectureFilter = styled.div`
  width: 200px;
  border: 1px solid #ccc;
`;

const LectureContents = styled.div`
  width: 100%;
  background-color: #ccc;
`;

export const LectureList = () => {
  return (
    <main id="main">
      <section className="lecture-list">
        <div className="container p-8">
          <div className="flex gap-5 w-full">
            <aside>
              <LectureFilter>필터</LectureFilter>
            </aside>
            <LectureContents></LectureContents>
          </div>
        </div>
      </section>
    </main>
  );
};
