import { create } from 'zustand';

interface SearchState {
  inputValue: string;
  searchQuery: string | null;
  category: string;
  setInputValue: (value: string) => void;
  setSearchQuery: (query: string) => void;
  setCategory: (category: string) => void;
}

export const useSearchStore = create<SearchState>(set => ({
  inputValue: '',
  searchQuery: '',
  category: '',
  setCategory: category => set({ category: category }),
  setInputValue: value => set({ inputValue: value }),
  setSearchQuery: query => set({ searchQuery: query }),
}));
