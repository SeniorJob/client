import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { DetailContent } from '../../components/lecture/detail/DetailContent';
import { DetailAside } from '../../components/lecture/detail/DetailAside';

const DetailBanner = styled.div`
  width: 100%;
  height: 300px;
  background-color: #ccc;
`;

const DetailMenu = styled.div`
  width: 100%;
  box-shadow:
    0 1px 2px hsla(0, 0%, 0%, 0.05),
    0 1px 4px hsla(0, 0%, 0%, 0.05),
    0 2px 8px hsla(0, 0%, 0%, 0.05);
`;

const DetailButton = styled.button`
  padding: 0.8rem 0;
  color: #9f9f9f;
`;

export const LectureDetail = () => {
  return (
    <main id="main">
      <section className="lecture-detail">
        <DetailBanner></DetailBanner>
        <DetailMenu>
          <div className="container flex gap-10 px-8">
            <Link to="#intro">
              <DetailButton>강좌 소개</DetailButton>
            </Link>
            <Link to="#curriculum">
              <DetailButton>강좌 상세 내용</DetailButton>
            </Link>
          </div>
        </DetailMenu>
        <div className="container relative">
          <div className="lecture-detail-contents flex gap-5 px-8 w-full">
            <DetailContent />
            <DetailAside />
          </div>
        </div>
      </section>
    </main>
  );
};
