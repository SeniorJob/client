import { create } from 'zustand';

interface SearchState {
  inputValue: string;
  searchQuery: string | null;
  category: string;
  status: string;
  region: string;
  setInputValue: (value: string) => void;
  setSearchQuery: (query: string) => void;
  setCategory: (category: string) => void;
  setStatus: (statis: string) => void;
  setRegion: (region: string) => void;
}

export const useSearchStore = create<SearchState>(set => ({
  inputValue: '',
  searchQuery: '',
  category: '',
  status: '',
  region: '',
  setInputValue: value => set({ inputValue: value }),
  setSearchQuery: query => set({ searchQuery: query }),
  setCategory: category => set({ category: category }),
  setStatus: status => set({ status: status }),
  setRegion: region => set({ region: region }),
}));
