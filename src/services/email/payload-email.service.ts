import { payload } from "@/lib/payload"

export class PayloadEmailService {
  public static async sendVerificationCode(email: string, code: string) {
    return await payload.sendEmail({
      to: email,
      subject: "Email verification code",
      text: `Here is your email verification code: ${code}. This code will expire in 10 minutes.`,
    })
  }
}
