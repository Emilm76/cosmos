import { Url } from 'next/dist/shared/lib/router/router'
import { create } from 'zustand'

interface LoaderState {
  loadingUrl: Url | null
  isLoadPreviousUrl: boolean | null
  isFromLink: boolean
  set: (url: Url, isPreviousUrl: boolean, isFromLink?: boolean) => void
}

export const useSectionLoaderStore = create<LoaderState>((set) => ({
  loadingUrl: null,
  isLoadPreviousUrl: null,
  isFromLink: false,
  set: (url, isLoadPreviousUrl, isFromLink = false) =>
    set({ loadingUrl: url, isLoadPreviousUrl: isLoadPreviousUrl, isFromLink: isFromLink }),
}))
