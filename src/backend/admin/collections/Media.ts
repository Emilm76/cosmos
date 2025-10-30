import type { CollectionConfig } from 'payload'
import path from 'path'
import { fileURLToPath } from 'url'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export const MediaCollection: CollectionConfig = {
  slug: 'media',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      //required: true,
    },
  ],
  upload: {
    staticDir: path.resolve(dirname, '../../../../public/media'),
    imageSizes: [
      {
        name: 'thumbnail',
        width: 400,
      },
      {
        name: 'tablet',
        width: 1920,
        height: 1080,
        position: 'centre',
      },
    ],
    adminThumbnail: 'thumbnail',
    mimeTypes: ['image/*'],
    pasteURL: false,
  },
}
