import { NavigateFunction } from 'react-router-dom';

type ParamProps = {
  title?: string;
  category?: string;
  status?: string;
  region?: string;
};

export const searchSubmitHandler = (
  navigate: NavigateFunction,
  query?: string,
  category?: string,
  status?: string,
  region?: string,
) => {
  const trimmedQuery = query?.trim();
  if (!trimmedQuery || trimmedQuery.length < 2) {
    alert('검색어는 2글자 이상이어야 합니다.');
    return;
  }
  const paramsObj: ParamProps = {};
  if (query) paramsObj.title = query;
  if (category) paramsObj.category = category;
  if (status) paramsObj.status = status;
  if (region) paramsObj.region = region;

  const searchParams = new URLSearchParams(paramsObj);
  navigate({
    pathname: '/lectures/filter',
    search: `${searchParams.toString()}`,
  });
};

export const searchHandleChange = (
  e: React.ChangeEvent<HTMLInputElement>,
  setInputValue: (value: string) => void,
) => {
  // const { inputValue, setInputValue } = useSearchStore();
  setInputValue(e.target.value);
  console.log(`현재 검색어 : ${e.target.value}`);
};
