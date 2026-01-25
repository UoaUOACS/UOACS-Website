import { faDiscord, faInstagram, faLinkedin, faTiktok } from "@fortawesome/free-brands-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/Primitive"

const SOCIAL_LINKS = [
  { icon: faDiscord, label: "Discord", href: "https://discord.gg/xSgqAmGE" },
  { icon: faInstagram, label: "Instagram", href: "https://www.instagram.com/uoacs25/" },
  { icon: faTiktok, label: "TikTok", href: "https://www.tiktok.com/@uoacs?lang=en-GB" },
  {
    icon: faLinkedin,
    label: "LinkedIn",
    href: "https://www.linkedin.com/company/university-of-auckland-compsci-society/posts/?feedView=all",
  },
] as const

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Meet the team", href: "/team" },
  { label: "Our sponsors", href: "/sponsors" },
] as const

export const Footer = () => {
  return (
    <footer className="relative min-h-72 w-full overflow-hidden bg-gray-800 p-7 text-white">
      <div className="flex min-h-64 flex-col">
        <nav aria-label="Social media links" className="flex items-start gap-4">
          {SOCIAL_LINKS.map(({ icon, label, href }) => (
            <Button
              aria-label={label}
              key={label}
              variant={{ border: true, size: "sm", theme: "primary" }}
            >
              <a
                aria-label={`Visit our ${label}`}
                href={href}
                rel="noopener noreferrer"
                target="_blank"
              >
                <FontAwesomeIcon className="md:text-3xl" fontSize={24} icon={icon} />
              </a>
            </Button>
          ))}
        </nav>

        <div className="flex flex-1 flex-col items-start gap-4 md:flex-row md:items-end md:gap-8">
          <div className="mb-10 flex">
            <Image
              alt="UOACS Logo"
              className="mt-8 md:mt-0"
              height={150}
              src="/uoacs-logo.svg"
              width={150}
            />
          </div>

          <nav
            aria-label="Footer navigation"
            className="flex flex-col justify-end gap-4 pl-1 text-lg md:pl-20"
          >
            {NAV_LINKS.map(({ label, href }) => (
              <Link className="font-mono" href={href} key={label}>
                {label}
              </Link>
            ))}
          </nav>

          <div className="relative z-10 mt-8 flex flex-1 items-end justify-start md:justify-end">
            <a
              href="https://docs.google.com/forms/d/e/1FAIpQLSdV530DNIMfGaQJwllWgLq22gsZpIutlHU2NwImHjmJyjWrQQ/viewform"
              rel="noopener"
              target="_blank"
            >
              <Button variant={{ border: true, size: "sm", theme: "primary" }}>
                INTERESTED? JOIN US
              </Button>
            </a>
          </div>
        </div>
      </div>

      <Image
        alt="Background Gradient"
        aria-hidden="true"
        className="pointer-events-none absolute right-0 bottom-0 w-full md:max-w-[60%]"
        height={850}
        src="/uoacs-gradient.svg"
        width={850}
      />
    </footer>
  )
}
