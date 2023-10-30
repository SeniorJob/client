import { Link } from 'react-router-dom';
import styled from 'styled-components';

const LectureCard = styled.div`
  width: 100%;
  height: 100%;
`;

const LectureWrapper = styled.div`
  border-radius: 0.7rem;
`;

const CardContents = styled.div`
  padding: 0.4rem 0;
  h2 {
    font-weight: 700;
    line-height: 1.5em;
    height: 3rem;
    font-size: 1rem;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    white-space: pre-wrap;
  }
  .lecture-creator {
    font-size: 0.9rem;
    color: #7d7d7d;
  }
  .lecture-price {
    color: var(--primaryColor);
    font-weight: 600;
  }
`;

const Card = styled.div`
  width: 100%;
  height: 150px;
  border-radius: 0.7rem;
  overflow: hidden;
  background-color: #ccc;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const LectureHoverCard = styled.div`
  display: none;
  ${LectureWrapper}:hover & {
    display: block;
  }
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.8);
  .lecture-hover-link {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    padding: 0.7rem;
    color: #fff;
  }
  h2 {
    font-weight: 700;
    margin-bottom: 0.25rem;
  }
`;

type LectureDataProps = {
  data: LectureProps;
};

type LectureProps = {
  create_id?: number;
  image_url?: string;
  title?: string;
  creator?: string;
  status?: string;
  price?: number;
  category?: string;
};

export const LectureData = ({ data }: LectureDataProps) => {
  return (
    <LectureWrapper>
      <LectureCard>
        <Link to={`/lectures/${data.create_id}`}>
          <Card>
            <img src={data.image_url} alt={data.title} />
          </Card>
          <CardContents>
            <h2 className="lecture-title">{data.title}</h2>
            <div className="lecture-creator">{data.creator}</div>
            <div className="lecture-tags">{data.status}</div>
            <div className="lecture-price">₩{data.price?.toLocaleString()}</div>
          </CardContents>
        </Link>
      </LectureCard>
      <LectureHoverCard>
        <Link to={`/lectures/${data.create_id}`} className="lecture-hover-link">
          <h2>{data.title}</h2>
          <p>{data.category}</p>
        </Link>
      </LectureHoverCard>
    </LectureWrapper>
  );
};
