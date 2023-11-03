import styled from 'styled-components';
import { statusData } from './filterData';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSearchStore } from '../../store/store';
import FilterSVG from '../../assets/images/filter.svg?react';
import { RegionSearchBar } from './RegionSearchBar';
import {
  FilterInput,
  FilterLabel,
  FilterTag,
} from '../../assets/styles/filterStyle';
import { SortFilter } from './SortFilter';
import { Divider } from '../../assets/styles/CommonStyles';
import { PriceSortFilter } from './PriceSortFilter';

const StatusFilter = styled.div`
  display: flex;
  height: max-content;
  align-items: center;
  flex-wrap: wrap;
  gap: 0.4rem;
`;

export const LectureFilter = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { setStatus } = useSearchStore();
  const searchParams = new URLSearchParams(location.search);
  const curStatus = searchParams.get('status');
  const handleStatusFilter = (status: string) => {
    if (curStatus === status) {
      setStatus('');
      searchParams.delete('status');
    } else {
      setStatus(status);
      searchParams.set('status', status);
    }
    navigate(
      {
        pathname: '/lectures/filter',
        search: searchParams.toString(),
      },
      { replace: true },
    );
  };

  return (
    <div className="flex justify-between">
      <RegionSearchBar />
      <div className="flex justify-between items-center">
        <StatusFilter>
          <FilterSVG width={24} height={24} />
          {statusData.map(status => (
            <FilterLabel key={status.id}>
              <FilterTag className={curStatus === status.name ? 'checked' : ''}>
                <FilterInput
                  type="checkbox"
                  value={status.name}
                  checked={curStatus === status.name}
                  onChange={() => handleStatusFilter(status.name)}
                />
                {status.name}
              </FilterTag>
            </FilterLabel>
          ))}
        </StatusFilter>
        <Divider />
        <PriceSortFilter />
        <Divider />
        <SortFilter />
      </div>
    </div>
  );
};
