import crypto from "node:crypto"
import { AuthCollectionSlugs } from "@uoacs/shared"
import { getPayloadClient } from "@/lib/payload"

export class VerificationCodeCooldownError extends Error {
  constructor(public readonly retryAfterSeconds: number) {
    super("Verification code requested too recently")
    this.name = "VerificationCodeCooldownError"
  }
}

const COOLDOWN_MS = 60 * 1000
const TTL_MS = 10 * 60 * 1000

export class VerificationCodeService {
  public generate(): string {
    return crypto.randomInt(100000, 1000000).toString()
  }

  public async create(email: string, code: string): Promise<void> {
    const payload = await getPayloadClient()

    const mostRecent = await payload.find({
      collection: AuthCollectionSlugs.EMAIL_VERIFICATION_CODE,
      where: { email: { equals: email } },
      sort: "-createdAt",
      limit: 1,
    })

    const lastSentAt = mostRecent.docs[0]?.createdAt
    if (lastSentAt) {
      const elapsedMs = Date.now() - new Date(lastSentAt).getTime()
      if (elapsedMs < COOLDOWN_MS) {
        throw new VerificationCodeCooldownError(Math.ceil((COOLDOWN_MS - elapsedMs) / 1000))
      }
    }

    await payload.delete({
      collection: AuthCollectionSlugs.EMAIL_VERIFICATION_CODE,
      where: { email: { equals: email } },
    })

    await payload.create({
      collection: AuthCollectionSlugs.EMAIL_VERIFICATION_CODE,
      data: {
        email,
        hashedCode: this.hash(code),
        expiresAt: new Date(Date.now() + TTL_MS).toISOString(),
      },
    })
  }

  /**
   * "expired" and "invalid" are kept apart so the sign-up form can offer a
   * resend instead of telling someone their correct code was wrong.
   */
  public async verify(email: string, code: string): Promise<"ok" | "expired" | "invalid"> {
    const payload = await getPayloadClient()
    const res = await payload.find({
      collection: AuthCollectionSlugs.EMAIL_VERIFICATION_CODE,
      where: {
        email: { equals: email },
        expiresAt: { greater_than: new Date().toISOString() },
      },
      limit: 100,
    })

    if (res.docs.length === 0) return "expired"
    return res.docs.some((doc) => this.matches(code, doc.hashedCode)) ? "ok" : "invalid"
  }

  public async deleteAll(email: string): Promise<void> {
    const payload = await getPayloadClient()
    await payload.delete({
      collection: AuthCollectionSlugs.EMAIL_VERIFICATION_CODE,
      where: { email: { equals: email } },
    })
  }

  private hash(code: string): string {
    return crypto.createHash("sha256").update(code).digest("hex")
  }

  private matches(code: string, hash: string): boolean {
    const a = Buffer.from(this.hash(code), "hex")
    const b = Buffer.from(hash, "hex")
    if (a.length !== b.length) return false
    return crypto.timingSafeEqual(a, b)
  }
}
