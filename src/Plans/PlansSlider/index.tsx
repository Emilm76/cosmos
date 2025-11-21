'use client'
import React, { useRef, useState } from 'react'
import type { Floor as FloorType, Plan as PlanType } from '@/admin/payload-types'
import { ModalPlan } from '@/shared/ui/modal/modal-plan'
import { Slider } from '@/shared/ui/slider/slider'
import { ImagePriority, MyImage } from '@/shared/ui/image/image'
import clsx from 'clsx'
import styles from './plans.module.scss'
import { useHeader } from '@/context/header-context'
import { useIsLoadingStore } from '@/store'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import BgImg from '@/images/demin-plan.jpg'
import { getMediaUrl } from '@/utilities/getMediaUrl'

type DivRef = HTMLDivElement | null

export const PlansSlider: React.FC<{ data: PlanType }> = ({ data }) => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [modalData, setModalData] = useState<FloorType | null>(null)
  const { setTransparent } = useHeader()

  const content = useRef<DivRef>(null)
  const shadow = useRef<DivRef>(null)
  const title = useRef<DivRef>(null)
  const slider = useRef<DivRef>(null)

  const isLoading = useIsLoadingStore((s) => s.isLoading)

  function handleSlideClick(planData: FloorType | null) {
    setModalData(planData)
    setIsModalOpen(true)
    setTransparent(true)
  }

  function handleCloseModal() {
    setIsModalOpen(false)
    setTransparent(false)
  }

  useGSAP(() => {
    if (isLoading) return

    const tl = gsap.timeline()

    tl.to(
      shadow.current,
      {
        ease: 'sine.inOut',
        duration: 0.8,
        keyframes: {
          0: { opacity: 0 },
          90: { opacity: 1 },
        },
      },
      0,
    )
    tl.to(
      title.current,
      {
        ease: 'sine.inOut',
        duration: 0.8,
        keyframes: {
          0: { y: '10rem', opacity: 0 },
          100: { y: 0, opacity: 1 },
        },
      },
      0,
    )
    tl.to(
      slider.current,
      {
        ease: 'sine.inOut',
        duration: 0.8,
        keyframes: {
          0: { y: '20rem', opacity: 0 },
          100: { y: 0, opacity: 1 },
        },
      },
      0,
    )
  }, [isLoading])

  const slides = data?.plansSlider || []

  return (
    <>
      <section className={styles.section}>
        <div className={styles.content} ref={content}>
          <div className={styles.wrapper}>
            <div className={clsx(styles.slide, 'slide mobile-slide')}>
              <div className={styles.bg}>
                <ImagePriority src={BgImg} alt="" />
                <div className={styles.shadow} ref={shadow}></div>
              </div>

              <div className={clsx(styles.slideInner, 'container')}>
                <h2 className="h2" ref={title}>
                  меню планировок
                </h2>

                <div className={styles.sliderWrapper} ref={slider}>
                  <Slider
                    slides={slides.map((slide) => {
                      const plan = typeof slide.plan === 'number' ? null : slide.plan

                      return {
                        className: clsx(styles.planSlide, 'bullet-link-card'),
                        onClick: () => handleSlideClick(plan),
                        content: plan && <Slide plan={plan} />,
                      }
                    })}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {modalData && (
        <ModalPlan data={modalData} isOpen={isModalOpen} closeCallback={handleCloseModal} />
      )}
    </>
  )
}

function Slide({ plan }: { plan: FloorType }) {
  const image = typeof plan.poster === 'number' ? '' : plan.poster.url

  return (
    <>
      <h3 className="h4">{plan.name}</h3>
      <div className={styles.planImg}>
        <MyImage src={getMediaUrl(image)} width={410} height={314} alt="" />
      </div>
      <span className="bullet-link bullet-link--lg h4">подробнее</span>
    </>
  )
}
