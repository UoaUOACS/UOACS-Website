import path from "node:path"
import { fileURLToPath } from "node:url"
import { mongooseAdapter } from "@payloadcms/db-mongodb"
import { lexicalEditor } from "@payloadcms/richtext-lexical"
import { s3Storage } from "@payloadcms/storage-s3"
import { buildConfig } from "payload"
import sharp from "sharp"
import { Executive } from "./payload/collections/Executive"
import { Media } from "./payload/collections/Media"
import { Member } from "./payload/collections/Member"
import { Polaroid } from "./payload/collections/Polaroid"
import { Reel } from "./payload/collections/Reel"
import { Sponsor } from "./payload/collections/Sponsor"
import { User } from "./payload/collections/User"
import { HomePage } from "./payload/globals/HomePage"
import { PrivacyPolicy } from "./payload/globals/PrivacyPolicy"

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: User.slug,
    importMap: {
      baseDir: path.resolve(dirname),
      importMapFile: `${path.resolve(dirname)}/app/payload/admin/importMap.js`,
    },
  },
  collections: [User, Media, Member, Executive, Sponsor, Reel, Polaroid],
  globals: [HomePage, PrivacyPolicy],
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
  upload: {
    limits: {
      fileSize: 33_554_432, // 32MB
    },
  },
  plugins: [
    s3Storage({
      collections: {
        media: { prefix: "media" },
      },
      bucket: process.env.S3_BUCKET ?? "",
      config: {
        credentials: {
          accessKeyId: process.env.S3_ACCESS_KEY_ID ?? "",
          secretAccessKey: process.env.S3_SECRET_ACCESS_KEY ?? "",
        },
        region: process.env.S3_REGION,
      },
    }),
  ],
})
