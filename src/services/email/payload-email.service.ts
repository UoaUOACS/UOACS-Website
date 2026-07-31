import { payload } from "@/lib/payload"

export class PayloadEmailService {
  public static async sendVerificationCode(email: string, code: string) {
    return await payload.sendEmail({
      to: email,
      subject: "Email verification code",
      text: `Here is your email verification code: ${code}. This code will expire in 10 minutes.`,
    })
  }

  public static async sendResetPassword(email: string, url: string): Promise<unknown> {
    return payload.sendEmail({
      to: email,
      subject: "UOACS - Reset Password",
      text: `A password reset was requested for your account. Open this link to reset your password: ${url}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 480px; padding: 24px; color: #1a1a1a;">
          <h2 style="margin-bottom: 16px;">Reset your password</h2>
          <p style="margin-bottom: 24px; line-height: 1.5;">
            We received a request to reset your UOACS account password. Click the button below to choose a new one. This link will expire shortly.
          </p>
          <a
            href="${url}"
            style="display: inline-block; padding: 12px 24px; background-color: #1a1a1a; color: #ffffff; text-decoration: none; border-radius: 6px; font-weight: bold;"
          >
            Reset Password
          </a>
          <p style="margin-top: 24px; font-size: 13px; color: #666666; line-height: 1.5;">
            If you didn't request this, you can safely ignore this email.
          </p>
        </div>
      `,
    })
  }
}
