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

export const MainPage = () => {
  const {
    setInputValue,
    setFilterMethod,
    setDescending,
    setCategory,
    setRegion,
  } = useSearchStore();

  useEffect(() => {
    setCategory('');
    setInputValue('');
    setRegion('');
    setFilterMethod('latest');
    setDescending(true);
  }, [setInputValue, setCategory, setRegion, setFilterMethod, setDescending]);

  return (
    <main id="main">
      <TopBanner />
      <MainSearch />
      <Category />
      <RecommendLecture recommendType={recommendPopular} />
      <RecommendLecture recommendType={recommendNewest} />
    </main>
  );
};
