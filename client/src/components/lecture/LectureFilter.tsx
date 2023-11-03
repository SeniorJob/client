import styled from 'styled-components';
import { Tag } from '../../assets/styles/CommonStyles';
import { statusData } from './statusData';
import FilterSVG from '../../assets/images/filter.svg?react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSearchStore } from '../../store/store';
import { RegionSearchBar } from './RegionSerachBar';

const StatusFilter = styled.div`
  display: flex;
  height: max-content;
  align-items: center;
  flex-wrap: wrap;
  gap: 0.4rem;
`;

const StatusTag = styled(Tag)`
  padding: 0.4rem 0.7rem;
  font-weight: unset;
  border: 1px solid #ccc;
`;

const StatusLabel = styled.label`
  cursor: pointer;
  display: flex;
  align-items: center;
  font-size: 0.9rem;
  gap: 0.4rem;
  .checked {
    border-color: var(--primaryColor);
    color: var(--primaryColor);
    font-weight: 500;
    &::before {
      content: '✓';
      margin-right: 0.2rem;
    }
  }
`;

const StatusInput = styled.input`
  display: none;
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
          <StatusLabel key={status.id}>
            <StatusTag className={curStatus === status.name ? 'checked' : ''}>
              <StatusInput
                type="checkbox"
                value={status.name}
                checked={curStatus === status.name}
                onChange={() => handleStatusFilter(status.name)}
              />
              {status.name}
            </StatusTag>
          </StatusLabel>
        ))}
      </StatusFilter>
    </div>
  );
};
