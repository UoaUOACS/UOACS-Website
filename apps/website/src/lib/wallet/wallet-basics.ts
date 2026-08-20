import type { walletobjects_v1 } from "@googleapis/walletobjects"
import type { GoogleAuth } from "google-auth-library"
import jwt from "jsonwebtoken"

// ─── Types ────────────────────────────────────────────────────────────────────

export interface ClassIdentity {
  issuerId: string
  classId: string
}

export type GenericClass = walletobjects_v1.Schema$GenericClass
export type GenericObject = walletobjects_v1.Schema$GenericObject

export interface WalletPassClassPayload extends GenericClass {
  /** Fully qualified class ID: "<issuerId>.<classId>" */
  id: string
  issuerName: string
  reviewStatus?: "UNDER_REVIEW" | "DRAFT" | "APPROVED" | "REJECTED"
}

export interface WalletPassObjectPayload extends GenericObject {
  /** Fully qualified object ID: "<issuerId>.<objectId>" */
  id: string
  /** Fully qualified class ID this object belongs to */
  classId: string
  state?: "ACTIVE" | "COMPLETED" | "EXPIRED" | "INACTIVE"
}

export interface ServiceAccountCredentials {
  client_email: string
  private_key: string
}

export interface WalletJwtPayload {
  iss: string
  aud: string
  typ: string
  iat: number
  payload: {
    genericObjects?: WalletPassObjectPayload[]
    genericClasses?: WalletPassClassPayload[]
  }
  origins?: string[]
}

const WALLET_BASE_URL = "https://walletobjects.googleapis.com/walletobjects/v1"

// ─── Helper ───────────────────────────────────────────────────────────────────

/**
 * Returns an authorised access token using the provided GoogleAuth client.
 */
async function getAccessToken(auth: GoogleAuth): Promise<string> {
  const client = await auth.getClient()
  const tokenResponse = await client.getAccessToken()
  const token = tokenResponse?.token ?? tokenResponse
  if (!token || typeof token !== "string") {
    throw new Error("Failed to retrieve a valid access token.")
  }
  return token
}

// ─── Function 1: Create and POST a pass class ─────────────────────────────────

/**
 * Creates (or updates) a Generic pass class via the Google Wallet API.
 *
 * @param auth       - Authenticated GoogleAuth instance scoped to wallet_object.issuer
 * @param classData  - The pass class payload. Must include a fully-qualified `id`.
 * @returns          - The created or existing class object returned by the API.
 *
 * @example
 * const auth = new GoogleAuth({ credentials, scopes: WALLET_SCOPES });
 * const passClass = await createPassClass(auth, {
 *   id: "1234567890.my_class",
 *   issuerName: "Acme Corp",
 *   reviewStatus: "UNDER_REVIEW",
 * });
 */
export async function createPassClass(
  auth: GoogleAuth,
  classData: WalletPassClassPayload,
): Promise<Record<string, unknown>> {
  const accessToken = await getAccessToken(auth)

  // Check whether the class already exists to decide between POST and PATCH.
  const checkResponse = await fetch(
    `${WALLET_BASE_URL}/genericClass/${encodeURIComponent(classData.id)}`,
    {
      method: "GET",
      headers: { Authorization: `Bearer ${accessToken}` },
    },
  )

  if (checkResponse.ok) {
    // Class already exists — PATCH to update it.
    const patchResponse = await fetch(
      `${WALLET_BASE_URL}/genericClass/${encodeURIComponent(classData.id)}`,
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(classData),
      },
    )

    if (!patchResponse.ok) {
      const errorBody = await patchResponse.text()
      throw new Error(`Failed to update pass class (${patchResponse.status}): ${errorBody}`)
    }

    return patchResponse.json() as Promise<Record<string, unknown>>
  }

  if (checkResponse.status !== 404) {
    const errorBody = await checkResponse.text()
    throw new Error(`Unexpected error checking pass class (${checkResponse.status}): ${errorBody}`)
  }

  // Class does not exist — POST to create it.
  const createResponse = await fetch(`${WALLET_BASE_URL}/genericClass`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(classData),
  })

  if (!createResponse.ok) {
    const errorBody = await createResponse.text()
    throw new Error(`Failed to create pass class (${createResponse.status}): ${errorBody}`)
  }

  return createResponse.json() as Promise<Record<string, unknown>>
}

