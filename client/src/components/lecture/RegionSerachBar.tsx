import styled from 'styled-components';
import Magnifier from '../../assets/images/magnifier.svg?react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSearchStore } from '../../store/store';

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
  width: 200px;
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

  return (
    <div className="flex items-center">
      <RegionSearchForm
        onSubmit={e => {
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
        <RegionSearchButton>
          <Magnifier width={20} height={20} />
        </RegionSearchButton>
      </RegionSearchForm>
    </div>
  );
};
