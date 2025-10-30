import type { GlobalConfig } from 'payload'

export const ImagesGlobal: GlobalConfig = {
  slug: 'images',
  label: 'Галерея',
  fields: [
    {
      name: 'images',
      type: 'array',
      fields: [{ name: 'image', type: 'upload', relationTo: 'media', required: true }],
    },
  ],
}
