import { Link, useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { CategoryProps } from '../../types/CategoryTypes';
import { useSearchStore } from '../../store/store';

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
  const { setCategory } = useSearchStore();
  const location = useLocation();
  const navigate = useNavigate();

  const handleCategoryClick = () => {
    setCategory(data.title);

    // URL의 searchParams 업데이트
    const searchParams = new URLSearchParams(location.search);
    searchParams.set('category', data.title);
    navigate({
      pathname: '/lectures/filter',
      search: `${searchParams.toString()}`,
    });
  };

  return (
    <CardButton onClick={handleCategoryClick}>
      <Link to={`/lectures`}>
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
