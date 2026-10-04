const websiteUrl = process.env.NEXT_PUBLIC_WEBSITE_URL

const links: { label: string; href: string | undefined }[] = [
  { label: "Website", href: websiteUrl },
  { label: "Project Playground", href: process.env.NEXT_PUBLIC_PROJECTS_URL },
]

/**
 * A footer for the auth app, with copyright, privacy policy and links to the other UOACS apps.
 *
 * @returns A Footer component with copyright, privacy policy and app links.
 */
export function AuthFooter() {
  return (
    <footer className="flex w-full flex-row flex-wrap items-start justify-between gap-4 bg-gray-800 p-5 text-white md:p-6">
      <div className="flex flex-col gap-1">
        <p className="paragraph-sm text-gray-400">UOACS &copy; {new Date().getFullYear()}</p>
        <a
          className="paragraph-xs w-fit text-gray-400 transition-colors hover:text-white"
          href={`${websiteUrl}/privacy`}
        >
          Privacy Policy
        </a>
      </div>
      <nav aria-label="Footer navigation" className="flex flex-row gap-6">
        {links.map(({ label, href }) => (
          <a className="paragraph-sm w-fit font-medium hover:underline" href={href} key={label}>
            {label}
          </a>
        ))}
      </nav>
    </footer>
  )
}
