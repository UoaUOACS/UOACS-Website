import { cacheLife } from "next/cache"
import { cache } from "react"
import { z } from "zod"
import type { FooterSocialLink } from "../components/Footer/Footer"

const SOCIAL_LINKS_URL = `${process.env.NEXT_PUBLIC_WEBSITE_URL}/payload/api/globals/social-links`

/**
 * Fields are nullish because Payload returns no values for a global that has never been saved.
 */
const websiteSocialLinksSchema = z.object({
  discordHref: z.url().nullish(),
  instagramHref: z.url().nullish(),
  tiktokHref: z.url().nullish(),
  linkedinHref: z.url().nullish(),
})

/**
 * Fetches the social links global from the website's Payload REST API, leaving out links with no
 * URL. Throws on failure.
 */
async function getSocialLinks(): Promise<FooterSocialLink[]> {
  const res = await fetch(SOCIAL_LINKS_URL, { signal: AbortSignal.timeout(5000) })
  if (!res.ok) {
    throw new Error(`Website API returned non-OK status: ${res.status} ${res.statusText}`)
  }
  const result = websiteSocialLinksSchema.safeParse(await res.json())
  if (!result.success) {
    throw new Error("Website API response failed validation", { cause: result.error })
  }
  const { discordHref, instagramHref, tiktokHref, linkedinHref } = result.data

  const links: { icon: FooterSocialLink["icon"]; label: string; href?: string | null }[] = [
    { icon: "instagram", label: "Instagram", href: instagramHref },
    { icon: "tiktok", label: "TikTok", href: tiktokHref },
    { icon: "linkedin", label: "LinkedIn", href: linkedinHref },
    { icon: "discord", label: "Discord", href: discordHref },
  ]
  return links.filter((link): link is FooterSocialLink => Boolean(link.href))
}

/**
 * Gets the social links managed in the website's CMS, or an empty list if the fetch fails. Errors
 * are caught inside the cache scope, as a thrown error fails the prerender. A failed fetch uses
 * the short-lived `seconds` profile, so the empty list is not prerendered into the static shell
 * and is retried soon. Deduplicated per request, as the footer reads it in more than one place.
 */
export const getSocialLinksCached = cache(async (): Promise<FooterSocialLink[]> => {
  "use cache"

  try {
    const links = await getSocialLinks()
    cacheLife("hours")
    return links
  } catch (error) {
    console.error("[getSocialLinks] Failed to fetch social links from the website", {
      error,
      url: SOCIAL_LINKS_URL,
    })
    cacheLife("seconds")
    return []
  }
})
