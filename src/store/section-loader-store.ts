import { Url } from 'next/dist/shared/lib/router/router'
import { create } from 'zustand'

interface LoaderState {
  loadingUrl: Url | null
  isLoadPreviousUrl: boolean | null
  set: (url: Url, isPreviousUrl: boolean) => void
}

export const useSectionLoaderStore = create<LoaderState>((set) => ({
  loadingUrl: null,
  isLoadPreviousUrl: null,
  set: (url, isLoadPreviousUrl) => set({ loadingUrl: url, isLoadPreviousUrl: isLoadPreviousUrl }),
}))
