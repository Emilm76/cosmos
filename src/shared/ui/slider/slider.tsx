'use client'
import styles from './slider.module.scss'
import useEmblaCarousel from 'embla-carousel-react'
import clsx from 'clsx'
import { DotButton, useDotButton } from './dot-button'
import { ReactNode } from 'react'

export function Slider({
  slides,
  className,
}: {
  slides: {
    content: ReactNode
    className?: string
    onClick?: () => void
  }[]
  className?: string
}) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ align: 'start' })

  const { selectedIndex, scrollSnaps, onDotButtonClick } = useDotButton(emblaApi)

  return (
    <div className={clsx(className, styles.slider, 'embla')}>
      <div className="embla__viewport" ref={emblaRef}>
        <div className="embla__container">
          {slides.map((slide, index) => (
            <div
              className={clsx(styles.slide, slide.className, 'embla__slide')}
              onClick={slide.onClick}
              key={index}
            >
              {slide.content}
            </div>
          ))}
        </div>
      </div>
      {scrollSnaps.length > 1 && (
        <div className={styles.dots}>
          {scrollSnaps.map((_, index) => (
            <DotButton
              onClick={() => onDotButtonClick(index)}
              className={clsx(styles.dot, index === selectedIndex && styles.selected)}
              key={index}
            />
          ))}
        </div>
      )}
    </div>
  )
}
