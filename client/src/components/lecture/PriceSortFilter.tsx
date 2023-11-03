import {
  FilterInput,
  FilterLabel,
  FilterTag,
} from '../../assets/styles/filterStyle';
import { useSearchStore } from '../../store/store';
import { sortPriceData } from './filterData';
import styled from 'styled-components';

type LabelProps = {
  name?: string;
};
const PriceFilterLabel = styled(FilterLabel)<LabelProps>`
  .checked {
    &::before {
      ${props =>
        props.name === '가격높은순' ? `content: '↑'` : `content: '↓'`};
      margin-right: 0.2rem;
    }
  }
`;

export const PriceSortFilter = () => {
  const { filterMethod, descending, setFilterMethod, setDescending } =
    useSearchStore();

  const handleMethod = (
    e: React.ChangeEvent<HTMLInputElement>,
    method: string,
    descend: boolean,
  ) => {
    e.stopPropagation();
    e.preventDefault();

    if (filterMethod === method && descend === descending) {
      setFilterMethod('');
      setDescending(!descend);
    } else {
      // 다른 필터를 클릭한 경우, 해당 필터를 설정
      setFilterMethod(method);
      setDescending(descend);
    }
  };

  return (
    <div className="flex gap-1 items-center">
      {sortPriceData.map(data => (
        <PriceFilterLabel key={data.id} name={data.name}>
          <FilterTag
            className={
              filterMethod === data.method && descending === data.descending
                ? 'checked'
                : ''
            }
          >
            <FilterInput
              type="checkbox"
              value={data.name}
              checked={
                filterMethod === data.method && descending === data.descending
              }
              onChange={e => handleMethod(e, data.method, data.descending)}
            />
            {data.name}
          </FilterTag>
        </PriceFilterLabel>
      ))}
    </div>
  );
};
