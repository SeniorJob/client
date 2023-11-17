import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { LectureDataProps } from '../../types/LectureTypes';
import { Tag } from '../../assets/styles/CommonStyles';
import CategorySVG from '../../assets/images/category.svg?react';
import TargetSVG from '../../assets/images/target.svg?react';
import LocationSVG from '../../assets/images/location.svg?react';
import { splitRegion } from '../../utils/splitRegion';

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
    font-weight: 600;
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
      color: #a8b0ba;
      &.available {
        color: var(--primaryColor);
      }
      &.inProgress {
        color: #f99c74;
      }
    }
    .participants {
      color: #9f9f9f;
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
    font-weight: 600;
    margin-bottom: 0.25rem;
  }
  p {
    font-size: 0.9rem;
    display: flex;
    align-items: stretch;
    gap: 0.2rem;
    svg {
      flex-shrink: 0;
    }
  }
  .lecture-hover-desc {
    display: -webkit-box;
    text-overflow: ellipsis;
    overflow: hidden;
    -webkit-line-clamp: 4;
    -webkit-box-orient: vertical;
    margin-bottom: 0.25rem;
  }
  .lecture-hover-category,
  .lecture-hover-region,
  .lecture-hover-target {
    color: #82acc0;
  }
`;

export const LectureData = ({ data }: LectureDataProps) => {
  const region = splitRegion(data.region);

  return (
    <LectureWrapper>
      <LectureCard>
        <Link to={`/lectures/detail/${data.create_id}`}>
          <Card>
            <img src={data.image_url} alt={data.title} />
          </Card>
          <CardContents>
            <h2 className="lecture-title">{data.title}</h2>
            <div className="lecture-creator">{data.creator}</div>
            <div className="lecture-price">
              {data.price === 0 ? '무료' : `₩ ${data.price?.toLocaleString()}`}
            </div>
            <div className="lecture-tags">
              <Tag
                className={`lecture-tags status ${
                  data.status === '신청가능상태'
                    ? 'available'
                    : data.status === '진행상태'
                    ? 'inProgress'
                    : ''
                }`}
              >
                {data.status}
              </Tag>
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
        <Link
          to={`/lectures/detail/${data.create_id}`}
          className="lecture-hover-link"
        >
          <h2>{data.title}</h2>
          <p className="lecture-hover-desc">{data.content}</p>
          <p className="lecture-hover-category">
            <CategorySVG width={20} height={20} />
            {data.category}
          </p>
          <p className="lecture-hover-region">
            <LocationSVG width={20} height={20} />
            {region}
          </p>
          <p className="lecture-hover-target">
            <TargetSVG width={20} height={20} />
            {data.learning_target}
          </p>
        </Link>
      </LectureHoverCard>
    </LectureWrapper>
  );
};
