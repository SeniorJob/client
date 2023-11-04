import { statusData } from './filterData';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSearchStore } from '../../store/store';
import {
  FilterInput,
  FilterLabel,
  FilterTag,
} from '../../assets/styles/filterStyle';

export const StatusFilter = () => {
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
    <div className="flex gap-1 items-center">
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
    </div>
  );
};
