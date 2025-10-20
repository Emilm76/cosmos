'use client'
import styles from './location.module.scss'
import clsx from 'clsx'
import BasikImg from '@/images/basik.jpg'
import RestikImg from '@/images/restik.jpg'
import MapImg from '@/images/map.jpg'
import { useRef, useState } from 'react'
import { CustomScrollbar } from '@/shared'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import Img1 from '@/images/sea-view.jpg'
import Img2 from '@/images/boat.jpg'
import Img3 from '@/images/fasad.jpg'
import Img4 from '@/images/mebel.jpg'
import {
  BedIcon,
  ChartIcon,
  ClassIcon,
  EatIcon,
  MyImage,
  PeopleIcon,
  SafetyIcon,
  ServiceIcon,
  SpaIcon,
} from '@/shared'

gsap.registerPlugin(ScrollTrigger)

type DivRef = HTMLDivElement | null

const animationHeightCount = 9
const animationHeightCSS = animationHeightCount * 100 + 'vh'

const steps = {
  start: 0,
  slide2: 5,
  slide3: 24,
  slide4: 43,
  slide5: 62,
  slide6: 81,
  end: 100,
}

export function LocationSection() {
  const [isMapLoad, setIsMapLoad] = useState(false)

  const content = useRef<DivRef>(null)
  const slide2 = useRef<DivRef>(null)
  const scrollContent = useRef<DivRef>(null)
  const slide3 = useRef<DivRef>(null)
  const slide4 = useRef<DivRef>(null)
  const img1 = useRef<DivRef>(null)
  const img2 = useRef<DivRef>(null)
  const slide5 = useRef<DivRef>(null)
  const slide6 = useRef<DivRef>(null)
  const slide7 = useRef<DivRef>(null)
  const list = useRef<DivRef>(null)
  const listInner = useRef<HTMLUListElement | null>(null)

  useGSAP(() => {
    const mm = gsap.matchMedia()

    mm.add('(min-width: 1024px)', () => {
      const animationHeight = () => window.innerHeight * animationHeightCount
      const scrollHeight = () =>
        ((slide2.current?.scrollHeight || 0) - (slide2.current?.offsetHeight || 0)) * -1
      // const scrollHeightList = () =>
      //   ((list.current?.scrollHeight || 0) - (list.current?.offsetHeight || 0)) * -1

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
        scrollContent.current,
        {
          ease: 'sine.inOut',
          keyframes: {
            [steps.start]: { y: 0 },
            [steps.slide2]: { y: scrollHeight },
          },
        },
        0,
      )

      tl.to(
        slide2.current,
        {
          ease: 'sine.inOut',
          keyframes: {
            [steps.slide2]: { x: 0 },
            [steps.slide3]: { x: '-100%' },
          },
        },
        0,
      )
      tl.to(
        slide3.current,
        {
          ease: 'sine.inOut',
          keyframes: {
            [steps.slide2]: { x: '100%' },
            [steps.slide3]: { x: 0 },
            [steps.slide4]: { x: '-120vw' },
          },
        },
        0,
      )
      tl.to(
        slide4.current,
        {
          ease: 'sine.inOut',
          keyframes: {
            [steps.slide3]: { x: '100vw' },
            [steps.slide4]: { x: '-20vw' },
            [steps.slide5]: { x: '-160vw' },
          },
        },
        0,
      )

      tl.to(
        img1.current,
        {
          ease: 'sine.inOut',
          keyframes: {
            [steps.slide3]: { x: '-7rem' },
            [steps.slide4]: { x: 0 },
          },
        },
        0,
      )
      tl.to(
        img2.current,
        {
          ease: 'sine.inOut',
          keyframes: {
            [steps.slide3]: { x: '-5rem' },
            [steps.slide4]: { x: 0 },
          },
        },
        0,
      )

      tl.to(
        slide5.current,
        {
          ease: 'sine.inOut',
          keyframes: {
            [steps.slide4]: { x: '120vw' },
            [steps.slide5]: { x: '-20vw' },
            [steps.slide6]: { x: '-160vw' },
          },
        },
        0,
      )

      tl.to(
        slide6.current,
        {
          ease: 'sine.inOut',
          keyframes: {
            [steps.slide5]: { x: '119.2vw' },
            [steps.slide6]: { x: '-20.2vw' },
            [steps.end]: { x: '-160vw' },
          },
        },
        0,
      )

      tl.to(
        slide7.current,
        {
          ease: 'sine.inOut',
          keyframes: {
            [steps.slide6]: { x: '119.2vw' },
            [steps.end]: { x: '-20.2vw' },
          },
        },
        0,
      )
    })
  })

  return (
    <section className={styles.section} style={{ marginBottom: animationHeightCSS }}>
      <div className={styles.content} ref={content}>
        <div className={clsx(styles.wrapper, 'black-section')}>
          <div className={styles.wrapperOuter1} ref={slide2}>
            <div className={styles.wrapperInner1} ref={scrollContent}>
              <div className={clsx(styles.slide1, 'mobile-slide m2-slide6')}>
                <div className={clsx(styles.container, 'container')}>
                  <h2 className="h2">
                    Сердце <br />
                    курортной <br />
                    Евпатории
                  </h2>
                  <div className={styles.image}>
                    <MyImage src={BasikImg} width={300} height={440} alt="" />
                  </div>
                </div>
              </div>
              <div className={clsx(styles.slide2, 'mobile-slide m2-slide7')}>
                <div className={styles.slideInner}>
                  <div className={clsx(styles.image, 'm2-slide7-img')}>
                    <MyImage src={RestikImg} width={300} height={440} alt="" />
                  </div>
                  <div
                    className={clsx(styles.container, 'container m2-slide7-container')}
                    ref={list}
                  >
                    <ul className={styles.list} role="list" ref={listInner}>
                      <li>
                        <div className="green">1 минута</div>
                        <h3 className="h4">собственный пляж, набережная и центр города</h3>
                      </li>
                      <li>
                        <div className="green">5 минут</div>
                        <h3 className="h4">аквапарк</h3>
                      </li>
                      <li>
                        <div className="green">50 минут</div>
                        <h3 className="h4">аэропорт Симферополь</h3>
                      </li>
                      <li>
                        <div className="green">1 час</div>
                        <h3 className="h4">г. Симферополь</h3>
                      </li>
                      <li>
                        <div className="green">1 час</div>
                        <h3 className="h4">пляжи «Мальдивы»</h3>
                      </li>
                      <li>
                        <div className="green">1,5 часа</div>
                        <h3 className="h4">мыс Тарханкут</h3>
                      </li>
                      <li>
                        <div className="green">2 часа</div>
                        <h3 className="h4">Ай-Петри</h3>
                      </li>
                      <li>
                        <div className="green">2 часа</div>
                        <h3 className="h4">Большой каньон Крыма</h3>
                      </li>
                      <li>
                        <div className="green">3 часа</div>
                        <h3 className="h4">Крымский мост</h3>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className={clsx(styles.slide3, 'mobile-slide m2-slide8')} ref={slide3}>
            <CustomScrollbar
              isReady={isMapLoad}
              contentClassName={styles.imageWrapper}
              scrollbarClassName={styles.scrollbar}
            >
              <MyImage src={MapImg} onLoad={() => setIsMapLoad(true)} alt="" />
              <a href="https://yandex.ru/maps/-/CLBrAPnR" target="_blank" className={styles.btn}>
                <span>
                  Смотреть <br />
                  на карте
                </span>
              </a>
            </CustomScrollbar>
          </div>

          <div className={clsx(styles.slide4, 'white-section mobile-slide m2-slide9')} ref={slide4}>
            <div className={styles.image1} ref={img1}>
              <MyImage src={Img1} alt="" />
            </div>
            <div className={styles.image2} ref={img2}>
              <MyImage src={Img2} alt="" />
            </div>
            <h2 className="h2">
              Инвестиции <br />
              и доход
            </h2>
          </div>

          <div
            className={clsx(styles.slide5, 'mobile-slide black-section m2-slide10')}
            ref={slide5}
          >
            <div className={styles.slide5Inner}>
              <div className={clsx(styles.container, 'container')}>
                <div className={styles.text}>
                  <h3 className="h3">Крым сегодня</h3>
                  <p className="subtitle">
                    один из лидеров России по темпам инвестиционной активности. Более 2 трлн ₽
                    инвестиций с 2014 года, половина из которых — частные вложения. Рост турпотока
                    до 10 млн человек в год к 2030 году формирует устойчивый спрос на качественные
                    объекты размещения.
                  </p>
                </div>
              </div>
              <CustomScrollbar
                contentClassName={styles.chartWrapper}
                scrollbarClassName={styles.scrollbar2}
                isReady={true}
              >
                <ChartIcon className={styles.chart} />
              </CustomScrollbar>
            </div>
          </div>

          <div
            className={clsx(styles.slide6, 'mobile-slide black-section m2-slide11')}
            ref={slide6}
          >
            <div className={styles.slide6Inner}>
              <div className={styles.image}>
                <MyImage src={Img3} sizes="(max-width: 768px) 50vh" alt="" />
              </div>
              <div className={clsx(styles.container, 'container')}>
                <h3 className="h3">Место, где ваш капитал работает на вас</h3>
                <p>
                  Высокий турпоток, развитая инфраструктура и уникальное расположение Cosmos Smart
                  Evpatoriya Hotel на первой линии делают этот проект одним из самых перспективных
                  для вложений. Управление объектом берёт на себя федеральный оператор с опытом
                  более 20 лет, обеспечивая стабильную загрузку, высокий уровень сервиса
                  и прогнозируемую доходность.
                </p>
              </div>
            </div>
          </div>

          <div
            className={clsx(styles.slide7, 'mobile-slide black-section m2-slide12')}
            ref={slide7}
          >
            <div className={styles.slide7Inner}>
              <div className={styles.image}>
                <MyImage src={Img4} sizes="(max-width: 768px) 50vh" alt="" />
              </div>
              <div className={styles.conteinerWrapper}>
                <div className={clsx(styles.container, 'container')}>
                  <h3 className="h3">Ваш доход — без забот</h3>
                  <p>
                    Вы становитесь владельцем готового номера, а вся операционная деятельность —
                    от маркетинга и бронирования до обслуживания и безопасности — находится в руках
                    профессиональной команды Cosmos Hotel Group. Вы отдыхаете, мы — работаем на вашу
                    доходность.
                  </p>
                </div>
                <div className={clsx(styles.container2, 'container')}>
                  <ul role="list">
                    <li>
                      <ClassIcon className={styles.icon} />
                      <span>Управление загрузкой отеля</span>
                    </li>
                    <li>
                      <PeopleIcon className={styles.icon} />
                      <span>Подбор и обучение персонала</span>
                    </li>
                    <li>
                      <BedIcon className={styles.icon} />
                      <span>Управление номерным фондом</span>
                    </li>
                    <li>
                      <SafetyIcon className={styles.icon} />
                      <span>Обеспечение безопасности</span>
                    </li>
                    <li>
                      <ServiceIcon className={styles.icon} />
                      <span>Контроль качества сервиса</span>
                    </li>
                    <li>
                      <SpaIcon className={styles.icon} />
                      <span>Содержание инфраструктуры: бассейн, SPA, пляж</span>
                    </li>
                    <li>
                      <EatIcon className={styles.icon} />
                      <span>Управление ресторанной службой</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
