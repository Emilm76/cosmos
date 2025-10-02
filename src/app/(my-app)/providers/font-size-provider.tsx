'use client'
import { ReactNode, useEffect } from 'react'

export function FontSizeProvider({ children }: { children: ReactNode }) {
  useEffect(() => {
    let currentSize = 16

    const updateFontSize = () => {
      if (window.innerWidth < 1300) return

      if (window.innerHeight < 810) {
        const newSize = Math.max(10, Math.round(window.innerHeight / (810 / 16)))
        if (newSize !== currentSize) {
          document.documentElement.style.fontSize = `${newSize}px`
          currentSize = newSize
        }
      } else if (window.innerWidth < 1925) {
        document.documentElement.style.fontSize = `16px`
        currentSize = 16
      } else if (window.innerWidth > 1925) {
        const newSize = Math.min(24, Math.round(window.innerWidth / (1920 / 16)))
        if (newSize !== currentSize) {
          document.documentElement.style.fontSize = `${newSize}px`
          currentSize = newSize
        }
      }
    }

    updateFontSize()
    window.addEventListener('resize', updateFontSize)

    return () => window.removeEventListener('resize', updateFontSize)
  }, [])

  return children
}
