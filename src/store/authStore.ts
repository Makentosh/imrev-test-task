import { create } from 'zustand';


type State = {
  authenticated: boolean
}

type Actions = {
  loginAction: () => void
  logoutAction: () => void
}

export const useAuthStore = create<State & Actions>((set) => ({
  authenticated: false,
  loginAction: () => set(() => ({
    authenticated: true
  })),
  logoutAction: () => set(() => ({
    authenticated: false
  })),
}));
