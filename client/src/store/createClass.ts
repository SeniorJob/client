import create from 'zustand';

interface Create {
  createId: number;
  setCreateId: (id: number) => void;
}

const useCreateClass = create<Create>(set => ({
  createId: 0,
  setCreateId: id => set({ createId: id }),
}));

export default useCreateClass;
