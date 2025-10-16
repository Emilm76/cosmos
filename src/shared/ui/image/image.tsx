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
      {
        // top, right, bottom, left
        rootMargin: '0px 1000px 1000px 0px',
      },
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

export function ImagePriority(props: ImageProps) {
  return <Image {...props} loading="eager" priority />
}
