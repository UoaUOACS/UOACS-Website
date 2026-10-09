import path from "node:path"
import { fileURLToPath } from "node:url"
import { mongooseAdapter } from "@payloadcms/db-mongodb"
import { resendAdapter } from "@payloadcms/email-resend"
import { importExportPlugin } from "@payloadcms/plugin-import-export"
import { lexicalEditor } from "@payloadcms/richtext-lexical"
import { AuthCollectionSlugs } from "@uoacs/shared"
import { richTextFeatures } from "@uoacs/shared/payload"
import { buildConfig } from "payload"
import sharp from "sharp"
import { Admin } from "./payload/collections/Admin"
import { EmailVerificationCode } from "./payload/collections/EmailVerificationCode"
import { Media } from "./payload/collections/Media"
import { Member } from "./payload/collections/Member"

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
  collections: [Admin, Media, Member, EmailVerificationCode],
  editor: lexicalEditor({ features: richTextFeatures }),
  graphQL: {
    disable: true,
  },
  routes: {
    admin: "/payload/admin",
    api: "/payload/api",
  },
  secret: process.env.PAYLOAD_SECRET || "",
  typescript: {
    // Auth owns the member/verification data model, so its generated types are
    // the contract the website and playground consume over the auth API.
    outputFile: path.resolve(dirname, "../../../packages/shared/src/payload/payload-types.ts"),
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
