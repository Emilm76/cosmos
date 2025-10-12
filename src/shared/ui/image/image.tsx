/* eslint-disable jsx-a11y/alt-text */
'use client'
import { useState, useEffect, useRef } from 'react'
import Image, { ImageProps } from 'next/image'

export function MyImage(props: ImageProps) {
  const [isVisible, setVisible] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true)
            observer.disconnect()
          }
        })
      },
      { rootMargin: '1000px' },
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return (
    <div style={{ width: '100%', height: '100%' }} ref={ref}>
      {isVisible && <Image {...props} loading="eager" priority />}
    </div>
  )
}
