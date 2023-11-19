import { useLocation, useNavigate } from 'react-router-dom';
import {
  FilterInput,
  FilterLabel,
  FilterTag,
} from '../../../assets/styles/filterStyle';
import { sortPriceData } from './filterData';
import styled from 'styled-components';

type LabelProps = {
  name?: string;
};

const PriceFilterTag = styled(FilterTag)<LabelProps>`
  &::before {
    ${props => (props.name === '가격높은순' ? `content: '↑'` : `content: '↓'`)};
    margin-right: 0.2rem;
  }
  &.checked {
    &::before {
      ${props =>
        props.name === '가격높은순' ? `content: '↑'` : `content: '↓'`};
      margin-right: 0.2rem;
    }
  }
`;

export const PriceSortFilter = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);
  const curMethod = searchParams.get('filter');
  const curDescending = searchParams.get('descending');

  const handlePriceFilter = (method: string, descend: string) => {
    if (curMethod === method && descend === curDescending) {
      searchParams.delete('filter');
      searchParams.delete('descending');
    } else {
      searchParams.set('filter', method);
      searchParams.set('descending', String(descend));
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
  //   descend: boolean,
  // ) => {
  //   e.stopPropagation();
  //   e.preventDefault();

  //   if (filterMethod === method && descend === descending) {
  //     setFilterMethod('');
  //     setDescending(!descend);
  //   } else {
  //     // 다른 필터를 클릭한 경우, 해당 필터를 설정
  //     setFilterMethod(method);
  //     setDescending(descend);
  //   }
  // };

  return (
    <div className="flex gap-1 items-center">
      {sortPriceData.map(data => (
        <FilterLabel key={data.id}>
          <PriceFilterTag
            name={data.name}
            className={
              curMethod === data.method &&
              curDescending === String(data.descending)
                ? 'checked'
                : ''
            }
          >
            <FilterInput
              type="checkbox"
              value={data.name}
              checked={
                curMethod === data.method &&
                curDescending === String(data.descending)
              }
              onChange={() =>
                handlePriceFilter(data.method, String(data.descending))
              }
            />
            {data.name}
          </PriceFilterTag>
        </FilterLabel>
      ))}
    </div>
  );
};
