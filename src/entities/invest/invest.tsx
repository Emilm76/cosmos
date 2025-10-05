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
import styles from './invest.module.scss'
import clsx from 'clsx'
import Img1 from '@/images/sea-view.jpg'
import Img2 from '@/images/boat.jpg'
import Img3 from '@/images/fasad.jpg'
import Img4 from '@/images/mebel.jpg'
import { CustomScrollbar } from '@/shared'

export function InvestSection() {
  return (
    <section className={styles.section}>
      <div className={styles.content}>
        <div className={styles.wrapper}>
          <div className={clsx(styles.slide1, 'mobile-slide')}>
            <div className={styles.image1}>
              <MyImage src={Img1} alt="" />
            </div>
            <div className={styles.image2}>
              <MyImage src={Img2} alt="" />
            </div>
            <h2 className="h2">
              Инвестиции <br />
              и доход
            </h2>
          </div>

          <div
            className={clsx(styles.slide2, 'mobile-slide black-section ')}
            // style={{ translate: 'none' }}
          >
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
              scrollbarClassName={styles.scrollbar}
              isReady={true}
            >
              <ChartIcon className={styles.chart} />
            </CustomScrollbar>
          </div>

          <div
            className={clsx(styles.slide3, 'mobile-slide black-section active')}
            style={{ translate: 'none' }}
          >
            <div className={styles.image}>
              <MyImage src={Img3} sizes="(max-width: 768px) 50vh" alt="" />
            </div>
            <div className={clsx(styles.container, 'container')}>
              <h3 className="h3">Место, где ваш капитал работает на вас</h3>
              <p>
                Высокий турпоток, развитая инфраструктура и уникальное расположение Cosmos Smart
                Evpatoriya Hotel на первой линии делают этот проект одним из самых перспективных
                для вложений. Управление объектом берёт на себя федеральный оператор с опытом более
                20 лет, обеспечивая стабильную загрузку, высокий уровень сервиса и прогнозируемую
                доходность.
              </p>
            </div>
          </div>

          <div
            className={clsx(styles.slide4, 'mobile-slide black-section active')}
            style={{ translate: 'none' }}
          >
            <div className={styles.image}>
              <MyImage src={Img4} sizes="(max-width: 768px) 50vh" alt="" />
            </div>
            <div className={styles.conteinerWrapper}>
              {/*  */}
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
    </section>
  )
}
