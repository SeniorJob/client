import { create } from 'zustand';

interface SearchState {
  inputValue: string;
  searchQuery: string | null;
  category: string;
  status: string;
  region: string;
  filterMethod: string; // 추가: 정렬 방법 (latest, popularity, price)
  descending: boolean; // 추가: 정렬 순서 (true: 내림차순, false: 오름차순)
  setInputValue: (value: string) => void;
  setSearchQuery: (query: string) => void;
  setCategory: (category: string) => void;
  setStatus: (status: string) => void;
  setRegion: (region: string) => void;
  setFilterMethod: (method: string) => void;
  setDescending: (desc: boolean) => void;
}

export const useSearchStore = create<SearchState>(set => ({
  inputValue: '',
  searchQuery: '',
  category: '',
  status: '',
  region: '',
  filterMethod: 'latest',
  descending: true,
  setInputValue: value => set({ inputValue: value }),
  setSearchQuery: query => set({ searchQuery: query }),
  setCategory: category => set({ category: category }),
  setStatus: status => set({ status: status }),
  setRegion: region => set({ region: region }),
  setFilterMethod: method => set({ filterMethod: method }),
  setDescending: desc => set({ descending: desc }),
}));
