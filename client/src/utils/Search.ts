import { NavigateFunction } from 'react-router-dom';

export const SearchSubmitHandler = (
  navigate: NavigateFunction,
  query: string,
) => {
  navigate({
    pathname: '/lectures',
    search: `?title=${query}`,
  });
  console.log('이동함');
};
