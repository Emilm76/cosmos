'use client'
import clsx from 'clsx'
import { useLenis } from 'lenis/react'
import { useEffect, MouseEvent } from 'react'
import styles from './modal.module.scss'
import { useModalStore } from '@/store'
import { Form } from '../form/form'

export function Modal() {
  const isOpen = useModalStore((s) => s.isOpen)
  const closeModal = useModalStore((s) => s.close)
  const lenis = useLenis()

  useEffect(() => {
    if (!lenis) return

    if (isOpen) {
      lenis.stop()
    } else {
      lenis.start()
    }

    return () => {
      lenis.start()
    }
  }, [isOpen, lenis])

  function handleModalClick(e: MouseEvent<HTMLDivElement>) {
    if (e.target === e.currentTarget) {
      closeModal()
    }
  }

  return (
    <div className={clsx(styles.modal, isOpen && styles.open)} onClick={handleModalClick}>
      <div className={styles.wrapper}>
        <button className={styles.buttonClose} onClick={closeModal} type="button">
          Закрыть
        </button>
        <div className={clsx(styles.wrapperInner, 'lenis-prevent')}>
          <div className={styles.content}>
            <h2 className="h3">Хотите узнать стоимость апартаментов?</h2>
            <p className={clsx(styles.subtitle, 'subtitle')}>Оставьте заявку</p>
            <div className={styles.form}>
              <Form />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
