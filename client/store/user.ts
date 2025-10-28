import { create } from 'zustand'

export type UserStore = {
  user: User,
  setUser: (user: User) => void,
  clearUser: () => void,
}

export type User = {
  id: number,
  username: string,
  role: string
}

const defaultUser: User = {
  id: 0,
  username: '',
  role: 'user'
}
const useUserStore = create<UserStore>((set) => ({
  user: defaultUser,
  setUser: (user: User) => set({ user }),
  clearUser: () => set({ user: defaultUser }),
}))

export default useUserStore;