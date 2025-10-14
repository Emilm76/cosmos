import { create } from 'zustand'

interface SectionTransitionState {
  transitionTo: 'prev' | 'next' | null
  toPrev: () => void
  toNext: () => void
}

export const useLoaderStore = create<SectionTransitionState>((set) => ({
  transitionTo: null,
  toPrev: () => set({ transitionTo: 'prev' }),
  toNext: () => set({ transitionTo: 'next' }),
}))
