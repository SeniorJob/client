import styled from 'styled-components';

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
type CategoryProps = {
  img: string;
  title: string;
};

export const CategoryCard = ({ img, title }: CategoryProps) => {
  return (
    <CardButton>
      <Card>
        <img src={img} alt={title} />
      </Card>
      <div className="title">
        <span>{title}</span>
      </div>
    </CardButton>
  );
};
