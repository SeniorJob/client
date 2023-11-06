import styled from 'styled-components';
import { RegionSearchBar } from './RegionSearchBar';
import { SortFilter } from './filter/SortFilter';
import { Divider } from '../../assets/styles/CommonStyles';
import { PriceSortFilter } from './filter/PriceSortFilter';
import { StatusFilter } from './filter/StatusFilter';

const FilterContainer = styled.div`
  display: flex;
  row-gap: 0.2rem;
  flex-wrap: wrap;
  align-items: center;
`;

export const LectureFilter = () => {
  return (
    <div className="flex flex-wrap gap-2 justify-between mb-2">
      <RegionSearchBar />
      <FilterContainer>
        <StatusFilter />
        <Divider />
        <PriceSortFilter />
        <Divider />
        <SortFilter />
      </FilterContainer>
    </div>
  );
};
