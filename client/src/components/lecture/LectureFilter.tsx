import styled from 'styled-components';
import { statusData } from './statusData';
import FilterSVG from '../../assets/images/filter.svg?react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSearchStore } from '../../store/store';
import { RegionSearchBar } from './RegionSearchBar';
import {
  FilterInput,
  FilterLabel,
  FilterTag,
} from '../../assets/styles/filterStyle';

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
    navigate({
      pathname: '/lectures/filter',
      search: searchParams.toString(),
    });
  };

  return (
    <div className="flex flex-col gap-2">
      <RegionSearchBar />
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
    </div>
  );
};
