import path from "node:path"
import { fileURLToPath } from "node:url"
import { mongooseAdapter } from "@payloadcms/db-mongodb"
import { importExportPlugin } from "@payloadcms/plugin-import-export"
import { lexicalEditor } from "@payloadcms/richtext-lexical"
import { AuthCollectionSlugs, EmailVerificationCode, Member } from "@uoacs/shared/payload"
import { buildConfig } from "payload"
import sharp from "sharp"
import { Media } from "./payload/collections/Media"
import { Users } from "./payload/collections/Users"

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
      importMapFile: `${path.resolve(dirname)}/app/payload/admin/importMap.js`,
    },
  },
  collections: [Users, Media, Member, EmailVerificationCode],
  editor: lexicalEditor(),
  graphQL: {
    disable: true,
  },
  routes: {
    admin: "/payload/admin",
    api: "/payload/api",
  },
  secret: process.env.PAYLOAD_SECRET || "",
  typescript: {
    outputFile: path.resolve(dirname, "payload/payload-types.ts"),
  },
  db: mongooseAdapter({
    url: process.env.DATABASE_URI || "",
  }),
  sharp,
  plugins: [
    importExportPlugin({
      collections: [
        {
          slug: AuthCollectionSlugs.MEMBER,
          export: {
            disableSave: true,
            disableJobsQueue: true,
          },
          import: {
            disableJobsQueue: true,
          },
        },
      ],
    }),
  ],
})
