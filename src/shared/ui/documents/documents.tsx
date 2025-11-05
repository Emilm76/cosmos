'use client'
import clsx from 'clsx'
import { useState } from 'react'
import styles from './documents.module.scss'
import { useCurtainStore } from '@/store'
import { Document } from './document'

export function Documents({ documents }: { documents: Document[] }) {
  const [activeTab, setActiveTab] = useState<1 | 2>(1)
  const isOpen = useCurtainStore((s) => s.isDocumentsOpen)

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
          {documents
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
  const formattedDate = (() => {
    const parsed = new Date(doc.date as unknown as string)
    if (Number.isNaN(parsed.getTime())) return String(doc.date)
    return parsed.toLocaleDateString('ru-RU', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    })
  })()
  return (
    <a href={doc.url} target="_blank" className={styles.docItem}>
      <h3 className="h4">{doc.name}</h3>
      <span>{formattedDate}</span>
    </a>
  )
}
