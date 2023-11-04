import styled from 'styled-components';
import Magnifier from '../../assets/images/magnifier.svg?react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSearchStore } from '../../store/store';
import DeleteSVG from '../../assets/images/delete.svg?react';

const RegionSearchForm = styled.form`
  position: relative;
  display: flex;
  width: max-content;
  border: 1px solid #ccc;
  border-radius: 0.5rem;
  padding: 0.4rem 0.8rem;
  font-size: 0.9rem;
`;

const RegionSearchInput = styled.input`
  width: 220px;
  padding-right: 45px;
  &:focus-within {
    outline: none;
  }
`;

const RegionSearchButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 0;
  right: 0;
  height: 100%;
  border-left: 1px solid #ccc;
  width: 30px;
`;

const QueryResetButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 0;
  right: 35px;
  height: 100%;
`;

export const RegionSearchBar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);
  const { region, setRegion } = useSearchStore();

  const handleRegionFilter = (region: string) => {
    region ? searchParams.set('region', region) : searchParams.delete('region');
    navigate({
      pathname: '/lectures/filter',
      search: searchParams.toString(),
    });
    setRegion(region);
  };

  const resetRegion = () => {
    setRegion('');
    searchParams.delete('region');
  };

  return (
    <div className="flex items-center">
      <RegionSearchForm
        onSubmit={e => {
          e.stopPropagation();
          e.preventDefault();
          handleRegionFilter(region);
        }}
      >
        <RegionSearchInput
          type="text"
          placeholder="지역명 검색 예) 서울, 종로구"
          value={region}
          onChange={e => {
            setRegion(e.target.value);
          }}
        />
        <RegionSearchButton
          onClick={e => {
            e.stopPropagation();
            e.preventDefault();
            handleRegionFilter(region);
          }}
        >
          <Magnifier width={20} height={20} />
        </RegionSearchButton>
        <QueryResetButton
          onClick={e => {
            e.stopPropagation();
            e.preventDefault();
            resetRegion();
          }}
        >
          <DeleteSVG width={16} height={16} />
        </QueryResetButton>
      </RegionSearchForm>
    </div>
  );
};
