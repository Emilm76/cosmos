'use client'
import { useEffect, useRef, useState } from 'react'

export function useScrollbar(isReady: boolean) {
  const scrollRef = useRef<HTMLDivElement | null>(null)
  const [thumbWidth, setThumbWidth] = useState(0)
  const [isShow, setIsShow] = useState(false)

  useEffect(() => {
    const el = scrollRef.current
    if (!isReady || !el) return

    const updateThumb = () => {
      if (window.innerWidth >= 1024) return
      const { scrollLeft, scrollWidth, clientWidth } = el
      const newWidth = (scrollLeft / (scrollWidth - clientWidth)) * 100
      if (scrollWidth === window.innerWidth) setIsShow(false)
      else setIsShow(true)

      setThumbWidth(newWidth)
    }

    updateThumb()
    el.addEventListener('scroll', updateThumb)
    window.addEventListener('resize', updateThumb)
    return () => {
      el.removeEventListener('scroll', updateThumb)
      window.removeEventListener('resize', updateThumb)
    }
  }, [isReady])

  return {
    scrollRef,
    thumbStyle: { width: `${thumbWidth}%` },
    isShow: isShow,
  }
}
