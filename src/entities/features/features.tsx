'use client'
import { MobileSlider, MyImage } from '@/shared'
import styles from './features.module.scss'
import BgImg from '@/images/bedroom.jpg'
import Img1 from '@/images/plans.jpg'
import Img2 from '@/images/sea-and-woman.jpg'
import Img3 from '@/images/kitchen.jpg'
import clsx from 'clsx'
import { useMediaQuery } from 'react-responsive'
import { useState } from 'react'

const slides = [
  {
    img: <MyImage src={Img1} alt="" />,
    title: (
      <>
        Разнообразные <br />
        планировки
      </>
    ),
    text: 'Для комфортной жизни и отдыха',
  },
  {
    img: <MyImage src={Img2} alt="" />,
    title: (
      <>
        Панорамные виды <br />
        на море
      </>
    ),
    text: 'Каждое утро — как картина',
  },
  {
    img: <MyImage src={Img3} alt="" />,
    title: (
      <>
        Дизайнерский <br />
        ремонт
      </>
    ),
    text: 'Эстетика премиального интерьера в каждом номере',
  },
]

export function FeaturesSection() {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0)
  const isDesktop = useMediaQuery({ query: '(min-width: 1024px)' })
  const isMobile = useMediaQuery({ query: '(max-width: 1023px)' })

  const slide = slides[currentSlideIndex]

  return (
    <section className={styles.section}>
      <div className={styles.content}>
        <div className={styles.wrapper}>
          <div className={clsx(styles.slide, 'slide mobile-slide active')}>
            <div className={styles.bg}>
              <MyImage src={BgImg} quality={70} alt="" />
            </div>

            <div className={styles.slideInner}>
              {isMobile && (
                <div className={styles.mobileContent}>
                  <MobileSlider
                    onSlideChange={setCurrentSlideIndex}
                    slides={slides.map((slide) => ({ className: styles.img, content: slide.img }))}
                  />
                  <div className={clsx(styles.text, 'container')}>
                    <h3 className="subtitle">{slide.title}</h3>
                    <p>{slide.text}</p>
                  </div>
                </div>
              )}

              {isDesktop && (
                <div className={clsx(styles.desktopContent, 'container')}>
                  {slides.map((slide, index) => (
                    <div className={styles.card} key={index}>
                      <div className={styles.cardImg}>{slide.img}</div>

                      <div className={styles.cardContent}>
                        <h3 className="subtitle">{slide.title}</h3>
                        <p>{slide.text}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
