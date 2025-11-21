import type { GlobalConfig } from 'payload'

import { revalidateGallery } from './hooks/revalidateGallery'

export const GalleryGlobal: GlobalConfig = {
  slug: 'gallery',
  label: 'Галерея',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'gallerySlider',
      type: 'array',
      fields: [{ name: 'image', type: 'upload', relationTo: 'media', required: true }],
    },
  ],
  hooks: {
    afterChange: [revalidateGallery],
  },
}
