import { create } from 'zustand'

type ModalState = {
  isOpen: boolean
  open: () => void
  close: () => void
  toggle: () => void
}

export const useModalStore = create<ModalState>((set, get) => ({
  isOpen: false,
  open: () => set({ isOpen: true }),
  close: () => set({ isOpen: false }),
  toggle: () => set({ isOpen: !get().isOpen }),
}))
