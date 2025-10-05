'use client'
import styles from './mobile-slider.module.scss'
import useEmblaCarousel from 'embla-carousel-react'
import clsx from 'clsx'
import { ImageProps } from 'next/image'
import { MyImage } from '@/shared'
import { DotButton, useDotButton } from './dot-button'

export function MobileSlider({
  slides,
  className,
}: {
  slides: { img: ImageProps; className?: string }[]
  className?: string
}) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    breakpoints: {
      '(min-width: 1024px)': { active: false },
    },
  })

  const { selectedIndex, scrollSnaps, onDotButtonClick } = useDotButton(emblaApi)

  return (
    <div className={clsx(className, styles.slider, 'embla')}>
      <div className="embla__viewport" ref={emblaRef}>
        <div className="embla__container">
          {slides.map((slide, index) => (
            <div className={clsx(styles.slide, slide.className, 'embla__slide')} key={index}>
              <MyImage {...slide.img} key={index} />
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
