import { Url } from 'next/dist/shared/lib/router/router'
import { create } from 'zustand'

interface LoaderState {
  loadingUrl: Url | null
  isLoadPreviousUrl: boolean | null
  isStartFromEnd: boolean
  isFromLink: boolean
  set: (url: Url, isPreviousUrl: boolean, isStartFromEnd?: boolean, isFromLink?: boolean) => void
}

export const useSectionLoaderStore = create<LoaderState>((set) => ({
  loadingUrl: null,
  isLoadPreviousUrl: null,
  isStartFromEnd: false,
  isFromLink: false,
  set: (url, isLoadPreviousUrl, isStartFromEnd = false, isFromLink = false) =>
    set({
      loadingUrl: url,
      isLoadPreviousUrl: isLoadPreviousUrl,
      isStartFromEnd: isStartFromEnd,
      isFromLink: isFromLink,
    }),
}))
