export const recommendPopular = {
  name: 'popular',
  title: '지금 HOT한 강좌들이에요 🔥',
  subTitle: '인기많은 강좌를 수강해 보세요!',
  endPoint: 'popular',
  params: { limit: 10 },
};

export const recommendNewest = {
  name: 'newest',
  title: '따끈따끈한 새 강좌들을 만나보세요! ✨',
  endPoint: 'filter',
  params: { filter: 'latest', descending: true },
};

export const recommendUser = (
  user?: string | undefined,
  category?: string | undefined,
) => ({
  name: 'user',
  title: `${user} 님이 관심 있을만한 강좌들이에요! 😉`,
  endPoint: 'filter',
  params: { category: category, filter: 'latest' },
});
