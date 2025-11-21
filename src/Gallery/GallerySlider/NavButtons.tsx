'use client'
import { EmblaCarouselType } from 'embla-carousel'
import { ComponentPropsWithRef, useCallback, useEffect, useState } from 'react'
import styles from './style.module.scss'
import { ArrowLeftIcon } from '@/shared/ui/icons/arrow-left'
import { ArrowRightIcon } from '@/shared/ui/icons/arrow-right'

export function usePrevNextButtons(
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

export function PrevButton({ ...restProps }: ComponentPropsWithRef<'button'>) {
  return (
    <button className={styles.navBtn} type="button" {...restProps}>
      <ArrowLeftIcon />
    </button>
  )
}

export function NextButton({ ...restProps }: ComponentPropsWithRef<'button'>) {
  return (
    <button className={styles.navBtn} type="button" {...restProps}>
      <ArrowRightIcon />
    </button>
  )
}
