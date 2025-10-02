'use client'
import { useLenis } from 'lenis/react'
import { useEffect, useState } from 'react'
import styles from './header.module.scss'
import clsx from 'clsx'
import { PhoneIcon } from '../icons/phone'
import Image from 'next/image'
import Img from '@/images/burger.jpg'
import { LogoIcon } from '../icons/logo'

export function Header() {
  const [isBurgerOpen, setIsBurgerOpen] = useState(false)
  const [isLoadImg, setIsLoadImg] = useState(false)
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
    if (document.documentElement.clientWidth >= 768 && !isLoadImg) setIsLoadImg(true)
  }

  return (
    <>
      <header className={clsx(styles.header, isBurgerOpen && [styles.open, styles.dark])}>
        <div className={clsx(styles.container, 'container')}>
          <button className={styles.phoneBtn} type="button">
            <PhoneIcon />
            <span className="bullet-link">Заказать звонок</span>
          </button>
          <div className={styles.right}>
            <button className="bullet-link" type="button">
              Выбрать планировку
            </button>
            <button
              type="button"
              className={clsx(styles.burgerBtn, isBurgerOpen ? styles.close : styles.open)}
              onClick={toggleBurger}
              aria-label="Открыть или закрыть меню"
            ></button>
          </div>
        </div>

        <LogoIcon className={styles.logo} />
      </header>

      <div className={clsx(styles.burger, isBurgerOpen && styles.open)}>
        <div className={clsx(styles.burgerWrapper, 'container lenis-prevent')}>
          <nav>
            <a className={styles.li} href="">
              <div className={clsx(styles.burgerTitle, 'h2')}>Концепция</div>
              <div className="green">Пролог</div>
            </a>
            <a className={styles.li} href="">
              <div className={clsx(styles.burgerTitle, 'h2')}>Локация</div>
              <div className="green">Глава 1</div>
            </a>
            <a className={styles.li} href="">
              <div className={clsx(styles.burgerTitle, 'h2')}>Комфорт</div>
              <div className="green">Глава 2</div>
            </a>
            <a className={styles.li} href="">
              <div className={clsx(styles.burgerTitle, 'h2')}>Выбор квартир</div>
              <div className="green">Глава 3</div>
            </a>
          </nav>

          <div className={styles.burgerNav2}>
            <div className={styles.list2}>
              <button className="subtitle bullet-link bullet-link--md" type="button">
                Галерея
              </button>
              <button className="subtitle bullet-link bullet-link--md" type="button">
                Документы
              </button>
            </div>
            {isLoadImg && <Image className={styles.burgerImg} src={Img} loading="eager" alt="" />}
          </div>
        </div>
      </div>
    </>
  )
}
