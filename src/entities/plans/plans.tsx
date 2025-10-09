'use client'
import { MyImage, Slider, ModalPlan } from '@/shared'
import styles from './plans.module.scss'
import BgImg from '@/images/demin-plan.jpg'
import clsx from 'clsx'
import { useState } from 'react'
import { Plan } from '@/backend/cases-list/domain/plan'
import { useHeader } from '@/context/header-context'

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

  return (
    <>
      <section className={styles.section}>
        <div className={styles.content}>
          <div className={styles.wrapper}>
            <div className={clsx(styles.slide, 'slide mobile-slide active')}>
              <div className={styles.bg}>
                <MyImage src={BgImg} alt="" />
              </div>

              <div className={clsx(styles.slideInner, 'container')}>
                <h2 className="h2">меню планировок</h2>

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
