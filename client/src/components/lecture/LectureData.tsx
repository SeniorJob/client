import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { LectureDataProps } from '../../types/LectureTypes';
import { Tag } from '../../assets/styles/CommonStyles';

const LectureCard = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`;

const LectureWrapper = styled.div`
  position: relative;
  border-radius: 0.7rem;
  width: 100%;
`;

const CardContents = styled.div`
  padding: 0.4rem 0;
  h2 {
    font-weight: 700;
    line-height: 1.5em;
    /* height: 3rem; */
    font-size: 1rem;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 1;
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
    margin-bottom: 0.2rem;
  }
  .lecture-tags {
    font-size: 0.9rem;
    display: flex;
    align-items: center;
    gap: 0.4rem;
    .status {
      color: red;
    }
    .participants {
      color: green;
    }
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
  p {
    font-size: 0.9rem;
  }
  .lecture-hover-desc {
    display: -webkit-box;
    text-overflow: ellipsis;
    overflow: hidden;
    -webkit-line-clamp: 5;
    -webkit-box-orient: vertical;
  }
`;

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
            <div className="lecture-price">₩{data.price?.toLocaleString()}</div>
            <div className="lecture-tags">
              <Tag className="lecture-tags status">{data.status}</Tag>
              {data.current_participants && data.current_participants > 0 ? (
                <Tag className="lecture-tags participants">
                  +{data.current_participants}명
                </Tag>
              ) : null}
            </div>
          </CardContents>
        </Link>
      </LectureCard>
      <LectureHoverCard>
        <Link to={`/lectures/${data.create_id}`} className="lecture-hover-link">
          <h2>{data.title}</h2>
          <p className="lecture-hover-desc">{data.content}</p>
          <p className="lecture-hover-category">{data.category}</p>
        </Link>
      </LectureHoverCard>
    </LectureWrapper>
  );
};
