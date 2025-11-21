'use client'
import React from 'react'
import type { Document } from '@/admin/payload-types'
import { DocumentsList } from './DocumentsList'
import clsx from 'clsx'
import styles from './style.module.scss'
import { useCurtainStore } from '@/store'

interface DocumentsClientProps {
  data: Document
}

export const DocumentsClient: React.FC<DocumentsClientProps> = ({ data }) => {
  const isOpen = useCurtainStore((s) => s.isDocumentsOpen)

  return (
    <div className={clsx(styles.modal, isOpen && styles.open)}>
      <DocumentsList data={data} />
    </div>
  )
}
