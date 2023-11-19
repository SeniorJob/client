import styled from 'styled-components';
import Magnifier from '../../assets/images/magnifier.svg?react';
import { searchHandleChange, searchSubmitHandler } from '../../utils/Search';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useSearchStore } from '../../store/store';

const StyledSearchBar = styled.form`
  position: relative;
  width: 220px;
  display: flex;
  align-items: center;
  padding: 0 1rem;
`;

const SearchBarInput = styled.input`
  width: 100%;
  height: 35px;
  font-size: 0.9rem;
  padding: 7.8px 9.1px 7.8px 40px;
  border: 1px solid #ccc;
  background-color: #f6f6f6;
  border-radius: 1rem;
  &:focus-within {
    outline: none;
    box-shadow: 0 0 3px 1px #1dc078;
    transition: 0.3s all ease;
  }
`;

const SearchButton = styled.button`
  position: absolute;
  left: calc(11px + 1rem);
  color: black;
`;

export const SearchBar = ({ option }: { option?: string }) => {
  const navigate = useNavigate();
  const { region, category, inputValue, setInputValue } = useSearchStore();
  const [value, setValue] = useState<string>('');

  return (
    <StyledSearchBar
      onSubmit={e => {
        e.stopPropagation();
        e.preventDefault();
        searchSubmitHandler(
          navigate,
          option === 'header' ? value : inputValue,
          category,
          region,
        );
        option === 'header' ? setValue('') : null;
        option === 'header' ? setInputValue(value) : null;
      }}
    >
      <SearchButton
        onClick={e => {
          e.stopPropagation();
          e.preventDefault();
          searchSubmitHandler(
            navigate,
            option === 'header' ? value : inputValue,
            category,
            region,
          );
        }}
      >
        <Magnifier width="24" height="24" />
      </SearchButton>
      <SearchBarInput
        type="text"
        placeholder={option === 'header' ? '' : '제목으로 검색'}
        value={option === 'header' ? value : inputValue || ''}
        onChange={e => {
          option === 'header'
            ? searchHandleChange(e, setValue)
            : searchHandleChange(e, setInputValue);
        }}
      />
    </StyledSearchBar>
  );
};
