import { ArrowRightIcon } from "@heroicons/react/24/solid"
import Link from "next/link"
import { SocialLinks } from "@/components/Generic"
import { Button, Heading } from "@/components/Primitive"
import { getSocialLinks } from "@/lib/helpers"

export default async function NotFoundPage() {
  const socialLinks = await getSocialLinks()
  return (
    <div className="flex grow flex-col items-center justify-center gap-30">
      <div className="flex max-w-64 flex-col items-center justify-center gap-6 text-center">
        <div>
          <Heading h={1}>404</Heading>
          <p className="paragraph">The page you are looking for does not exist.</p>
        </div>
        <Link href="/">
          <Button right={<ArrowRightIcon className="size-5" />} theme="dark">
            Go Home
          </Button>
        </Link>
      </div>
      <div className="flex flex-col items-center gap-3">
        <p className="paragraph-sm font-medium">Our Socials:</p>
        <SocialLinks links={socialLinks} />
      </div>
    </div>
  )
}
