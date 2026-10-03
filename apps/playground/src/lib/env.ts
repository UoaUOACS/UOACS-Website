const websiteUrl = process.env.NEXT_PUBLIC_WEBSITE_URL
if (!websiteUrl) throw new Error("NEXT_PUBLIC_WEBSITE_URL is not set")

export const WEBSITE_URL: string = websiteUrl