// ─── Function 2: Create and POST a pass object ────────────────────────────────

/**
 * Creates (or updates) a Generic pass object via the Google Wallet API.
 * The corresponding pass class must already exist before calling this function.
 *
 * @param auth        - Authenticated GoogleAuth instance scoped to wallet_object.issuer
 * @param objectData  - The pass object payload. Must include a fully-qualified `id`
 *                      and a matching `classId`.
 * @returns           - The created or existing object returned by the API.
 *
 * @example
 * const passObject = await createPassObject(auth, {
 *   id: "1234567890.my_object_001",
 *   classId: "1234567890.my_class",
 *   state: "ACTIVE",
 *   cardTitle: { defaultValue: { language: "en-US", value: "Member Card" } },
 * });
 */
export async function createPassObject(
  auth: GoogleAuth,
  objectData: WalletPassObjectPayload,
): Promise<Record<string, unknown>> {
  const accessToken = await getAccessToken(auth)

  // Check whether the object already exists to decide between POST and PATCH.
  const checkResponse = await fetch(
    `${WALLET_BASE_URL}/genericObject/${encodeURIComponent(objectData.id)}`,
    {
      method: "GET",
      headers: { Authorization: `Bearer ${accessToken}` },
    },
  )

  if (checkResponse.ok) {
    // Object already exists — PATCH to update it.
    const patchResponse = await fetch(
      `${WALLET_BASE_URL}/genericObject/${encodeURIComponent(objectData.id)}`,
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(objectData),
      },
    )

    if (!patchResponse.ok) {
      const errorBody = await patchResponse.text()
      throw new Error(`Failed to update pass object (${patchResponse.status}): ${errorBody}`)
    }

    return patchResponse.json() as Promise<Record<string, unknown>>
  }

  if (checkResponse.status !== 404) {
    const errorBody = await checkResponse.text()
    throw new Error(`Unexpected error checking pass object (${checkResponse.status}): ${errorBody}`)
  }

  // Object does not exist — POST to create it.
  const createResponse = await fetch(`${WALLET_BASE_URL}/genericObject`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(objectData),
  })

  if (!createResponse.ok) {
    const errorBody = await createResponse.text()
    throw new Error(`Failed to create pass object (${createResponse.status}): ${errorBody}`)
  }

  return createResponse.json() as Promise<Record<string, unknown>>
}

// ─── Function 3: Sign JWT and generate "Add to Google Wallet" link ────────────

/**
 * Creates a signed JWT containing the pass object (and optionally the class),
 * then returns a ready-to-use "Add to Google Wallet" URL.
 *
 * Embedding the class in the JWT is optional — it's only needed when you want
 * Google to create the class on-the-fly rather than pre-creating it. If you
 * used `createPassClass` above you can omit `classData`.
 *
 * @param credentials  - Service account credentials (client_email + private_key)
 * @param objectData   - The pass object to embed in the JWT
 * @param classData    - Optional pass class to embed alongside the object
 * @param origins      - Allowed web origins for the "Save to Wallet" button
 *                       (required when embedding on a web page)
 * @returns            - A fully-formed "Add to Google Wallet" URL
 *
 * @example
 * const link = generateWalletLink(
 *   { client_email: "sa@project.iam.gserviceaccount.com", private_key: "-----BEGIN PRIVATE KEY-----\n..." },
 *   { id: "1234567890.my_object_001", classId: "1234567890.my_class", state: "ACTIVE" },
 *   undefined,
 *   ["https://myapp.com"]
 * );
 * // → "https://pay.google.com/gp/v/save/<signed-jwt>"
 */
export function generateWalletLink(
  credentials: ServiceAccountCredentials,
  objectData: WalletPassObjectPayload,
  classData?: WalletPassClassPayload,
  origins: string[] = [],
): string {
  const now = Math.floor(Date.now() / 1000)

  const jwtPayload: WalletJwtPayload = {
    iss: credentials.client_email,
    aud: "google",
    typ: "savetowallet",
    iat: now,
    payload: {
      genericObjects: [objectData],
      ...(classData ? { genericClasses: [classData] } : {}),
    },
    origins,
  }

  const signedJwt = jwt.sign(jwtPayload, credentials.private_key, {
    algorithm: "RS256",
    expiresIn: "10m",
  })

  return `https://pay.google.com/gp/v/save/${signedJwt}`
}
