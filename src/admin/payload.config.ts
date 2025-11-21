// storage-adapter-import-placeholder
import { postgresAdapter } from '@payloadcms/db-postgres'
import { payloadCloudPlugin } from '@payloadcms/payload-cloud'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { en } from '@payloadcms/translations/languages/en'
import { ru } from '@payloadcms/translations/languages/ru'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

import { UsersCollection } from './collections/Users'
import { MediaCollection } from './collections/Media'
import { FilesCollection } from './collections/Files'
import { GalleryGlobal } from '@/admin/globals/Gallery'
import { DocumentsGlobal } from '@/admin/globals/Documents'
import { PlansGlobal } from './globals/Plans'
import { FloorsCollection } from './collections/Floors'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: UsersCollection.slug,
    importMap: { baseDir: path.resolve(dirname) },
    dateFormat: 'dd.MM.yyyy',
  },

  collections: [FloorsCollection, MediaCollection, FilesCollection, UsersCollection],
  globals: [PlansGlobal, GalleryGlobal, DocumentsGlobal],

  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI || '',
    },
  }),
  sharp,
  plugins: [
    payloadCloudPlugin(),
    // storage-adapter-placeholder
  ],
  i18n: {
    fallbackLanguage: 'en',
    supportedLanguages: { en, ru },
  },
  upload: {
    limits: {
      fileSize: 5000000, // 5MB, written in bytes
    },
  },
  telemetry: false,
})
