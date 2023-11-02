import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { CategoryProps } from '../../types/CategoryTypes';

const Card = styled.div`
  width: 70px;
  height: 70px;
  padding: 0.5rem;
  border-radius: 25%;
  background-color: #fff;
  /* border: 1px solid rgba(0, 0, 0, 0.1); */
  transition: 0.3s ease;
  text-align: center;
  overflow: hidden;
  &:hover {
    scale: 1.05;
  }
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 25%;
  }
`;
const CardButton = styled.button`
  &:hover {
    .title {
      color: var(--primaryColor);
    }
  }
`;

export const CategoryCard = ({ data }: CategoryProps) => {
  return (
    <CardButton>
      <Link to={`/lectures/filter?category=${data.title}`}>
        <Card>
          <img src={data.img} alt={data.title} />
        </Card>
        <div className="title">
          <span>{data.title}</span>
        </div>
      </Link>
    </CardButton>
  );
};
