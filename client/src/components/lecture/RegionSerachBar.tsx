import styled from 'styled-components';
import Magnifier from '../../assets/images/magnifier.svg?react';

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
  return (
    <div className="flex items-center">
      <RegionSearchForm>
        <RegionSearchInput placeholder="지역명 검색 예) 서울, 종로구" />
        <RegionSearchButton>
          <Magnifier width={20} height={20} />
        </RegionSearchButton>
      </RegionSearchForm>
    </div>
  );
};
