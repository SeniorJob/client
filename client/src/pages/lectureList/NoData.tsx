import styled from 'styled-components';
import { useState, useEffect } from 'react';
import CautionSVG from '../../assets/images/caution.svg?react';
import { categoryData } from '../../components/category/categoryData';
import { Tag } from '../../assets/styles/CommonStyles';
import { Link } from 'react-router-dom';

const NodataContent = styled.div`
  width: 100%;
  height: 700px;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  font-size: 1.2rem;
  .mainTitle {
    font-weight: 600;
  }
  .subTitle {
    color: #7d7d7d;
    font-size: 0.9rem;
  }
`;
type Category = {
  id: number;
  title: string;
};

export const Nodata = () => {
  const [randomCategories, setRandomCategories] = useState<Category[]>([]);
  const newData = [...categoryData];

  useEffect(() => {
    const getRandomCategories = () => {
      const shuffledCategories = [...newData].sort(() => 0.5 - Math.random());
      return shuffledCategories.slice(0, 5);
    };

    setRandomCategories(getRandomCategories());
  }, []); // 최초 렌더링 시에 한 번만 실행

  return (
    <NodataContent>
      <CautionSVG width={64} />
      <div className="mb-2 text-center">
        <p className="mainTitle">찾으려는 강좌가 없습니다.</p>
        <p className="subTitle">이런 주제들로 찾아보는 건 어떠신가요?</p>
      </div>
      <div className="flex gap-1">
        {randomCategories.map(data => (
          <Link to={`/lectures/filter?category=${data.title}`} key={data.id}>
            <Tag>{data.title}</Tag>
          </Link>
        ))}
      </div>
    </NodataContent>
  );
};
