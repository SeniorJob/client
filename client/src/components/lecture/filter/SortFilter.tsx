import {
  FilterInput,
  FilterLabel,
  FilterTag,
} from '../../../assets/styles/filterStyle';
import { useSearchStore } from '../../../store/store';
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
  const { filterMethod, setFilterMethod } = useSearchStore();

  const handleMethod = (
    e: React.ChangeEvent<HTMLInputElement>,
    method: string,
  ) => {
    e.stopPropagation();
    e.preventDefault();

    if (filterMethod === method) {
      // 같은 필터를 다시 클릭한 경우, 필터를 해제
      setFilterMethod(''); // 빈 문자열로 설정 또는 다른 기본값으로 설정
    } else {
      // 다른 필터를 클릭한 경우, 해당 필터를 설정
      setFilterMethod(method);
    }
  };

  return (
    <div className="flex gap-1 items-center">
      {sortData.map(data => (
        <FilterLabel key={data.id}>
          <SortFilterTag
            name={data.name}
            className={filterMethod === data.method ? 'checked' : ''}
          >
            <FilterInput
              type="checkbox"
              value={data.name}
              checked={filterMethod === data.method}
              onChange={e => handleMethod(e, data.method)}
            />
            {data.name}
          </SortFilterTag>
        </FilterLabel>
      ))}
    </div>
  );
};
