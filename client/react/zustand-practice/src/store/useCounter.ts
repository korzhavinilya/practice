import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface CounterState {
  count: number;
  increase: (amount?: number) => void;
  reset: () => void;
}

export const useCounter = create<CounterState>()(
  persist(
    (set) => ({
      count: 0,
      increase: (amount) =>
        set((state) => ({ count: state.count + (amount ?? 1) })),
      reset: () => set(() => ({ count: 0 }))
    }),
    {
      name: 'counterStore'
      // storage: createJSONStorage(() => sessionStorage) // localStorage by default
    }
  )
);
