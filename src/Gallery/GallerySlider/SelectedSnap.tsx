'use client'
import clsx from 'clsx'
import { EmblaCarouselType } from 'embla-carousel'
import { useCallback, useEffect, useState } from 'react'
import styles from './style.module.scss'

export function useSelectedSnapDisplay(emblaApi: EmblaCarouselType | undefined): {
  selectedSnap: number
  snapCount: number
} {
  const [selectedSnap, setSelectedSnap] = useState(0)
  const [snapCount, setSnapCount] = useState(0)

  const updateScrollSnapState = useCallback((emblaApi: EmblaCarouselType) => {
    setSnapCount(emblaApi.scrollSnapList().length)
    setSelectedSnap(emblaApi.selectedScrollSnap())
  }, [])

  useEffect(() => {
    if (!emblaApi) return

    updateScrollSnapState(emblaApi)
    emblaApi.on('select', updateScrollSnapState)
    emblaApi.on('reInit', updateScrollSnapState)
  }, [emblaApi, updateScrollSnapState])

  return {
    selectedSnap,
    snapCount,
  }
}

export function SelectedSnapDisplay({
  selectedSnap,
  snapCount,
}: {
  selectedSnap: number
  snapCount: number
}) {
  return (
    <>
      <div className="h2">{String(selectedSnap + 1).padStart(2, '0')}</div>
      <div className={styles.hr}></div>
      <div className={clsx(styles.sountSlides, 'h2')}>{String(snapCount).padStart(2, '0')}</div>
    </>
  )
}
