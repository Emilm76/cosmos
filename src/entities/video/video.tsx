'use client'
import styles from './video.module.scss'
import Img1 from '@/images/hall.jpg'
import Img2 from '@/images/sauna.jpg'
import Img3 from '@/images/bar-2.jpg'
import Img4 from '@/images/sofa.jpg'
import Img5 from '@/images/stairs.jpg'
import Img6 from '@/images/sauna-2.jpg'
import clsx from 'clsx'
import { useMediaQuery } from 'react-responsive'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { useRef, useState } from 'react'
import BgImg from '@/images/bedroom.jpg'
import { MyImage } from '@/shared/ui/image/image'
import { MobileSlider } from '@/shared/ui/slider/mobile-slider'

gsap.registerPlugin(ScrollTrigger)

type DivRef = HTMLDivElement | null

const animationHeightCount = 2.5
const animationHeightCSS = animationHeightCount * 100 + 'vh'

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

export function VideoSection() {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0)
  const isDesktop = useMediaQuery({ query: '(min-width: 1024px)' })
  const isMobile = useMediaQuery({ query: '(max-width: 1023px)' })

  const content = useRef<DivRef>(null)
  const galleryGrid = useRef<DivRef>(null)
  const slide1 = useRef<DivRef>(null)
  const slide2 = useRef<DivRef>(null)

  useGSAP(() => {
    const mm = gsap.matchMedia()

    mm.add('(min-width: 1024px)', () => {
      const animationHeight = () => window.innerHeight * animationHeightCount

      // For pinning effect
      ScrollTrigger.create({
        trigger: content.current,
        start: 'top top',
        end: 'max',
        scrub: true,
        pin: true,
        pinSpacing: false,
      })

      // For animation
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: content.current,
          scrub: 0.4,
          start: 'top top',
          end: () => 'top+=' + animationHeight(),
        },
      })

      tl.to(
        galleryGrid.current,
        {
          ease: 'sine.inOut',
          keyframes: {
            0: { scale: 1 },
            50: { scale: 2.6 },
          },
        },
        0,
      )

      tl.to(
        slide1.current,
        {
          ease: 'sine.inOut',
          keyframes: {
            50: { x: 0 },
            99: { x: '-100%' },
          },
        },
        0,
      )
      tl.to(
        slide2.current,
        {
          ease: 'sine.inOut',
          keyframes: {
            50: { x: '100%' },
            99: { x: 0 },
          },
        },
        0,
      )
    })
  })

  const slide = slides[currentSlideIndex]

  return (
    <section className={styles.section} style={{ marginBottom: animationHeightCSS }}>
      <div className={styles.content} ref={content}>
        <div className={styles.wrapper}>
          <div className={clsx(styles.slide, 'slide mobile-slide m3-slide12')} ref={slide1}>
            {isMobile && (
              <MobileSlider
                className={styles.slider}
                slides={[
                  { className: styles.img, content: <Video /> },
                  { className: styles.img, content: <MyImage src={Img1} alt="" /> },
                  { className: styles.img, content: <MyImage src={Img2} alt="" /> },
                  { className: styles.img, content: <MyImage src={Img3} quality={60} alt="" /> },
                  { className: styles.img, content: <MyImage src={Img4} quality={60} alt="" /> },
                  { className: styles.img, content: <MyImage src={Img5} alt="" /> },
                  { className: styles.img, content: <MyImage src={Img6} alt="" /> },
                ]}
              />
            )}

            {isDesktop && (
              <div className={styles.gridContainer}>
                <div className={styles.videoContainer}>
                  <Video />
                </div>

                <div className={styles.grid} ref={galleryGrid}>
                  <div className={styles.column}>
                    <div className={styles.columnInner}>
                      <div className={styles.item}>
                        <MyImage src={Img1} alt="" />
                      </div>
                      <div className={styles.item}>
                        <MyImage src={Img2} alt="" />
                      </div>
                    </div>
                  </div>
                  <div className={clsx(styles.column, styles.centerColumn)}>
                    <div className={styles.columnInner}>
                      <div className={styles.item}>
                        <MyImage src={Img3} alt="" />
                      </div>
                      <div className={styles.item}>
                        {/* <img src="img/video-preview.jpg" alt="" /> */}
                      </div>
                      <div className={styles.item}>
                        <MyImage src={Img4} alt="" />
                      </div>
                    </div>
                  </div>
                  <div className={styles.column}>
                    <div className={styles.columnInner}>
                      <div className={styles.item}>
                        <MyImage src={Img5} alt="" />
                      </div>
                      <div className={styles.item}>
                        <MyImage src={Img6} alt="" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className={clsx(styles.slide2, 'slide mobile-slide m3-slide13')} ref={slide2}>
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

function Video() {
  const isDev = process.env.NODE_ENV === 'development'

  if (isDev) {
    // if dev
    return <img src="/video-preview.jpg" alt="" />
  }

  // if prod
  return (
    <iframe
      src="https://kinescope.io/embed/i6BH3exsTVaH2EPmWue32J"
      allow="autoplay; fullscreen; picture-in-picture; encrypted-media; gyroscope; accelerometer; clipboard-write; screen-wake-lock;"
      allowFullScreen
      width="100%"
      height="100%"
    ></iframe>
  )
}
