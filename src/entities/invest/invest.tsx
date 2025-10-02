import { MyImage } from '@/shared'
import styles from './invest.module.scss'
import clsx from 'clsx'
import Img1 from '@/images/sea-view.jpg'
import Img2 from '@/images/boat.jpg'

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
          <div className={clsx(styles.slide2, 'mobile-slide black-section active')}>
            <h3 className="h3">Крым сегодня</h3>
            <p className="subtitle">
              один из лидеров России по темпам инвестиционной активности. Более 2 трлн ₽ инвестиций
              с 2014 года, половина из которых — частные вложения. Рост турпотока до 10 млн человек
              в год к 2030 году формирует устойчивый спрос на качественные объекты размещения.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
