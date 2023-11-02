import { create } from 'zustand';

interface SearchState {
  inputValue: string;
  searchQuery: string;
  setInputValue: (value: string) => void;
  setSearchQuery: (query: string) => void;
}

export const useSearchStore = create<SearchState>(set => ({
  inputValue: '',
  searchQuery: '',
  setInputValue: value => set({ inputValue: value }),
  setSearchQuery: query => set({ searchQuery: query }),
}));
