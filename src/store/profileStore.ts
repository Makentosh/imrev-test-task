import { create } from 'zustand';
import { UserResult } from '../types.ts';

type State = {
  user: UserResult | null
}

type Actions = {
  setUser: (user: UserResult) => void
  resetUser: () => void
}

export const useProfileStore = create<State & Actions>((set) => ({
  user: null,
  setUser: (user: UserResult) => set(() => ({
    user
  })),
  resetUser: () => set(() => ({
    user: null
  })),
}));
