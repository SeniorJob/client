import styled from 'styled-components';
import Magnifier from '../../assets/images/magnifier.svg?react';
import { SearchSubmitHandler } from '../../utils/Search';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

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

export const SearchBar = () => {
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState<string>('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    console.log(`현재 검색어 : ${inputValue}`);
  };

  return (
    <StyledSearchBar
      onSubmit={e => {
        e.preventDefault();
        SearchSubmitHandler(navigate, inputValue);
        setInputValue('');
      }}
    >
      <SearchButton>
        <Magnifier width="24" height="24" />
      </SearchButton>
      <SearchBarInput
        type="text"
        placeholder=""
        value={inputValue}
        onChange={handleChange}
      />
    </StyledSearchBar>
  );
};
