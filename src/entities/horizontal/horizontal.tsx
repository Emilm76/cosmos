'use client'
import { MyImage } from '@/shared'
import styles from './horizontal.module.scss'
import Img1 from '@/images/service.jpg'
import Img2 from '@/images/family.jpg'
import Img3 from '@/images/holl.jpg'
import Img4 from '@/images/spa-2.jpg'
import Img5 from '@/images/sport.jpg'
import Img6 from '@/images/bar.jpg'
import clsx from 'clsx'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { useRef } from 'react'

gsap.registerPlugin(ScrollTrigger)

type DivRef = HTMLDivElement | null

const animationHeightCount = 6
const animationHeightCSS = animationHeightCount * 100 + 'vh'

export function HorizontalSection() {
  const content = useRef<DivRef>(null)
  const wrapper = useRef<DivRef>(null)

  useGSAP(() => {
    const animationHeight = () => window.innerHeight * animationHeightCount
    const animationWidth = () => ((wrapper.current?.offsetWidth || 0) - window.innerWidth) * -1

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

    tl.to(
      wrapper.current,
      {
        ease: 'sine.inOut',
        keyframes: {
          0: { x: 0 },
          99: { x: animationWidth },
        },
      },
      0,
    )
  })

  return (
    <section className={styles.section} style={{ marginBottom: animationHeightCSS }}>
      <div className={styles.content} ref={content}>
        <div className={styles.wrapper} ref={wrapper}>
          <div className={clsx(styles.slide, 'slide mobile-slide')}>
            <div className={styles.image}>
              <MyImage src={Img1} alt="" />
            </div>
            <div className={styles.textCard}>
              <div className={clsx(styles.container, 'container')}>
                <h2 className="h2">
                  Сервис <br />
                  мирового <br />
                  уровня
                </h2>
                <p>
                  Круглосуточный консьерж, рум-сервис и услуги прачечной — всё, чтобы вы отдыхали
                  без забот.
                </p>
              </div>
            </div>
          </div>
          <div className={clsx(styles.slide, 'slide mobile-slide')}>
            <div className={styles.image}>
              <MyImage src={Img2} alt="" />
            </div>
            <div className={styles.textCard}>
              <div className={clsx(styles.container, 'container')}>
                <h2 className="h2">
                  Атмосфера, <br />
                  созданная природой <br />
                  и дизайном
                </h2>
                <p>
                  Авторское ландшафтное озеленение и охраняемая территория 24/7 создают гармонию
                  и чувство уединения.
                </p>
              </div>
            </div>
          </div>
          <div className={clsx(styles.slide, 'slide mobile-slide')}>
            <div className={styles.image}>
              <MyImage src={Img3} alt="" />
            </div>
            <div className={styles.textCard}>
              <div className={clsx(styles.container, 'container')}>
                <h2 className="h2">
                  Вкус <br />
                  и стиль
                </h2>
                <p>
                  Современный лобби-бар и ресторан а-ля карт со шведской линией и авторскими блюдами
                  от шеф-повара.
                </p>
              </div>
            </div>
          </div>
          <div className={clsx(styles.slide, 'slide mobile-slide')}>
            <div className={styles.image}>
              <MyImage src={Img4} alt="" />
            </div>
            <div className={styles.textCard}>
              <div className={clsx(styles.container, 'container')}>
                <h2 className="h2">
                  Территория <br />
                  SPA-релакса
                </h2>
                <p>
                  Бани, расслабляющие процедуры, массажные и косметологические кабинеты —
                  для красоты, здоровья и отдыха.
                </p>
              </div>
            </div>
          </div>
          <div className={clsx(styles.slide, 'slide mobile-slide')}>
            <div className={styles.image}>
              <MyImage src={Img5} alt="" />
            </div>
            <div className={styles.textCard}>
              <div className={clsx(styles.container, 'container')}>
                <h2 className="h2">Для активных</h2>
                <p>
                  Современный тренажёрный зал, массажные комнаты для восстановления, солярий
                  для безупречного загара.
                </p>
              </div>
            </div>
          </div>
          <div className={clsx(styles.slide, 'slide mobile-slide')}>
            <div className={styles.image}>
              <MyImage src={Img6} alt="" />
            </div>
            <div className={styles.textCard}>
              <div className={clsx(styles.container, 'container')}>
                <h2 className="h2">
                  Территория <br />
                  у моря
                </h2>
                <p>Собственный пляж и круглогодичный бассейн с детской зоной и стильным баром.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
