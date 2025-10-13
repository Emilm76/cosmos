import { create } from 'zustand'

interface LoaderState {
  loading: boolean
  show: () => void
  hide: () => void
}

export const useLoaderStore = create<LoaderState>((set) => ({
  loading: false,
  show: () => set({ loading: true }),
  hide: () => set({ loading: false }),
}))
