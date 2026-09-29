import config from "@payload-config"
import { getPayload, type Payload } from "payload"

export const payload: Payload = await getPayload({ config })
