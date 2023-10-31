import styled from 'styled-components';
import { TopBanner } from '../../components/main/TopBanner';
import { MainSearch } from '../../components/main/MainSearch';
import { Category } from '../../components/main/Category';
import { RecommendLecture } from '../../components/main/RecommendLecture';
import {
  recommendNewest,
  recommendPopular,
} from '../../components/main/recommendType';

const Main = styled.main`
  min-height: 800px;
`;

export const MainPage = () => {
  return (
    <Main>
      <TopBanner />
      <MainSearch />
      <Category />
      <RecommendLecture recommendType={recommendPopular} />
      <RecommendLecture recommendType={recommendNewest} />
    </Main>
  );
};
