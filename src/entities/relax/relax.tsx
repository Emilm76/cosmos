'use client'
import { MobileSlider, MyImage } from '@/shared'
import styles from './relax.module.scss'
import clsx from 'clsx'
import SeaImg from '@/images/sea-2.jpg'
import Slide1Img from '@/images/person-on-beach.jpg'
import Slide2Img from '@/images/meditation-view.jpg'
import Slide3Img from '@/images/sunset-and-mountains.jpg'
import Slide4Img from '@/images/grapes.jpg'
import Slide5Img from '@/images/white-vine.jpg'
import Slide6Img from '@/images/red-vine.jpg'
import Sea2Img from '@/images/sea-3.jpg'
import { useMediaQuery } from 'react-responsive'
import { useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import MainImg from '@/images/architecture.jpg'
import Img1 from '@/images/yacht.jpg'
import Img2 from '@/images/diving.jpg'
import Img3 from '@/images/fishing.jpg'
import Img4 from '@/images/sapboard.jpg'
import Img5 from '@/images/windserf.jpg'
import Img6 from '@/images/kiting.jpg'

gsap.registerPlugin(ScrollTrigger)
const mm = gsap.matchMedia()

type DivRef = HTMLDivElement | null

const animationHeightCount = 16
const animationHeightCSS = animationHeightCount * 100 + 'vh'

const slides2 = [
  {
    img: <MyImage src={Slide4Img} alt="" />,
    text: 'Более 70 виноделен с экскурсиями и дегустациями',
  },
  {
    img: <MyImage src={Slide5Img} alt="" />,
    text: 'Устричные и мидийные фермы',
  },
  {
    img: <MyImage src={Slide6Img} alt="" />,
    text: 'Ремесленные сыроварни и локальные продукты',
  },
]

const steps = {
  moreStart: 0,
  moreEnd: 10,
  slide2Start: 11,
  slide2RoundStart: 16,
  slide2End: 20,
  slide3Start: 21,
  slide3End: 30,
  slide4Start: 31,
  slide4End: 40,
  slide4GalleryStart: 40, // = slide4End
  slide4GalleryEnd: 50,
  slide5Start: 51,
  slide5End: 60,
  slide6Start: 61,
  slide6End: 70,
  slide6ScrollStart: 71,
  slide6ScrollEnd: 99,
}

export function RelaxSection() {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0)
  const isDesktop = useMediaQuery({ query: '(min-width: 1024px)' })
  const isMobile = useMediaQuery({ query: '(max-width: 1023px)' })

  const wrapper = useRef<DivRef>(null)
  const content = useRef<DivRef>(null)
  const seaImage = useRef<DivRef>(null)
  const title = useRef<DivRef>(null)
  const slide2 = useRef<DivRef>(null)
  const img1 = useRef<DivRef>(null)
  const img2 = useRef<DivRef>(null)
  const img3 = useRef<DivRef>(null)
  const img3Round = useRef<DivRef>(null)
  const slide3 = useRef<DivRef>(null)
  const slide3Bg = useRef<DivRef>(null)
  const slide3Inner = useRef<DivRef>(null)
  const slide4 = useRef<DivRef>(null)
  const slide5 = useRef<DivRef>(null)
  const slide5Inner = useRef<DivRef>(null)

  useGSAP(() => {
    const animationHeight = () => window.innerHeight * animationHeightCount
    const scrollHeight = () => ((title.current?.offsetWidth || 0) - window.innerWidth) * -1
    const slide5SrollHeight = () =>
      ((slide5Inner.current?.scrollHeight || 0) - (slide5.current?.offsetHeight || 0)) * -1

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
        trigger: wrapper.current,
        scrub: 0.4,
        start: 'top top',
        end: () => 'top+=' + animationHeight(),
      },
    })

    mm.add('(min-width: 1024px)', () => {
      tl.to(
        title.current,
        {
          ease: 'sine.inOut',
          keyframes: {
            [steps.moreStart]: { x: 0, y: 0 },
            [steps.moreEnd]: { x: scrollHeight, y: () => window.innerHeight * -1 },
          },
        },
        0,
      )
      tl.to(
        seaImage.current,
        {
          ease: 'sine.inOut',
          keyframes: {
            [steps.moreStart]: { scale: 1 },
            [steps.moreEnd]: { scale: 1.2 },
          },
        },
        0,
      )

      tl.to(
        slide2.current,
        {
          ease: 'sine.inOut',
          keyframes: {
            [steps.moreStart]: { y: '100%' },
            [steps.moreEnd]: { y: 0 },
            [steps.slide3Start]: { x: 0 },
            [steps.slide3End]: { x: '-130vw' },
            [steps.slide4Start]: { x: '-130vw' },
            [steps.slide4End]: { x: '-230vw' },
          },
        },
        0,
      )

      tl.to(
        img3Round.current,
        {
          ease: 'sine.inOut',
          keyframes: {
            [steps.slide2RoundStart]: { scale: 0 },
            [steps.slide2End]: { scale: 1 },
          },
        },
        0,
      )

      tl.to(
        slide3Bg.current,
        {
          ease: 'sine.inOut',
          keyframes: {
            [steps.slide4Start]: { width: '305px', height: '360px' },
            [steps.slide4End]: { width: '100vw', height: '100vh' },
          },
        },
        0,
      )

      tl.to(
        slide3.current,
        {
          ease: 'sine.inOut',
          keyframes: {
            [steps.slide4Start]: { x: '100%' },
            [steps.slide4End]: { x: 0 },
            [steps.slide5Start]: { x: 0 },
            [steps.slide5End]: { x: '-100%' },
          },
        },
        0,
      )
      tl.to(
        slide3Inner.current,
        {
          ease: 'sine.inOut',
          keyframes: {
            [steps.slide4GalleryStart]: { x: 0 },
            [steps.slide4GalleryEnd]: { x: '-75vw' },
          },
        },
        0,
      )

      tl.to(
        slide4.current,
        {
          ease: 'sine.inOut',
          keyframes: {
            [steps.slide5Start]: { x: '100%' },
            [steps.slide5End]: { x: 0 },
            [steps.slide6Start]: { x: 0 },
            [steps.slide6End]: { x: '-100%' },
          },
        },
        0,
      )

      tl.to(
        slide5.current,
        {
          ease: 'sine.inOut',
          keyframes: {
            [steps.slide6Start]: { x: '100%' },
            [steps.slide6End]: { x: 0 },
          },
        },
        0,
      )
      tl.to(
        slide5Inner.current,
        {
          ease: 'sine.inOut',
          keyframes: {
            [steps.slide6ScrollStart]: { y: 0 },
            [steps.slide6ScrollEnd]: { y: slide5SrollHeight },
          },
        },
        0,
      )
    })

    mm.add('(min-width: 1024px) and (max-width: 1599px)', () => {
      tl.to(
        img1.current,
        {
          ease: 'sine.inOut',
          keyframes: {
            [steps.slide2Start]: { y: '-100%', height: 350, width: 215 },
            [steps.slide2End]: { y: '-50%', height: 360, width: 260 },
          },
        },
        0,
      )
      tl.to(
        img2.current,
        {
          ease: 'sine.inOut',
          keyframes: {
            [steps.slide2Start]: { height: '100%', width: 430 },
            [steps.slide2End]: { height: 360, width: 340 },
          },
        },
        0,
      )
      tl.to(
        img3.current,
        {
          ease: 'sine.inOut',
          keyframes: {
            [steps.slide2Start]: { y: '100%', height: 350, width: 215 },
            [steps.slide2End]: { y: '50%', height: 360, width: 260 },
          },
        },
        0,
      )
    })
    mm.add('(min-width: 1600px)', () => {
      tl.to(
        img1.current,
        {
          ease: 'sine.inOut',
          keyframes: {
            [steps.slide2Start]: { y: '-100%', height: 440, width: 320 },
            [steps.slide2End]: { y: '-50%', height: 440, width: 320 },
          },
        },
        0,
      )
      tl.to(
        img2.current,
        {
          ease: 'sine.inOut',
          keyframes: {
            [steps.slide2Start]: { height: '100%', width: '36.5%' },
            [steps.slide2End]: { height: 440, width: 460 },
          },
        },
        0,
      )
      tl.to(
        img3.current,
        {
          ease: 'sine.inOut',
          keyframes: {
            [steps.slide2Start]: { y: '100%', height: 440, width: 320 },
            [steps.slide2End]: { y: '50%', height: 440, width: 320 },
          },
        },
        0,
      )
    })
  })

  const slide = slides2[currentSlideIndex]

  return (
    <section className={styles.section} style={{ marginBottom: animationHeightCSS }} ref={wrapper}>
      <div className={styles.content} ref={content}>
        <div className={styles.wrapper}>
          <div className={clsx(styles.slide1, 'slide mobile-slide')}>
            <div className={styles.seaImage} ref={seaImage}>
              <MyImage src={SeaImg} sizes="(max-width: 768px) 100vh, 100vw" alt="" />
            </div>
            <h2 className={clsx(styles.title, 'h1')} ref={title}>
              <span>Когда каждый день — открытие</span>
            </h2>
          </div>

          <div
            className={clsx(styles.slide2, 'white-section slide mobile-slide m3-slide2')}
            ref={slide2}
          >
            {isMobile && (
              <MobileSlider
                slides={[
                  { className: styles.img, content: <MyImage src={Slide1Img} alt="" /> },
                  { className: styles.img, content: <MyImage src={Slide2Img} alt="" /> },
                  { className: styles.img, content: <MyImage src={Slide3Img} alt="" /> },
                ]}
              />
            )}
            {isDesktop && (
              <>
                <div className={styles.img1} ref={img1}>
                  <MyImage src={Slide1Img} alt="" />
                </div>
                <div className={styles.img2} ref={img2}>
                  <MyImage src={Slide2Img} alt="" />
                </div>
                <div className={styles.img3} ref={img3}>
                  <div className={styles.img3Round} ref={img3Round}></div>
                  <MyImage src={Slide3Img} alt="" />
                </div>
              </>
            )}
            <div className={clsx(styles.text, 'container')}>
              <h2 className="h2">
                Природа <br />
                и здоровье
              </h2>
              <p>
                Природа Евпатории представлена степным ландшафтом, Чёрным морем и целебными
                лиманами, такими как Мойнакское и Сасык-Сиваш, богатыми лечебной грязью и рапой.
              </p>
            </div>
          </div>

          <div
            className={clsx(styles.slide3, 'white-section slide mobile-slide m3-slide3')}
            ref={slide3}
          >
            <div className={styles.bg} ref={slide3Bg}>
              <MyImage src={Sea2Img} alt="" />
              <div className={styles.shadow}></div>
            </div>
            <div className={styles.slideInner} ref={slide3Inner}>
              {isMobile && (
                <>
                  <MobileSlider
                    onSlideChange={setCurrentSlideIndex}
                    slides={[
                      { className: styles.img, content: <MyImage src={Slide4Img} alt="" /> },
                      { className: styles.img, content: <MyImage src={Slide5Img} alt="" /> },
                      { className: styles.img, content: <MyImage src={Slide6Img} alt="" /> },
                    ]}
                  />
                  <div className={clsx(styles.text, 'container')}>
                    <h2 className="h2">Гастрономия</h2>
                    <p>{slide.text}</p>
                  </div>
                </>
              )}
              {isDesktop && (
                <>
                  <div className={styles.gastroGrid}>
                    <div className={styles.li}>
                      <div className={styles.img}>{slides2[0].img}</div>
                      <p>{slides2[0].text}</p>
                    </div>
                    <div className={styles.li}>
                      <div className={styles.img}>{slides2[1].img}</div>
                      <p>{slides2[1].text}</p>
                    </div>
                    <div className={styles.li}>
                      <div className={styles.img}>{slides2[2].img}</div>
                      <p>{slides2[2].text}</p>
                    </div>
                  </div>
                  <div className={clsx(styles.text, 'container')}>
                    <h2 className="h2">Гастрономия</h2>
                  </div>
                </>
              )}
            </div>
          </div>

          <div
            className={clsx(styles.slide4, 'black-section slide mobile-slide m3-slide4')}
            ref={slide4}
          >
            <div className={styles.image}>
              <MyImage src={MainImg} sizes="(max-width: 768px) 50vh" alt="" />
            </div>
            <div className={clsx(styles.container, 'container')}>
              <h2 className="h3">
                Культура <br />и архитектура
              </h2>
              <p>
                Евпатория — город с историей более 2500 лет, сохранивший уникальные памятники,
                старинные улочки и атмосферу разных эпох. С 1914 года символом города по праву
                считается легендарный трамвай желаний.
              </p>
            </div>
          </div>

          <div
            className={clsx(styles.slide5, 'black-section slide mobile-slide m3-slide5')}
            ref={slide5}
          >
            <div
              className={clsx(styles.container, 'container m3-slide5-container')}
              ref={slide5Inner}
            >
              <h2 className="h3">Активный отдых</h2>
              <div className={styles.cardsGrid}>
                <div className={styles.card}>
                  <div className={styles.cardInner}>
                    <div className={styles.image}>
                      <MyImage src={Img1} alt="" />
                    </div>
                    <h3 className="subtitle">Яхтинг</h3>
                  </div>
                </div>
                <div className={styles.card}>
                  <div className={styles.cardInner}>
                    <div className={styles.image}>
                      <MyImage src={Img2} alt="" />
                    </div>
                    <h3 className="subtitle">Дайвинг</h3>
                  </div>
                </div>
                <div className={styles.card}>
                  <div className={styles.cardInner}>
                    <div className={styles.image}>
                      <MyImage src={Img3} alt="" />
                    </div>
                    <h3 className="subtitle">Морская рыбалка</h3>
                  </div>
                </div>
                <div className={styles.card}>
                  <div className={styles.cardInner}>
                    <div className={styles.image}>
                      <MyImage src={Img4} alt="" />
                    </div>
                    <h3 className="subtitle">Сапборды</h3>
                  </div>
                </div>
                <div className={styles.card}>
                  <div className={styles.cardInner}>
                    <div className={styles.image}>
                      <MyImage src={Img5} alt="" />
                    </div>
                    <h3 className="subtitle">Виндсёрфинг</h3>
                  </div>
                </div>
                <div className={styles.card}>
                  <div className={styles.cardInner}>
                    <div className={styles.image}>
                      <MyImage src={Img6} alt="" />
                    </div>
                    <h3 className="subtitle">Кайтинг</h3>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
