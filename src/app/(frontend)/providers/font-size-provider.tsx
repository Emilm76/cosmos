'use client'
import { ReactNode, useEffect } from 'react'

const defaultFontSize = 16
let currentFontSize = defaultFontSize

function setFontSizeByHeight(bpHeight: number) {
  const newSize = Math.max(10, Math.round(window.innerHeight / (bpHeight / defaultFontSize)))
  if (newSize !== currentFontSize) {
    document.documentElement.style.fontSize = `${newSize}px`
    currentFontSize = newSize
  }
}

function setFontSizeByWidth(bpWidth: number) {
  const newSize = Math.min(20, Math.round(window.innerWidth / (bpWidth / defaultFontSize)))
  console.log(newSize, currentFontSize)
  if (newSize !== currentFontSize) {
    document.documentElement.style.fontSize = `${newSize}px`
    currentFontSize = newSize
  }
}

function setDefaultFontSize() {
  document.documentElement.style.fontSize = defaultFontSize + 'px'
  currentFontSize = defaultFontSize
}

export function FontSizeProvider({ children }: { children: ReactNode }) {
  useEffect(() => {
    const updateFontSize = () => {
      if (window.innerWidth < 414) {
        setFontSizeByWidth(414)
      }
      if (window.innerWidth < 1300) return

      if (window.innerWidth < 1600) {
        if (window.innerHeight < 710) {
          setFontSizeByHeight(710)
        } else setDefaultFontSize()
      }

      if (window.innerWidth >= 1600) {
        if (window.innerHeight < 810) {
          setFontSizeByHeight(810)
        } else setDefaultFontSize()
      }

      if (window.innerWidth >= 1925) {
        setFontSizeByWidth(1920)
      }
    }

    updateFontSize()
    window.addEventListener('resize', updateFontSize)

    return () => window.removeEventListener('resize', updateFontSize)
  }, [])

  return children
}
