import { Url } from 'next/dist/shared/lib/router/router'
import { create } from 'zustand'

interface LoaderState {
  loadingPage: Url | null
  isLoadingPrev: boolean | null
  start: (url: Url, isLoadingPrev: boolean) => void
  end: () => void
}

export const useSectionLoaderStore = create<LoaderState>((set) => ({
  loadingPage: null,
  isLoadingPrev: null,
  start: (url, isLoadingPrev) => set({ loadingPage: url, isLoadingPrev: isLoadingPrev }),
  end: () => set({ loadingPage: null, isLoadingPrev: null }),
}))
