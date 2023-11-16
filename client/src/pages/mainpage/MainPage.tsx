import { TopBanner } from '../../components/main/TopBanner';
import { MainSearch } from '../../components/main/MainSearch';
import { Category } from '../../components/main/Category';
import { RecommendLecture } from '../../components/main/RecommendLecture';
import {
  recommendNewest,
  recommendPopular,
} from '../../components/main/recommendType';
import { useEffect } from 'react';
import { useSearchStore } from '../../store/store';
import { Helmet } from 'react-helmet-async';

export const MainPage = () => {
  const { setInputValue, setCategory, setRegion } = useSearchStore();

  useEffect(() => {
    setCategory('');
    setInputValue('');
    setRegion('');
  }, [setInputValue, setCategory, setRegion]);

  return (
    <main id="main">
      <Helmet>
        <title>SeniorJob</title>
      </Helmet>
      <TopBanner />
      <MainSearch />
      <Category />
      <RecommendLecture recommendType={recommendPopular} />
      <RecommendLecture recommendType={recommendNewest} />
    </main>
  );
};
