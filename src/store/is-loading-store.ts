import { create } from 'zustand'

interface IsLoadingState {
  isLoading: boolean
  isLoadingAnimation: boolean
  start: () => void
  stop: () => void
  stopAnimation: () => void
}

export const useIsLoadingStore = create<IsLoadingState>((set) => ({
  isLoading: true,
  isLoadingAnimation: true,
  start: () => set({ isLoading: true, isLoadingAnimation: true }),
  stop: () => set({ isLoading: false, isLoadingAnimation: false }),
  stopAnimation: () => set({ isLoadingAnimation: false }),
}))
