import { useLocation, useNavigate } from 'react-router-dom';
import {
  FilterInput,
  FilterLabel,
  FilterTag,
} from '../../../assets/styles/filterStyle';
import { sortData } from './filterData';
import styled from 'styled-components';

type LabelProps = {
  name?: string;
};

const SortFilterTag = styled(FilterTag)<LabelProps>`
  &::before {
    ${props =>
      props.name === '최신순'
        ? `content: '✨'`
        : props.name === '인기순'
        ? `content: '🔥'`
        : null};
    margin-right: 0.2rem;
  }
  &.checked {
    &::before {
      ${props =>
        props.name === '최신순'
          ? `content: '✨'`
          : props.name === '인기순'
          ? `content: '🔥'`
          : null};
    }
  }
`;

export const SortFilter = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);
  const curMethod = searchParams.get('filter');

  const handleMethodFilter = (method: string) => {
    if (curMethod === method) {
      searchParams.delete('filter');
      searchParams.delete('descending');
    } else {
      searchParams.delete('descending');
      searchParams.set('filter', method);
    }
    navigate(
      {
        pathname: '/lectures/filter',
        search: searchParams.toString(),
      },
      { replace: true },
    );
  };

  // const handleMethod = (
  //   e: React.ChangeEvent<HTMLInputElement>,
  //   method: string,
  // ) => {
  //   e.stopPropagation();
  //   e.preventDefault();

  //   if (filterMethod === method) {
  //     // 같은 필터를 다시 클릭한 경우, 필터를 해제
  //     setFilterMethod(''); // 빈 문자열로 설정 또는 다른 기본값으로 설정
  //   } else {
  //     // 다른 필터를 클릭한 경우, 해당 필터를 설정
  //     setFilterMethod(method);
  //     setDescending(true);
  //   }
  // };

  return (
    <div className="flex gap-1 items-center">
      {sortData.map(data => (
        <FilterLabel key={data.id}>
          <SortFilterTag
            name={data.name}
            className={curMethod === data.method ? 'checked' : ''}
          >
            <FilterInput
              type="checkbox"
              value={data.name}
              checked={curMethod === data.method}
              onChange={() => handleMethodFilter(data.method)}
            />
            {data.name}
          </SortFilterTag>
        </FilterLabel>
      ))}
    </div>
  );
};
