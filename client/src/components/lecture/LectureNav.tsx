import styled from 'styled-components';
import { categoryData } from '../category/categoryData';
import { useSearchStore } from '../../store/store';
import { useLocation, useNavigate } from 'react-router-dom';

const Filter = styled.div`
  width: 200px;
  border: 1px solid #ccc;
  border-bottom: none;
  background-color: #f6f6f6;
  /* padding: 0.8rem; */
`;

const CategoryFilter = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  /* gap: 0.5rem; */
`;

const CategoryLabel = styled.label`
  cursor: pointer;
  display: flex;
  align-items: center;
  font-size: 0.9rem;
  height: 22px;
  flex: 0;
  gap: 0.4rem;
  .checked {
    color: var(--primaryColor);
    font-weight: 500;
    background-color: #eee;
  }
  &:hover {
    background-color: #f1f1f1;
  }
`;

const CategoryInput = styled.input`
  display: none;
`;

const Category = styled.div`
  position: relative;
  display: flex;
  font-size: 1rem;
  line-height: 1.1rem;
  padding: 1.1rem;
  width: 100%;
  border-bottom: 1px solid #ccc;
  &::after {
    position: absolute;
    right: 1.1rem;
    font-weight: 600;
    content: '〉';
  }
`;

export const LectureNav = () => {
  const { setCategory } = useSearchStore();
  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);
  const curCategory = searchParams.get('category');

  const viewAll = () => {
    setCategory('');
    searchParams.delete('category');
    searchParams.delete('title');
    searchParams.set('page', '1');
    navigate(
      {
        pathname: '/lectures/filter',
        search: searchParams.toString(),
      },
      { replace: true },
    );
  };

  const handleCategoryFilter = (category: string) => {
    if (curCategory === category) {
      viewAll();
    } else {
      setCategory(category);
      searchParams.delete('title');
      searchParams.set('category', category);
      searchParams.set('page', '1');
      navigate(
        {
          pathname: '/lectures/filter',
          search: searchParams.toString(),
        },
        { replace: true },
      );
    }
  };

  return (
    <aside>
      <Filter>
        <div>
          <CategoryFilter>
            <CategoryLabel>
              <Category className={`${!curCategory ? 'checked' : ''}`}>
                <CategoryInput
                  type="checkbox"
                  value="전체보기"
                  checked={!curCategory}
                  onChange={() => viewAll()}
                />
                전체보기
              </Category>
            </CategoryLabel>
            {categoryData.map(data => (
              <CategoryLabel key={data.id}>
                <Category
                  className={`${curCategory === data.title ? 'checked' : ''}`}
                >
                  <CategoryInput
                    type="checkbox"
                    value={data.title}
                    checked={curCategory === data.title}
                    onChange={() => handleCategoryFilter(data.title)}
                  />
                  {data.title}
                </Category>
              </CategoryLabel>
            ))}
          </CategoryFilter>
        </div>
      </Filter>
    </aside>
  );
};
