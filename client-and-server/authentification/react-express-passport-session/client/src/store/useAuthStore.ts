import { create } from 'zustand';

type Store = {
  user?: string;
  setAuthUser: (user?: { username: string; name: string }) => void;
};

const useAuthStore = create<Store>()((set) => ({
  user: undefined,
  setAuthUser: (user) => set(() => ({ user: user?.name ?? user?.username }))
}));

export default useAuthStore;
