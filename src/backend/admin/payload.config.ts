// storage-adapter-import-placeholder
import { postgresAdapter } from "@payloadcms/db-postgres"
import { payloadCloudPlugin } from "@payloadcms/payload-cloud"
import { lexicalEditor } from "@payloadcms/richtext-lexical"
import { en } from "@payloadcms/translations/languages/en"
import { ru } from "@payloadcms/translations/languages/ru"
import path from "path"
import { buildConfig } from "payload"
import sharp from "sharp"
import { fileURLToPath } from "url"
import { CasesCollection } from "./collections/Cases"
import { MediaCollection } from "./collections/Media"
import { CategoriesCollection } from "./collections/Categories"
import { UsersCollection } from "./collections/Users"

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: UsersCollection.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
    dateFormat: "MM/dd/yyyy",
  },
  i18n: {
    fallbackLanguage: "en",
    supportedLanguages: { en, ru },
  },
  telemetry: false,
  collections: [
    UsersCollection,
    MediaCollection,
    CasesCollection,
    CategoriesCollection,
  ],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || "",
  typescript: {
    outputFile: path.resolve(dirname, "payload-types.ts"),
  },
  // database-adapter-config-start
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI || "",
    },
  }),
  // database-adapter-config-end
  sharp,
  plugins: [
    payloadCloudPlugin(),
    // storage-adapter-placeholder
  ],

  // onInit: async (payload) => {
  //   if (process.env.NODE_ENV === "development") {
  //     const users = await payload.find({
  //       collection: "users",
  //     })

  //     if (users.docs.length === 0) {
  //       await payload.create({
  //         collection: "users",
  //         data: {
  //           email: "admin@gmail.com",
  //           password: "123",
  //           role: "admin",
  //         },
  //       })
  //     }

  //     const cases = await payload.find({
  //       collection: "cases",
  //     })

  //     if (cases.docs.length === 0) {
  //       await payload.create({
  //         collection: "categories",
  //         data: { name: "Сайты" },
  //       })
  //       await payload.create({
  //         collection: "categories",
  //         data: { name: "Брендинг" },
  //       })
  //     }
  //   }
  // },
})
