'use client'
import clsx from 'clsx'
import { useLenis } from 'lenis/react'
import { useEffect, useState } from 'react'
import styles from './documents.module.scss'

type Document = {
  name: string
  date: string
  type: 1 | 2
}

const docs: Document[] = [
  { name: 'Проектная декларация от 09.12.2024', date: '09.12.2024', type: 1 },
  { name: 'Проектная декларация от 09.12.2024', date: '09.12.2024', type: 1 },
  { name: 'Проектная декларация от 09.12.2024', date: '09.12.2024', type: 1 },
  { name: 'Проектная декларация от 09.12.2024', date: '09.12.2024', type: 1 },
  { name: 'Проектная декларация от 09.12.2024', date: '09.12.2024', type: 1 },
  { name: 'Разрешительная документация от 09.12.2025', date: '09.12.2025', type: 2 },
]

export function Documents({ isOpen }: { isOpen: boolean }) {
  const lenis = useLenis()
  const [activeTab, setActiveTab] = useState<1 | 2>(1)

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

  return (
    <div className={clsx(styles.modal, 'lenis-prevent', isOpen && styles.open)}>
      <div className={clsx(styles.container, 'container')}>
        <h2 className="h1">Документы</h2>
        <div className={styles.tabs}>
          <button
            className={clsx(styles.tab, 'subtitle', activeTab === 1 && styles.active)}
            onClick={() => setActiveTab(1)}
            type="button"
          >
            Проектная документация
          </button>
          <button
            className={clsx(styles.tab, 'subtitle', activeTab === 2 && styles.active)}
            onClick={() => setActiveTab(2)}
            type="button"
          >
            Разрешительная документация
          </button>
        </div>

        <div className={styles.docsList}>
          {docs
            .filter((doc) => doc.type === activeTab)
            .map((doc, index) => (
              <DocumentItem doc={doc} key={index} />
            ))}
        </div>
      </div>
    </div>
  )
}

function DocumentItem({ doc }: { doc: Document }) {
  return (
    <a href="" target="_blank" className={styles.docItem}>
      <h3 className="h4">{doc.name}</h3>
      <span>{doc.date}</span>
    </a>
  )
}
