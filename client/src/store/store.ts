import { create } from 'zustand';

interface SearchState {
  inputValue: string;
  searchQuery: string | null;
  category: string;
  status: string;
  region: string;
  filterMethod: string; // 추가: 정렬 방법 (latest, popular, priceHigh, priceLow)
  descending: boolean; // 추가: 정렬 순서 (true: 내림차순, false: 오름차순)
  setInputValue: (value: string) => void;
  setSearchQuery: (query: string) => void;
  setCategory: (category: string) => void;
  setStatus: (status: string) => void;
  setRegion: (region: string) => void;
  setFilterMethod: (method: string) => void; // 추가: 정렬 방법 설정
  setDescending: (desc: boolean) => void; // 추가: 정렬 순서 설정
}

export const useSearchStore = create<SearchState>(set => ({
  inputValue: '',
  searchQuery: '',
  category: '',
  status: '',
  region: '',
  filterMethod: 'latest', // 기본 정렬 방법 설정
  descending: true, // 기본 정렬 순서 설정
  setInputValue: value => set({ inputValue: value }),
  setSearchQuery: query => set({ searchQuery: query }),
  setCategory: category => set({ category: category }),
  setStatus: status => set({ status: status }),
  setRegion: region => set({ region: region }),
  setFilterMethod: method => set({ filterMethod: method }), // 정렬 방법 설정
  setDescending: desc => set({ descending: desc }), // 정렬 순서 설정
}));
