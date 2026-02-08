"use client"

import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline"
import { AnimatePresence, motion } from "motion/react"
import Image from "next/image"
import Link, { type LinkProps } from "next/link"
import { useEffect, useState } from "react"
import { BorderButton, Heading, SocialIcon } from "@/components/Primitive"
import { cn } from "@/lib/utils"
import type { NavbarProps } from "../Navbar"
import { mobileNavbarVariants } from "./variants"

/**
 * A mobile navbar component that displays a logo, navigation links, social media icons, and a join button.
 *
 * @param links Links to be displayed in the mobile navbar.
 * @param socialLinks Social links to be displayed in the mobile navbar.
 */
export const MobileNavbar = ({ links, socialLinks }: NavbarProps) => {
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsOpen(false)
      }
    }

    window.addEventListener("resize", handleResize)
    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }

    return () => {
      document.body.style.overflow = ""
    }
  }, [isOpen])

  return (
    <>
      <div className="md:hidden">
        <AnimatePresence>
          {!isOpen && (
            <motion.div layoutId="navbar-button">
              <BorderButton
                borderClassName="z-50 md:hidden"
                onClick={() => setIsOpen(true)}
                variant={{ size: "sm", theme: "primary", border: true }}
              >
                {/* TODO: make something less janky */}
                <Bars3Icon className="h-6 w-6 origin-center scale-[1.1] stroke-[2.5]" />
              </BorderButton>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            animate={{ opacity: 1 }}
            className={cn("md:hidden", mobileNavbarVariants({ isOpen }))}
            exit={{ opacity: 0 }}
            initial={{ opacity: 0 }}
          >
            <div className="flex w-full flex-row items-center justify-between px-4">
              <motion.div layoutId="navbar-logo">
                <Link href="/" onClick={() => setIsOpen(false)}>
                  <Image alt="UOACS Logo" height={40} src="/uoacs-logo-bw.svg" width={167} />
                </Link>
              </motion.div>
              <motion.div layoutId="navbar-button">
                <BorderButton
                  borderClassName="z-50"
                  onClick={() => setIsOpen(!isOpen)}
                  variant={{ size: "sm", theme: "primary", border: true }}
                >
                  {/* TODO: make something less janky */}
                  <XMarkIcon className="h-6 w-6 origin-center scale-[1.1] stroke-[2.5]" />
                </BorderButton>
              </motion.div>
            </div>
            <div className="w-full">
              {links.map((link) => (
                <MobileNavbarButton key={link.href} {...link} onClick={() => setIsOpen(false)} />
              ))}
            </div>
            <div className="flex w-fit flex-row gap-6 text-2xl text-gray-700">
              {socialLinks.map((link) => (
                <a href={link.href} key={link.href} rel="noopener noreferrer" target="_blank">
                  <SocialIcon className="h-6 w-6" icon={link.icon} />
                </a>
              ))}
            </div>
            <a
              href="https://docs.google.com/forms/d/e/1FAIpQLSdV530DNIMfGaQJwllWgLq22gsZpIutlHU2NwImHjmJyjWrQQ/viewform"
              rel="noopener noreferrer"
              target="_blank"
            >
              <BorderButton
                left={<div className="h-2.5 w-2.5 rounded-[0.92px] bg-white" />}
                variant={{ size: "sm", theme: "dark" }}
              >
                JOIN US
              </BorderButton>
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

/**
 * A button component for the mobile navbar.
 *
 * @param label The label of the button.
 * @param props Additional LinkProps to be passed to the Link component.
 */
export const MobileNavbarButton = ({ label, ...props }: { label: string } & LinkProps) => {
  const gradientVariants = {
    initial: {
      scale: 1,
      opacity: 0.5,
      background: "linear-gradient(0deg, #FF9961, #F27F76, #C861A7, #8A40E7)",
    },
    hover: {
      scale: 1.2,
      opacity: 1,
      background: "linear-gradient(0deg, #FF307C, #FB76A7)",
    },
  }

  return (
    <motion.div animate="animate" initial="initial" whileHover="hover">
      <Link
        className="relative flex w-full flex-row items-center justify-between overflow-hidden border border-orange-50 p-6"
        {...props}
      >
        <Heading className="text-left" h={2}>
          {label}
        </Heading>
        <div className="h-8 w-8 rounded-full bg-linear-to-bl from-pink-500 to-pink-400" />
        <motion.div
          className="-bottom-3 -translate-x-1/2 absolute left-1/2 h-6 w-2/3 rounded-full blur-3xl"
          transition={{ duration: 0.3, ease: "easeInOut" }}
          variants={gradientVariants}
        />
      </Link>
    </motion.div>
  )
}
