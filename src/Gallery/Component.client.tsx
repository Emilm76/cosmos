'use client'
import React from 'react'
import type { Gallery } from '@/admin/payload-types'
import { GallerySlider } from './GallerySlider'
import clsx from 'clsx'
import { useCurtainStore } from '@/store'
import styles from './style.module.scss'

interface GalleryClientProps {
  data: Gallery
}

export const GalleryClient: React.FC<GalleryClientProps> = ({ data }) => {
  const isOpen = useCurtainStore((s) => s.isGalleryOpen)

  return (
    <div className={clsx(styles.modal, isOpen && styles.open)}>
      <GallerySlider data={data} />
    </div>
  )
}
