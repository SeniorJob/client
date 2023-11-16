import { create } from 'zustand';

interface SearchState {
  inputValue: string;
  searchQuery: string | null;
  category: string;
  region: string;
  setInputValue: (value: string) => void;
  setSearchQuery: (query: string) => void;
  setCategory: (category: string) => void;
  setRegion: (region: string) => void;
}

export const useSearchStore = create<SearchState>(set => ({
  inputValue: '',
  searchQuery: '',
  category: '',
  region: '',
  setInputValue: value => set({ inputValue: value }),
  setSearchQuery: query => set({ searchQuery: query }),
  setCategory: category => set({ category: category }),
  setRegion: region => set({ region: region }),
}));
