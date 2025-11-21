'use client'
import React from 'react'
import { NextButton, PrevButton, usePrevNextButtons } from './NavButtons'
import styles from './style.module.scss'
import { SelectedSnapDisplay, useSelectedSnapDisplay } from './SelectedSnap'
import { EmblaCarouselType } from 'embla-carousel'

export function Controls({ emblaApi }: { emblaApi: EmblaCarouselType | undefined }) {
  const { prevBtnDisabled, nextBtnDisabled, onPrevButtonClick, onNextButtonClick } =
    usePrevNextButtons(emblaApi)

  const { selectedSnap, snapCount } = useSelectedSnapDisplay(emblaApi)

  return (
    <div className={styles.controls}>
      <PrevButton onClick={onPrevButtonClick} disabled={prevBtnDisabled} />
      <SelectedSnapDisplay selectedSnap={selectedSnap} snapCount={snapCount} />
      <NextButton onClick={onNextButtonClick} disabled={nextBtnDisabled} />
    </div>
  )
}
