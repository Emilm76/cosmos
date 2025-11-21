import { GalleryClient } from './Component.client'
import { getCachedGlobal } from '@/utilities/getGlobals'
import React from 'react'

import type { Gallery } from '@/admin/payload-types'

export async function Gallery() {
  const galleryData: Gallery = await getCachedGlobal('gallery', 1)()

  return <GalleryClient data={galleryData} />
}
