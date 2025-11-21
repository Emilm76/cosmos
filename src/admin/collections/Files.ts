import type { CollectionConfig } from 'payload'
import path from 'path'
import { fileURLToPath } from 'url'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export const FilesCollection: CollectionConfig = {
  slug: 'files',
  access: {
    read: () => true,
  },
  fields: [],
  upload: {
    staticDir: path.resolve(dirname, '../../../public/files'),
    mimeTypes: ['application/pdf'],
    pasteURL: false,
  },
}
