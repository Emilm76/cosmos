'use client'
import { MyImage, Slider, ModalPlan } from '@/shared'
import styles from './plans.module.scss'
import BgImg from '@/images/demin-plan.jpg'
import clsx from 'clsx'
import { useRef, useState } from 'react'
import { useHeader } from '@/context/header-context'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'
import { useGSAP } from '@gsap/react'

type DivRef = HTMLDivElement | null

const animationHeightCount = 1
const animationHeightCSS = animationHeightCount * 100 + 'vh'

const plans: Plan[] = [
  {
    name: 'Тип 1',
    imagePath: '/img/test-plan-1.png',
    rooms: 1,
    square: 33,
    floor: 4,
    roomHeight: 3.2,
    view: 'на море',
  },
  {
    name: 'Тип 2',
    imagePath: '/img/test-plan-2.png',
    rooms: 2,
    square: 74.1,
    floor: 4,
    roomHeight: 3.2,
    view: 'на море',
  },
  {
    name: 'Тип 3',
    imagePath: '/img/test-plan-3.png',
    rooms: 2,
    square: 114.9,
    floor: 4,
    roomHeight: 3.2,
    view: 'на море',
  },
]

type Plan = {
  name: string
  imagePath: string
  rooms: number
  square: number
  floor: number
  roomHeight: number
  view: string
}

export function PlansSection() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [modalData, setModalData] = useState<Plan | null>(null)
  const { setTransparent } = useHeader()

  function handleSlideClick(planData: Plan) {
    setModalData(planData)
    setIsModalOpen(true)
    setTransparent(true)
  }

  function handleCloseModal() {
    setIsModalOpen(false)
    setTransparent(false)
  }

  const content = useRef<DivRef>(null)
  const shadow = useRef<DivRef>(null)
  const title = useRef<DivRef>(null)
  const slider = useRef<DivRef>(null)

  useGSAP(() => {
    const tl = gsap.timeline()

    tl.to(
      shadow.current,
      {
        ease: 'sine.inOut',
        duration: 1,
        delay: 1.3,
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
        duration: 1,
        delay: 1.3,
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
        duration: 1,
        delay: 1.3,
        keyframes: {
          0: { y: '20rem', opacity: 0 },
          100: { y: 0, opacity: 1 },
        },
      },
      0,
    )
  })

  return (
    <>
      <section className={styles.section}>
        <div className={styles.content} ref={content}>
          <div className={styles.wrapper}>
            <div className={clsx(styles.slide, 'slide mobile-slide')}>
              <div className={styles.bg}>
                <MyImage src={BgImg} alt="" />
                <div className={styles.shadow} ref={shadow}></div>
              </div>

              <div className={clsx(styles.slideInner, 'container')}>
                <h2 className="h2" ref={title}>
                  меню планировок
                </h2>

                <div className={styles.sliderWrapper} ref={slider}>
                  <Slider
                    slides={plans.map((plan) => ({
                      className: clsx(styles.planSlide, 'bullet-link-card'),
                      onClick: () => handleSlideClick(plan),
                      content: <Slide plan={plan} />,
                    }))}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <ModalPlan data={modalData} isOpen={isModalOpen} closeCallback={handleCloseModal} />
    </>
  )
}

function Slide({ plan }: { plan: Plan }) {
  return (
    <>
      <h3 className="h4">{plan.name}</h3>
      <div className={styles.planImg}>
        <MyImage src={plan.imagePath} width={410} height={314} alt="" />
      </div>
      <span className="bullet-link bullet-link--lg h4">подробнее</span>
    </>
  )
}
