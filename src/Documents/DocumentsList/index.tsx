'use client'
import React from 'react'
import type { Document as DocumentType } from '@/admin/payload-types'
import { useState } from 'react'
import styles from './style.module.scss'
import clsx from 'clsx'

type Tabs = 'project' | 'allow'

const tabs: Tabs[] = ['project', 'allow']

export const DocumentsList: React.FC<{ data: DocumentType }> = ({ data }) => {
  const [activeTab, setActiveTab] = useState<Tabs>(tabs[0])

  const files = data?.files || []

  return (
    <div className={clsx(styles.container, 'container')}>
      <h2 className="h1">Документы</h2>
      <div className={styles.tabs}>
        <button
          className={clsx(styles.tab, 'subtitle', activeTab === tabs[0] && styles.active)}
          onClick={() => setActiveTab(tabs[0])}
          type="button"
        >
          Проектная документация
        </button>
        <button
          className={clsx(styles.tab, 'subtitle', activeTab === tabs[1] && styles.active)}
          onClick={() => setActiveTab(tabs[1])}
          type="button"
        >
          Разрешительная документация
        </button>
      </div>

      <div className={styles.docsList}>
        {files
          .filter((doc) => doc.type === activeTab)
          .map((doc, index) => (
            <DocumentItem doc={doc} key={index} />
          ))}
      </div>
    </div>
  )
}

function DocumentItem({ doc }: { doc: NonNullable<DocumentType['files']>[number] }) {
  const formattedDate = formatDate(doc.date)
  const href =
    typeof doc.file === 'object' && doc.file !== null && 'url' in doc.file
      ? (doc.file as { url?: string }).url
      : undefined

  return href ? (
    <a href={href} target="_blank" rel="noopener noreferrer" className={styles.docItem}>
      <h3 className="h4">{doc.name}</h3>
      <span>{formattedDate}</span>
    </a>
  ) : (
    <></>
  )
}

function formatDate(date: string) {
  const parsed = new Date(date as unknown as string)
  if (Number.isNaN(parsed.getTime())) return String(date)
  return parsed.toLocaleDateString('ru-RU', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  })
}
