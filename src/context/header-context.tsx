'use client'
import { createContext, useContext, useState } from 'react'

type HeaderContextType = {
  transparent: boolean
  setTransparent: (value: boolean) => void
}

const HeaderContext = createContext<HeaderContextType | undefined>(undefined)

export const HeaderProvider = ({ children }: { children: React.ReactNode }) => {
  const [transparent, setTransparent] = useState(false)
  return (
    <HeaderContext.Provider value={{ transparent, setTransparent }}>
      {children}
    </HeaderContext.Provider>
  )
}

export const useHeader = () => {
  const context = useContext(HeaderContext)
  if (!context) throw new Error('useHeader must be used within HeaderProvider')
  return context
}
