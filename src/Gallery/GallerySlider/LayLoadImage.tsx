'use client'
import clsx from 'clsx'
import Image from 'next/image'
import { useCallback, useState } from 'react'
import styles from './style.module.scss'

export function LazyLoadImage({
  imgSrc,
  alt,
  inView,
}: {
  imgSrc: string
  alt?: string | null
  index: number
  inView: boolean
}) {
  const [hasLoaded, setHasLoaded] = useState(false)

  const setLoaded = useCallback(() => {
    if (inView) setHasLoaded(true)
  }, [inView, setHasLoaded])

  return (
    <div className={clsx(styles.slide, 'embla__slide')}>
      {!hasLoaded && <span className={styles.spinner} />}
      {inView && (
        <Image
          className={styles.slideImg}
          width={1920}
          height={1080}
          src={imgSrc}
          onLoad={setLoaded}
          alt={alt ?? ''}
        />
      )}
    </div>
  )
}
