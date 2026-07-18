import path from "node:path"
import { fileURLToPath } from "node:url"
import { mongooseAdapter } from "@payloadcms/db-mongodb"
import { resendAdapter } from "@payloadcms/email-resend"
import { importExportPlugin } from "@payloadcms/plugin-import-export"
import { lexicalEditor } from "@payloadcms/richtext-lexical"
import { s3Storage } from "@payloadcms/storage-s3"
import { buildConfig } from "payload"
import sharp from "sharp"
import { Slugs } from "./lib/slugs"
import { Admin } from "./payload/collections/Admin"
import { EmailVerificationCode } from "./payload/collections/EmailVerificationCode"
import { Event } from "./payload/collections/Event"
import { Executive } from "./payload/collections/Executive"
import { Media } from "./payload/collections/Media"
import { Member } from "./payload/collections/Member"
import { Polaroid } from "./payload/collections/Polaroid"
import { Reel } from "./payload/collections/Reel"
import { Sponsor } from "./payload/collections/Sponsor"
import { HomePage } from "./payload/globals/HomePage"
import { PrivacyPolicy } from "./payload/globals/PrivacyPolicy"
import { SocialLinks } from "./payload/globals/SocialLinks"

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Admin.slug,
    importMap: {
      baseDir: path.resolve(dirname),
      importMapFile: `${path.resolve(dirname)}/app/payload/admin/importMap.js`,
    },
  },
  collections: [
    Admin,
    Media,
    Member,
    Executive,
    Sponsor,
    Reel,
    Polaroid,
    EmailVerificationCode,
    Event,
  ],
  globals: [HomePage, PrivacyPolicy, SocialLinks],
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
  email: process.env.RESEND_API_KEY
    ? resendAdapter({
        defaultFromAddress: "noreply@uoacs.co.nz",
        defaultFromName: "UOACS",
        apiKey: process.env.RESEND_API_KEY,
      })
    : undefined,
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
    importExportPlugin({
      collections: [
        {
          slug: Slugs.Collections.MEMBER,
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
