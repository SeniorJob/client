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
    &::before {
      content: '✓';
      margin-right: 0.2rem;
    }
  }
`;

const CategoryInput = styled.input`
  display: none;
`;

const Category = styled.div`
  font-size: 1rem;
  font-weight: 500;
  line-height: 1.1rem;
  padding: 1.1rem;
  width: 100%;
  border-bottom: 1px solid #ccc;
`;

export const LectureFilter = () => {
  const { setCategory } = useSearchStore();
  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);
  const curCategory = searchParams.get('category');

  const viewAll = () => {
    searchParams.delete('category');
    navigate({
      pathname: '/lectures/filter',
      search: searchParams.toString(),
    });
    console.log(curCategory);
  };

  const handleCategoryFilter = (category: string) => {
    if (curCategory === category) {
      setCategory('');
      searchParams.delete('category');
    } else {
      setCategory(category);
      searchParams.set('category', category);
    }
    navigate({
      pathname: '/lectures/filter',
      search: searchParams.toString(),
    });
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
              <CategoryLabel>
                <Category
                  key={data.id}
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
