'use client'
import clsx from 'clsx'
import { useLenis } from 'lenis/react'
import { useEffect, MouseEvent } from 'react'
import styles from './modal-plan.module.scss'
import { CubeIcon, DownloadIcon } from '@/shared'
import Image from 'next/image'
import { useModalStore } from '@/store'

const defaultPlan = {
  name: '',
  imagePath: '',
  rooms: 0,
  square: 0,
  floor: 0,
  roomHeight: 0,
  view: '',
}

type Plan = {
  name: string
  imagePath: string
  rooms: number
  square: number
  floor: number
  roomHeight: number
  view: string
}

export function ModalPlan({
  isOpen,
  data,
  closeCallback,
}: {
  isOpen: boolean
  data: Plan | null
  closeCallback: () => void
}) {
  const lenis = useLenis()
  const openModal = useModalStore((s) => s.open)

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
      closeCallback()
    }
  }

  if (data === null) {
    data = defaultPlan
  }

  return (
    <div className={clsx(styles.modal, isOpen && styles.open)} onClick={handleModalClick}>
      <div className={styles.wrapper}>
        <button className={styles.buttonClose} onClick={closeCallback} type="button">
          Закрыть
        </button>
        <div className={clsx(styles.wrapperInner, 'lenis-prevent')}>
          <div className={styles.content}>
            <h2 className="h2">{data.name}</h2>
            <div className={styles.grid}>
              <div>
                {data.imagePath && (
                  <Image
                    className={styles.planImg}
                    src={data.imagePath}
                    width={740}
                    height={450}
                    alt=""
                  />
                )}
              </div>

              <div className={styles.table}>
                <div className={clsx(styles.tableTitle, 'h2')}>
                  <span>{data.rooms}к</span>
                  <span>{data.square} м²</span>
                </div>
                <div className={clsx(styles.tableRow, 'subtitle')}>этаж {data.floor}</div>
                <div className={clsx(styles.tableInfo, styles.tableRow)}>
                  <div className={styles.tableInfoRow}>
                    <span>Высота потолков</span>
                    <span>{data.roomHeight} м</span>
                  </div>
                  <div className={styles.tableInfoRow}>
                    <span>Вид</span>
                    <span>{data.view}</span>
                  </div>
                </div>
                <div className={clsx(styles.tablePayInfo, styles.tableRow)}>
                  <div className="subtitle">Доступные способы оплаты:</div>
                  <ul role="list">
                    <li>— ипотека 7% </li>
                    <li>— рассрочка 0%</li>
                  </ul>
                </div>
              </div>
            </div>
            <div className={styles.bottom}>
              <button
                type="button"
                className="bullet-link bullet-link--lg h4 green"
                onClick={openModal}
              >
                оставить заявку
              </button>
              <div className={styles.other}>
                <button type="button" className={styles.otherItem}>
                  <CubeIcon />
                  <span>3d тур</span>
                </button>
                <button type="button" className={styles.otherItem}>
                  <DownloadIcon />
                  <span>скачать буклет</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
