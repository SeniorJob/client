import styled from 'styled-components';

const StyledSearchBar = styled.form`
  width: 220px;
`;

const SearchBarInput = styled.input`
  width: 100%;
  height: 35px;
  padding: 7.8px 9.1px 7.8px 32px;
  background-color: rgba(217, 217, 217, 0.6);
  border-radius: 1rem;
`;

export const SearchBar = () => {
  return (
    <StyledSearchBar>
      <SearchBarInput type="text" placeholder="검색어를 입력하세요" />
    </StyledSearchBar>
  );
};
