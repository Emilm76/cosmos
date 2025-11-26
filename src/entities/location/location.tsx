'use client'
import styles from './location.module.scss'
import clsx from 'clsx'
import BasikImg from '@/images/basik.jpg'
import RestikImg from '@/images/restik.jpg'
import MapImg from '@/images/map.jpg'
import { useCallback, useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import Img1 from '@/images/sea-view.jpg'
import Img2 from '@/images/boat.jpg'
import Img3 from '@/images/fasad.jpg'
import Img4 from '@/images/mebel.jpg'
import { MyImage } from '@/shared/ui/image/image'
import { CustomScrollbar } from '@/shared/ui/scrollbar/custom-scrollbar'
import { ChartIcon } from '@/shared/ui/icons/chart'
import { ClassIcon } from '@/shared/ui/icons/class'
import { PeopleIcon } from '@/shared/ui/icons/people'
import { BedIcon } from '@/shared/ui/icons/bed'
import { SafetyIcon } from '@/shared/ui/icons/safety'
import { ServiceIcon } from '@/shared/ui/icons/service'
import { SpaIcon } from '@/shared/ui/icons/spa'
import { EatIcon } from '@/shared/ui/icons/eat'
import { useMediaQuery } from 'react-responsive'
import Script from 'next/script'

type YMapInstance = {
  destroy: () => void
  geoObjects: { add: (placemark: unknown) => void }
  behaviors: { disable: (behaviors: string[]) => void }
}

type YMapsGlobal = {
  ready: (cb: () => void) => void
  Map: new (
    element: string | HTMLElement,
    state: { center: [number, number]; zoom: number; controls?: string[] },
    options?: Record<string, unknown>,
  ) => YMapInstance
  Placemark: new (
    coords: [number, number],
    properties?: Record<string, unknown>,
    options?: {
      iconLayout?: string
      iconImageHref?: string
      iconImageSize?: [number, number]
      iconImageOffset?: [number, number]
    },
  ) => unknown
}

declare global {
  interface Window {
    ymaps?: YMapsGlobal
  }
}

gsap.registerPlugin(ScrollTrigger)

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
  const [isYMapLoaded, setIsYMapLoaded] = useState(false)
  const isDesktop = useMediaQuery({ query: '(min-width: 1024px)' })
  const isMobile = useMediaQuery({ query: '(max-width: 1023px)' })

  const content = useRef(null)
  const slide2 = useRef<HTMLDivElement>(null)
  const scrollContent = useRef(null)
  const slide3 = useRef(null)
  const slide4 = useRef(null)
  const img1 = useRef(null)
  const img2 = useRef(null)
  const img1Wrap = useRef(null)
  const img2Wrap = useRef(null)
  const slide5 = useRef(null)
  const slide6 = useRef(null)
  const slide7 = useRef(null)
  const list = useRef(null)
  const listInner = useRef(null)
  const imgWrap = useRef(null)
  const img = useRef(null)
  const title = useRef(null)
  const mapInstanceRef = useRef<YMapInstance | null>(null)

  const handleMapScriptLoad = useCallback(() => {
    setIsYMapLoaded(true)
  }, [])

  useEffect(() => {
    if (!isMobile || !isYMapLoaded) {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.destroy()
        mapInstanceRef.current = null
      }
      return
    }

    if (typeof window === 'undefined') {
      return
    }

    const ymapsApi = window.ymaps
    if (!ymapsApi) {
      return
    }

    const container = document.getElementById('map')
    if (!container || mapInstanceRef.current) {
      return
    }

    let isCancelled = false

    ymapsApi.ready(() => {
      if (isCancelled || mapInstanceRef.current || !document.getElementById('map')) {
        return
      }

      const office: [number, number] = [45.198483, 33.389584]

      // Инициализируем карту
      const map = new ymapsApi.Map(
        'map',
        { center: office, zoom: 15, controls: ['zoomControl'] },
        { suppressMapOpenBlock: true },
      )
      map.behaviors.disable(['scrollZoom', 'drag'])

      // добавляем первую метку
      const firstPlacemark = new ymapsApi.Placemark(office, {})
      map.geoObjects.add(firstPlacemark)

      mapInstanceRef.current = map
    })

    return () => {
      isCancelled = true
      if (mapInstanceRef.current) {
        mapInstanceRef.current.destroy()
        mapInstanceRef.current = null
      }
    }
  }, [isMobile, isYMapLoaded])

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

      const width1 = window.innerWidth >= 1600 ? '57.5rem' : '32.5rem'
      const height1 = window.innerWidth >= 1600 ? '55rem' : '45rem'
      const width = window.innerWidth >= 1600 ? '28.75rem' : '16.25rem'
      const height = window.innerWidth >= 1600 ? '27.5rem' : '22.5rem'
      tl.to(
        img1Wrap.current,
        {
          ease: 'sine.inOut',
          keyframes: {
            [steps.slide3]: { width: width1, height: height1, x: '-7rem' },
            [steps.slide4]: { width: width, height: height, x: 0 },
          },
        },
        0,
      )
      tl.to(
        img2Wrap.current,
        {
          ease: 'sine.inOut',
          keyframes: {
            [steps.slide3]: { width: width1, height: height1, x: '-5rem' },
            [steps.slide4]: { width: width, height: height, x: 0 },
          },
        },
        0,
      )
      tl.to(
        title.current,
        {
          ease: 'sine.inOut',
          keyframes: {
            [steps.slide3]: { x: '45rem' },
            [steps.slide4]: { x: 0 },
          },
        },
        0,
      )

      tl.to(
        img1.current,
        {
          ease: 'none',
          keyframes: {
            [steps.slide3]: { scale: 1.2 },
            [steps.slide4]: { scale: 1 },
          },
        },
        0,
      )
      tl.to(
        img2.current,
        {
          ease: 'none',
          keyframes: {
            [steps.slide3]: { scale: 1.2 },
            [steps.slide4]: { scale: 1 },
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
                  <h2 className="h2 m1-videTitle2">
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
                  <div className={clsx(styles.container, 'container')} ref={list}>
                    <ul
                      className={clsx(styles.list, 'm2-slide7-container')}
                      role="list"
                      ref={listInner}
                    >
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
            {isDesktop && (
              <CustomScrollbar
                isReady={isMapLoad}
                contentClassName={styles.imageWrapper}
                scrollbarClassName={styles.scrollbar}
              >
                <MyImage src={MapImg} onLoad={() => setIsMapLoad(true)} alt="" />
                <a href="https://yandex.ru/maps/-/CHx9MRNM" target="_blank" className={styles.btn}>
                  <span>
                    Смотреть <br />
                    на карте
                  </span>
                </a>
              </CustomScrollbar>
            )}
            {isMobile && <div id="map" style={{ width: '100%', height: '100%' }}></div>}
            {isMobile && (
              <Script
                src="https://api-maps.yandex.ru/2.1/?load=package.full&lang=ru-RU"
                strategy="afterInteractive"
                onLoad={handleMapScriptLoad}
              />
            )}
          </div>

          <div className={clsx(styles.slide4, 'white-section mobile-slide m2-slide9')} ref={slide4}>
            <div className={styles.image1} ref={img1Wrap}>
              <div className={styles.imageInner} ref={img2}>
                <MyImage src={Img1} alt="" />
              </div>
            </div>
            <div className={styles.image2} ref={img2Wrap}>
              <div className={styles.imageInner} ref={img2}>
                <MyImage src={Img2} alt="" />
              </div>
            </div>
            <h2 className="h2 m1-videTitle2" ref={title}>
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
                  <h3 className="h3 m1-videTitle2">Крым сегодня</h3>
                  <p className="subtitle m1-videSubtitle2">
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
              <div className={styles.image} ref={imgWrap}>
                <div className={styles.imageInner} ref={img}>
                  <MyImage src={Img3} sizes="(max-width: 768px) 50vh" alt="" />
                </div>
              </div>
              <div className={clsx(styles.container, 'container')}>
                <h3 className="h3 m1-videTitle2">Место, где ваш капитал работает на вас</h3>
                <p className="m1-videSubtitle2">
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
