'use client'
import clsx from 'clsx'
import { ComponentPropsWithRef, useCallback, useEffect, useState } from 'react'
import styles from './gallery.module.scss'
import useEmblaCarousel from 'embla-carousel-react'
import { EmblaCarouselType } from 'embla-carousel'
import Image from 'next/image'
import { ArrowLeftIcon, ArrowRightIcon } from '@/shared'
import { GalleryImage } from '@/backend/gallery'
import { useCurtainStore } from '@/store'

export function Gallery({ images }: { images: GalleryImage[] }) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ align: 'start' })
  const [slidesInView, setSlidesInView] = useState<number[]>([])
  const isOpen = useCurtainStore((s) => s.isGalleryOpen)

  const { prevBtnDisabled, nextBtnDisabled, onPrevButtonClick, onNextButtonClick } =
    usePrevNextButtons(emblaApi)

  const updateSlidesInView = useCallback((emblaApi: EmblaCarouselType) => {
    setSlidesInView((slidesInView) => {
      if (slidesInView.length === emblaApi.slideNodes().length) {
        emblaApi.off('slidesInView', updateSlidesInView)
      }
      const inView = emblaApi.slidesInView().filter((index) => !slidesInView.includes(index))
      return slidesInView.concat(inView)
    })
  }, [])

  useEffect(() => {
    if (!emblaApi) return

    updateSlidesInView(emblaApi)
    emblaApi.on('slidesInView', updateSlidesInView)
    emblaApi.on('reInit', updateSlidesInView)
  }, [emblaApi, updateSlidesInView])

  const { selectedSnap, snapCount } = useSelectedSnapDisplay(emblaApi)

  const list = images ?? []

  return (
    <div className={clsx(styles.modal, isOpen && styles.open)}>
      <div className="embla">
        <div className="embla__viewport" ref={emblaRef}>
          <div className="embla__container">
            {list.map((slide, index) => (
              <LazyLoadImage
                imgSrc={slide.url}
                alt=""
                index={index}
                inView={slidesInView.indexOf(index) > -1}
                key={index}
              />
            ))}
          </div>
        </div>
        <div className={styles.controls}>
          <PrevButton onClick={onPrevButtonClick} disabled={prevBtnDisabled} />
          <SelectedSnapDisplay selectedSnap={selectedSnap} snapCount={snapCount} />
          <NextButton onClick={onNextButtonClick} disabled={nextBtnDisabled} />
        </div>
      </div>
    </div>
  )
}

function LazyLoadImage({
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

function usePrevNextButtons(
  emblaApi: EmblaCarouselType | undefined,
  onButtonClick?: (emblaApi: EmblaCarouselType) => void,
): {
  prevBtnDisabled: boolean
  nextBtnDisabled: boolean
  onPrevButtonClick: () => void
  onNextButtonClick: () => void
} {
  const [prevBtnDisabled, setPrevBtnDisabled] = useState(true)
  const [nextBtnDisabled, setNextBtnDisabled] = useState(true)

  const onPrevButtonClick = useCallback(() => {
    if (!emblaApi) return
    emblaApi.scrollPrev()
    if (onButtonClick) onButtonClick(emblaApi)
  }, [emblaApi, onButtonClick])

  const onNextButtonClick = useCallback(() => {
    if (!emblaApi) return
    emblaApi.scrollNext()
    if (onButtonClick) onButtonClick(emblaApi)
  }, [emblaApi, onButtonClick])

  const onSelect = useCallback((emblaApi: EmblaCarouselType) => {
    setPrevBtnDisabled(!emblaApi.canScrollPrev())
    setNextBtnDisabled(!emblaApi.canScrollNext())
  }, [])

  useEffect(() => {
    if (!emblaApi) return

    onSelect(emblaApi)
    emblaApi.on('reInit', onSelect).on('select', onSelect)
  }, [emblaApi, onSelect])

  return {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick,
  }
}

function PrevButton({ ...restProps }: ComponentPropsWithRef<'button'>) {
  return (
    <button className={styles.navBtn} type="button" {...restProps}>
      <ArrowLeftIcon />
    </button>
  )
}

function NextButton({ ...restProps }: ComponentPropsWithRef<'button'>) {
  return (
    <button className={styles.navBtn} type="button" {...restProps}>
      <ArrowRightIcon />
    </button>
  )
}

function useSelectedSnapDisplay(emblaApi: EmblaCarouselType | undefined): {
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

function SelectedSnapDisplay({
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
