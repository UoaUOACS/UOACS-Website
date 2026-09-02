import { headers as getHeaders } from "next/headers"
import { getPayload } from "payload"
import config from "@/payload.config"

export default async function HomePage() {
  const headers = await getHeaders()
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })
  const { user } = await payload.auth({ headers })

  return (
    <div className="home">
      <div className="content">
        <h1>{user ? `Signed in as ${user.email}` : "UOACS Auth"}</h1>
        <div className="links">
          <a className="admin" href={payloadConfig.routes.admin}>
            Go to admin panel
          </a>
        </div>
      </div>
    </div>
  )
}
