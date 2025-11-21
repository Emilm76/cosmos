'use client'
import React from 'react'
import type { Gallery as GalleryType } from '@/admin/payload-types'
import { getMediaUrl } from '@/utilities/getMediaUrl'
import useEmblaCarousel from 'embla-carousel-react'
import { LazyLoadImage } from './LayLoadImage'
import { useCallback, useEffect, useState } from 'react'
import { EmblaCarouselType } from 'embla-carousel'
import { Controls } from './Controls'

export const GallerySlider: React.FC<{ data: GalleryType }> = ({ data }) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ align: 'start' })
  const [slidesInView, setSlidesInView] = useState<number[]>([])

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

  const slides = data?.gallerySlider || []

  return (
    <div className="embla">
      <div className="embla__viewport" ref={emblaRef}>
        <div className="embla__container">
          {slides.map((slide, index) => {
            const image = typeof slide.image === 'number' ? '' : slide.image.url

            return (
              <LazyLoadImage
                imgSrc={getMediaUrl(image)}
                alt=""
                index={index}
                inView={slidesInView.indexOf(index) > -1}
                key={index}
              />
            )
          })}
        </div>
      </div>
      <Controls emblaApi={emblaApi} />
    </div>
  )
}
