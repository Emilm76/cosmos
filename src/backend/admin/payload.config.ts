// storage-adapter-import-placeholder
import { postgresAdapter } from '@payloadcms/db-postgres'
import { payloadCloudPlugin } from '@payloadcms/payload-cloud'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { en } from '@payloadcms/translations/languages/en'
import { ru } from '@payloadcms/translations/languages/ru'
import path from 'path'
import { buildConfig } from 'payload'
import sharp from 'sharp'
import { fileURLToPath } from 'url'
import { MediaCollection } from './collections/Media'
import { UsersCollection } from './collections/Users'
import { ImagesGlobal } from './globals/Images'
import { FilesCollection } from './collections/Files'
import { DocumentsGlobal } from './globals/Documents'
import { PlansCollection } from './collections/Plans'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: UsersCollection.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
    dateFormat: 'dd.MM.yyyy',
  },

  editor: lexicalEditor(),
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI || '',
    },
  }),
  collections: [PlansCollection, MediaCollection, FilesCollection, UsersCollection],
  globals: [ImagesGlobal, DocumentsGlobal],
  upload: {
    limits: {
      fileSize: 5000000, // 5MB, written in bytes
    },
  },

  plugins: [
    payloadCloudPlugin(),
    // storage-adapter-placeholder
  ],
  secret: process.env.PAYLOAD_SECRET || '',
  sharp,
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  i18n: {
    fallbackLanguage: 'en',
    supportedLanguages: { en, ru },
  },
  telemetry: false,
})
