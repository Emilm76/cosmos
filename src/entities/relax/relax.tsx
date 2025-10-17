'use client'
import { ImagePriority, MobileSlider, MyImage } from '@/shared'
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

const animationHeightCount = 9
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
  start: 0,
  slide2: 5,
  slide2Round: 10, //
  slide3: 18,
  slide4: 33,
  slide4Gallery: 47, //
  slide5: 57,
  slide6: 72,
  slide6Scroll: 87,
  end: 100,
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
  const slide5Grid = useRef<DivRef>(null)

  useGSAP(() => {
    const animationHeight = () => window.innerHeight * animationHeightCount
    const offsetTitle = () => ((title.current?.offsetWidth || 0) - window.innerWidth) * -1
    const slide5SrollHeight = () =>
      ((slide5Grid.current?.offsetHeight || 0) - (slide5Inner.current?.offsetHeight || 0)) * -1

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
            [steps.start]: { x: 0, y: 0 },
            [steps.slide2]: { x: offsetTitle, y: () => window.innerHeight * -1 },
          },
        },
        0,
      )
      tl.to(
        seaImage.current,
        {
          ease: 'sine.inOut',
          keyframes: {
            [steps.start]: { scale: 1 },
            [steps.slide2]: { scale: 1.2 },
          },
        },
        0,
      )

      tl.to(
        slide2.current,
        {
          ease: 'sine.inOut',
          keyframes: {
            [steps.start]: { y: '100%' },
            [steps.slide2]: { y: 0 },
            [steps.slide3]: { x: 0 },
            [steps.slide4]: { x: '-140vw' },
            [steps.slide4Gallery]: { x: '-240vw' },
          },
        },
        0,
      )

      tl.to(
        img3Round.current,
        {
          ease: 'sine.inOut',
          keyframes: {
            [steps.slide2Round]: { scale: 0 },
            [steps.slide3]: { scale: 1 },
          },
        },
        0,
      )

      tl.to(
        slide3Bg.current,
        {
          ease: 'sine.inOut',
          keyframes: {
            [steps.slide4]: { width: '305px', height: '360px' },
            [steps.slide4Gallery]: { width: '100.2vw', height: '100vh' },
          },
        },
        0,
      )

      tl.to(
        slide3.current,
        {
          ease: 'sine.inOut',
          keyframes: {
            [steps.slide4]: { x: '100vw' },
            [steps.slide4Gallery]: { x: '-0.2vw' },
            [steps.slide5]: { x: '-0.2vw' },
            [steps.slide6]: { x: '-120.2vw' },
          },
        },
        0,
      )
      tl.to(
        slide3Inner.current,
        {
          ease: 'sine.inOut',
          keyframes: {
            [steps.slide4Gallery]: { x: 0 },
            [steps.slide5]: { x: '-75vw' },
          },
        },
        0,
      )

      tl.to(
        slide4.current,
        {
          ease: 'sine.inOut',
          keyframes: {
            [steps.slide5]: { x: '100vw' },
            [steps.slide6]: { x: '-20vw' },
            [steps.slide6Scroll]: { x: '-160vw' },
          },
        },
        0,
      )

      tl.to(
        slide5.current,
        {
          ease: 'sine.inOut',
          keyframes: {
            [steps.slide6]: { x: '119.8vw' },
            [steps.slide6Scroll]: { x: '-20.2vw' },
          },
        },
        0,
      )
      tl.to(
        slide5Grid.current,
        {
          ease: 'sine.inOut',
          keyframes: {
            [steps.slide6Scroll]: { y: 0 },
            [steps.end]: { y: slide5SrollHeight },
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
            [steps.slide2]: { y: '-100%', height: 350, width: 215 },
            [steps.slide3]: { y: '-50%', height: 360, width: 260 },
          },
        },
        0,
      )
      tl.to(
        img2.current,
        {
          ease: 'sine.inOut',
          keyframes: {
            [steps.slide2]: { height: '100%', width: 430 },
            [steps.slide3]: { height: 360, width: 340 },
          },
        },
        0,
      )
      tl.to(
        img3.current,
        {
          ease: 'sine.inOut',
          keyframes: {
            [steps.slide2]: { y: '100%', height: 350, width: 215 },
            [steps.slide3]: { y: '50%', height: 360, width: 260 },
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
            [steps.slide2]: { y: '-100%', height: 440, width: 320 },
            [steps.slide3]: { y: '-50%', height: 440, width: 320 },
          },
        },
        0,
      )
      tl.to(
        img2.current,
        {
          ease: 'sine.inOut',
          keyframes: {
            [steps.slide2]: { height: '100%', width: '36.5%' },
            [steps.slide3]: { height: 440, width: 460 },
          },
        },
        0,
      )
      tl.to(
        img3.current,
        {
          ease: 'sine.inOut',
          keyframes: {
            [steps.slide2]: { y: '100%', height: 440, width: 320 },
            [steps.slide3]: { y: '50%', height: 440, width: 320 },
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
              <ImagePriority src={SeaImg} sizes="(max-width: 768px) 100vh, 100vw" alt="" />
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
            <div className={styles.textWrapper}>
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
            <div className={styles.slide4Inner}>
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
          </div>

          <div
            className={clsx(styles.slide5, 'black-section slide mobile-slide m3-slide5')}
            ref={slide5}
          >
            <div
              className={clsx(styles.container, 'container m3-slide5-container')}
              ref={slide5Inner}
            >
              <div className={styles.grid}>
                <h2 className="h3">Активный отдых</h2>
                <div className={styles.cardsGrid} ref={slide5Grid}>
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
      </div>
    </section>
  )
}
