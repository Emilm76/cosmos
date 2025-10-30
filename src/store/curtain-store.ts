import { create } from 'zustand'

type CurtainState = {
  isGalleryOpen: boolean
  isDocumentsOpen: boolean
  openGallery: () => void
  closeGallery: () => void
  openDocuments: () => void
  closeDocuments: () => void
  closeAll: () => void
}

export const useCurtainStore = create<CurtainState>((set) => ({
  isGalleryOpen: false,
  isDocumentsOpen: false,
  openGallery: () => set({ isGalleryOpen: true }),
  closeGallery: () => set({ isGalleryOpen: false }),
  openDocuments: () => set({ isDocumentsOpen: true }),
  closeDocuments: () => set({ isDocumentsOpen: false }),
  closeAll: () => set({ isGalleryOpen: false, isDocumentsOpen: false }),
}))
