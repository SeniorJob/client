import styled from 'styled-components';
import { ClassRecommend } from '../../components/main/ClassRecommend';
import { MainSearch } from '../../components/main/MainSearch';
import { Category } from '../../components/main/Category';

const Main = styled.main`
  min-height: 800px;
`;

export const MainPage = () => {
  return (
    <Main>
      <ClassRecommend />
      <MainSearch />
      <Category />
    </Main>
  );
};
