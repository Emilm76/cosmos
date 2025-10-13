'use client'
import styles from './object.module.scss'
import { useRef } from 'react'
import clsx from 'clsx'
import { MyImage } from '@/shared'
import SeaImg from '@/images/sea.jpg'
import BeachImg from '@/images/beach-2.jpg'
import Beach2Img from '@/images/beach-3.jpg'
import RichManImg from '@/images/rich-man.jpg'
import FriendsImg from '@/images/friends.jpg'
import { MobileSlider } from '@/shared'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { useMediaQuery } from 'react-responsive'

gsap.registerPlugin(ScrollTrigger)

type DivRef = HTMLDivElement | null

const animationHeightCount = 6
const animationHeightCSS = animationHeightCount * 100 + 'vh'

const steps = {
  sideBarsStart: 0,
  imgOpacityStart: 10,
  imgOpacityEnd: 25,
  sideBarsEnd: 30,
  sideBarsBackStart: 31,
  sideBarsBackEnd: 65,
  slide2Start: 66,
  subtitle2Start: 70,
  slide2End: 99,
}

export function ObjectSection() {
  const isDesktop = useMediaQuery({ query: '(min-width: 1024px)' })
  const isMobile = useMediaQuery({ query: '(max-width: 1023px)' })

  const content = useRef<DivRef>(null)
  const slide2 = useRef<DivRef>(null)
  const slide3 = useRef<DivRef>(null)
  const leftSide = useRef<DivRef>(null)
  const rightSide = useRef<DivRef>(null)
  const bg = useRef<DivRef>(null)
  const subtitle = useRef<DivRef>(null)
  const hr = useRef<DivRef>(null)

  useGSAP(() => {
    const mm = gsap.matchMedia()
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

    mm.add('(max-width: 1023px)', () => {
      // tl.to(
      //   slide2.current,
      //   {
      //     ease: 'sine.inOut',
      //     keyframes: {
      //       5: { x: '100%' },
      //       40: { x: 0 },
      //       41: { x: 0 },
      //       70: { x: '-100%' },
      //     },
      //   },
      //   0,
      // )
    })
    mm.add('(min-width: 1024px)', () => {
      tl.to(
        leftSide.current,
        {
          ease: 'sine.inOut',
          keyframes: {
            [steps.sideBarsStart]: { x: '-100%' },
            [steps.sideBarsEnd]: { x: 0 },
            [steps.sideBarsBackStart]: { y: 0 },
            [steps.sideBarsBackEnd]: { y: '-20vh' },
          },
        },
        0,
      )
      tl.to(
        rightSide.current,
        {
          ease: 'sine.inOut',
          keyframes: {
            [steps.sideBarsStart]: { x: '100%' },
            [steps.sideBarsEnd]: { x: 0 },
            [steps.sideBarsBackStart]: { y: 0 },
            [steps.sideBarsBackEnd]: { y: '-20vh' },
          },
        },
        0,
      )
      tl.to(
        hr.current,
        {
          ease: 'none',
          keyframes: {
            [steps.sideBarsEnd]: { opacity: 0 },
            [steps.sideBarsBackStart]: { opacity: 1 },
          },
        },
        0,
      )
    })

    tl.to(
      bg.current,
      {
        ease: 'sine.inOut',
        keyframes: {
          [steps.imgOpacityStart]: { opacity: 0 },
          [steps.imgOpacityEnd]: { opacity: 1 },
        },
      },
      0,
    )

    tl.to(
      slide2.current,
      {
        ease: 'sine.inOut',
        keyframes: {
          [steps.slide2Start]: { x: 0 },
          [steps.slide2End]: { x: '-100%' },
        },
      },
      0,
    )
    tl.to(
      slide3.current,
      {
        ease: 'sine.inOut',
        keyframes: {
          [steps.slide2Start]: { x: '100%' },
          [steps.slide2End]: { x: 0 },
        },
      },
      0,
    )

    tl.to(
      subtitle.current,
      {
        ease: 'sine.inOut',
        keyframes: { [steps.subtitle2Start]: { x: '-10rem' }, [steps.slide2End]: { x: 0 } },
      },
      0,
    )
  })

  return (
    <section
      className={clsx(styles.section, 'white-section')}
      style={{ marginBottom: animationHeightCSS }}
    >
      <div className={styles.content} ref={content}>
        <div className={styles.wrapper}>
          <div className={clsx(styles.slide1, 'slide mobile-slide')}>
            <div className={styles.imageWrapper}>
              <MyImage
                className={styles.image}
                src={SeaImg}
                sizes="(max-width: 768px) 100vh, 100vw"
                alt=""
              />
              <div className={styles.imageOverlay}>
                <div className={clsx(styles.imageText, 'container')}>
                  <h2 className="h2">Ваша привилегия</h2>
                  <p className="subtitle">Этот объект — не для всех</p>
                </div>
              </div>
            </div>
          </div>

          <div className={clsx(styles.slide2, 'slide mobile-slide')} ref={slide2}>
            {isMobile && (
              <MobileSlider
                className={styles.slider}
                slides={[
                  { content: <MyImage src={BeachImg} alt="" />, className: styles.sliderSlide },
                  { content: <MyImage src={RichManImg} alt="" />, className: styles.sliderSlide },
                  { content: <MyImage src={FriendsImg} alt="" />, className: styles.sliderSlide },
                ]}
              />
            )}

            {isDesktop && (
              <>
                <div className={styles.imgBg} ref={bg}>
                  <MyImage src={BeachImg} alt="" />
                </div>
                <div className={styles.leftBlock} ref={leftSide}>
                  <div className={styles.img1}>
                    <MyImage src={RichManImg} alt="" />
                  </div>
                  <div className={styles.img2}>
                    <MyImage src={FriendsImg} alt="" />
                  </div>
                </div>
              </>
            )}

            <div className={clsx(styles.container2, 'container')} ref={rightSide}>
              <h3 className="h3">Быть может, вам ближе джаз, а может — классика</h3>
              <p>
                Может быть, вы цените изысканную кухню, и ваш любимый предмет интерьера — канделябр.
                Или, напротив, вы любитель нарочито простых и понятных вкусов.
                <br />
                <br />
                Но здесь всё соединяется в одном пространстве — в апарт-отеле, открывающем новый
                формат жизни у моря.
                <br />
                <br />
                Это выбор, полный надёжности и лёгкой интриги, которую хочется открыть первым.
              </p>
            </div>
          </div>

          <div className={clsx(styles.slide3, 'slide mobile-slide')} ref={slide3}>
            <div className={styles.hr} ref={hr}></div>
            <div className={clsx(styles.container3, 'container')}>
              <h2 className="h2" ref={subtitle}>
                Сердце курортной Евпатории
              </h2>
              <div className={styles.beachImage}>
                <MyImage src={Beach2Img} alt="" />
              </div>
              <div className={styles.beachText}>
                <p>
                  Здесь начинаются маршруты к самым красивым местам Крыма — от золотых пляжей
                  до диких скал и заповедных бухт.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
