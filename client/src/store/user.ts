import { create } from 'zustand';

interface UserState {
  isLoggedIn: boolean;
  setIsLoggedIn: () => void;
}

export const useUserStore = create<UserState>(set => ({
  isLoggedIn: false,

  setIsLoggedIn: () =>
    set(prevState => ({ isLoggedIn: !prevState.isLoggedIn })),
}));
