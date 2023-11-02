import { NavigateFunction } from 'react-router-dom';

export const SearchSubmitHandler = (
  navigate: NavigateFunction,
  query: string,
) => {
  navigate({
    pathname: '/lectures',
    search: `?title=${query}`,
  });
};

export const SearchHandleChange = (
  e: React.ChangeEvent<HTMLInputElement>,
  setInputValue: (value: string) => void,
) => {
  // const { inputValue, setInputValue } = useSearchStore();
  setInputValue(e.target.value);
  console.log(`현재 검색어 : ${e.target.value}`);
};
