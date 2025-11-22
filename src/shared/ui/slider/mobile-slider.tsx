'use client'
import styles from './mobile-slider.module.scss'
import useEmblaCarousel from 'embla-carousel-react'
import clsx from 'clsx'
import { DotButton, useDotButton } from './dot-button'
import { ReactNode, useCallback, useEffect } from 'react'
import { EmblaCarouselType } from 'embla-carousel'
import Fade from 'embla-carousel-fade'
import Autoplay from 'embla-carousel-autoplay'

export function MobileSlider({
  slides,
  className,
  onSlideChange,
}: {
  slides: {
    content: ReactNode
    className?: string
  }[]
  className?: string
  onSlideChange?: (number: number) => void
}) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, duration: 22 }, [
    Fade(),
    Autoplay({ stopOnInteraction: false }),
  ])

  const { selectedIndex, scrollSnaps, onDotButtonClick } = useDotButton(emblaApi)

  const callbackSlideSelect = useCallback(
    (emblaApi: EmblaCarouselType) => {
      if (onSlideChange) onSlideChange(emblaApi.selectedScrollSnap())
    },
    [onSlideChange],
  )

  useEffect(() => {
    if (emblaApi && onSlideChange) emblaApi.on('select', callbackSlideSelect)
  }, [emblaApi, callbackSlideSelect, onSlideChange])

  return (
    <div className={clsx(className, styles.slider, 'embla')}>
      <div className="embla__viewport" ref={emblaRef}>
        <div className="embla__container">
          {slides.map((slide, index) => (
            <div className={clsx(styles.slide, slide.className, 'embla__slide')} key={index}>
              {slide.content}
            </div>
          ))}
        </div>
      </div>
      <div className={styles.dots}>
        {scrollSnaps.map((_, index) => (
          <DotButton
            onClick={() => onDotButtonClick(index)}
            className={clsx(styles.dot, index === selectedIndex && styles.selected)}
            key={index}
          />
        ))}
      </div>
    </div>
  )
}
