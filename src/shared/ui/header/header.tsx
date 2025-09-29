'use client'
import { useLenis } from 'lenis/react'
import { useEffect, useState } from 'react'
import styles from './header.module.scss'
import clsx from 'clsx'
import { PhoneIcon } from '../icons/phone'
import Image from 'next/image'
import Img from '@/images/burger.jpg'

export function Header() {
  const [isBurgerOpen, setIsBurgerOpen] = useState(false)
  const lenis = useLenis()

  useEffect(() => {
    if (!lenis) return

    if (isBurgerOpen) {
      lenis.stop()
    } else {
      lenis.start()
    }

    return () => {
      lenis.start()
    }
  }, [isBurgerOpen, lenis])

  function toggleBurger() {
    setIsBurgerOpen((lastState) => !lastState)
  }

  return (
    <>
      <header className={clsx(styles.header, isBurgerOpen && styles.dark)}>
        <div className={clsx(styles.container, 'container')}>
          <button className={styles.phoneBtn} type="button">
            <PhoneIcon />
            <span>Заказать звонок</span>
          </button>
          <div className={styles.right}>
            <button type="button">Выбрать планировку</button>
            <button
              type="button"
              className={clsx(styles.burgerBtn, isBurgerOpen && styles.open)}
              onClick={toggleBurger}
              aria-label="Открыть или закрыть меню"
            ></button>
          </div>
        </div>
      </header>

      <div className={clsx(styles.burger, isBurgerOpen && styles.open)}>
        {/* <div className={styles.burgerLogo}></div> */}
        {/* TODO: логотип */}

        <div className={clsx(styles.burgerWrapper, 'container')}>
          <nav>
            <div className={styles.li}>
              <a className="h2" href="">
                Концепция
              </a>
              <div className="green">Пролог</div>
            </div>
            <div className={styles.li}>
              <a className="h2" href="">
                Локация
              </a>
              <div className="green">Глава 1</div>
            </div>
            <div className={styles.li}>
              <a className="h2" href="">
                Комфорт
              </a>
              <div className="green">Глава 2</div>
            </div>
            <div className={styles.li}>
              <a className="h2" href="">
                Выбор квартир
              </a>
              <div className="green">Глава 3</div>
            </div>
          </nav>

          <div className={styles.burgerNav2}>
            <div className={styles.list2}>
              <button className="subtitle" type="button">
                Галерея
              </button>
              <button className="subtitle" type="button">
                Документы
              </button>
            </div>
            <Image className={styles.burgerImg} src={Img} alt="" />
          </div>
        </div>
      </div>
    </>
  )
}
