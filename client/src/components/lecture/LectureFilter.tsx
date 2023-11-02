import styled from 'styled-components';
import { categoryData } from '../category/categoryData';
import { useSearchStore } from '../../store/store';
import { useLocation, useNavigate } from 'react-router-dom';

const Filter = styled.div`
  width: 200px;
  border: 1px solid #ccc;
`;

export const LectureFilter = () => {
  const { setCategory } = useSearchStore();
  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);
  const curCategory = searchParams.get('category');

  const handleCategoryFilter = (category: string) => {
    setCategory(category);
    searchParams.set('category', category);
    navigate({
      pathname: '/lectures',
      search: searchParams.toString(),
    });
    console.log(category);
  };

  return (
    <aside>
      <Filter>
        필터
        <div>
          <div>강좌상태 필터</div>
          <div>지역 검색</div>
          <div>
            카테고리 필터:
            {categoryData.map(data => (
              <label key={data.id}>
                <input
                  type="checkbox"
                  value={data.title}
                  checked={curCategory === data.title}
                  onChange={() => handleCategoryFilter(data.title)}
                />
                {data.title}
              </label>
            ))}
          </div>
        </div>
      </Filter>
    </aside>
  );
};
