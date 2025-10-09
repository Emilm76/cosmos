import { MyImage } from '@/shared'
import styles from './horizontal.module.scss'
import Img1 from '@/images/service.jpg'
import Img2 from '@/images/family.jpg'
import Img3 from '@/images/holl.jpg'
import Img4 from '@/images/spa-2.jpg'
import Img5 from '@/images/sport.jpg'
import Img6 from '@/images/bar.jpg'
import clsx from 'clsx'

export function HorizontalSection() {
  return (
    <section className={styles.section}>
      <div className={styles.content} style={{ translate: '-100vw 0' }}>
        <div className={styles.wrapper}>
          <div className={clsx(styles.slide, 'slide mobile-slide active')}>
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
          <div className={clsx(styles.slide, 'slide mobile-slide active')}>
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
          <div className={clsx(styles.slide, 'slide mobile-slide active')}>
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
          <div className={clsx(styles.slide, 'slide mobile-slide active')}>
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
          <div className={clsx(styles.slide, 'slide mobile-slide active')}>
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
          <div className={clsx(styles.slide, 'slide mobile-slide active')}>
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
