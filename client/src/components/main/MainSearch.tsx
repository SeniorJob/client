import styled from 'styled-components';
import Magnifier from '../../assets/images/magnifier.svg?react';
import { searchHandleChange, searchSubmitHandler } from '../../utils/Search';
import { useNavigate } from 'react-router-dom';
import { useSearchStore } from '../../store/store';

const Contents = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const SearchForm = styled.form`
  max-width: 580px;
  width: 100%;
  position: relative;
  input::placeholder {
    color: #0978464c;
  }
  input:focus::placeholder {
    color: lightgray;
  }
`;

const MainSearchBar = styled.input`
  width: 100%;
  max-width: 100%;
  background-color: rgba(33, 142, 91, 0.1);
  border: 2px solid #0978464c;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.1);
  padding: 14px 20px;
  border-radius: 28px;
  height: auto;
  transition: all 0.2s ease;
  &:focus {
    outline: unset;
    box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2);
    border: 2px solid #dedede;
    background-color: #fff;
  }
`;

const SearchButton = styled.button`
  position: absolute;
  right: 20px;
  top: 50%;
  transform: translateY(-50%);
  font-size: 16px;
  background-color: inherit;
  border: unset;
  outline: none;
`;

export const MainSearch = () => {
  const navigate = useNavigate();
  const { inputValue, setInputValue } = useSearchStore();

  return (
    <section className="search pt-8 pb-6">
      <div className="container">
        <Contents>
          <h1 className="text-2xl font-medium mb-5">
            당신의 강좌를 찾고 있나요?
          </h1>
          <SearchForm
            onSubmit={e => {
              e.preventDefault();
              searchSubmitHandler(navigate, inputValue);
            }}
          >
            <MainSearchBar
              type="text"
              placeholder="배우고 싶은 지식을 입력해보세요."
              // value={inputValue}
              onChange={e => searchHandleChange(e, setInputValue)}
            />
            <SearchButton>
              <Magnifier width={28} height={28} />
            </SearchButton>
          </SearchForm>
        </Contents>
      </div>
    </section>
  );
};
