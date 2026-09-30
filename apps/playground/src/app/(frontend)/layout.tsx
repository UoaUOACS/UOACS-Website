import type { Metadata } from "next"
import localFont from "next/font/local"
import { SessionProvider } from "@/features/user/context/SessionContext"
import "../globals.css"

const inter = localFont({
  src: "../../../../../packages/ui/src/styles/fonts/InterTight-Variable.woff2",
  weight: "100 900",
  variable: "--font-inter",
  display: "optional",
})

const switzer = localFont({
  src: "../../../../../packages/ui/src/styles/fonts/Switzer-Variable.woff2",
  weight: "100 900",
  variable: "--font-switzer",
  display: "optional",
})

const mono = localFont({
  src: [
    {
      path: "../../../../../packages/ui/src/styles/fonts/IBMPlexMono-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../../../../packages/ui/src/styles/fonts/IBMPlexMono-Medium.woff2",
      weight: "500",
      style: "normal",
    },
  ],
  variable: "--font-mono",
  display: "optional",
})

const neulis = localFont({
  src: [
    {
      path: "../../../../../packages/ui/src/styles/fonts/Neulis-Cursive-Thin.woff2",
      weight: "100",
    },
    {
      path: "../../../../../packages/ui/src/styles/fonts/Neulis-Cursive-Extra-Light.woff2",
      weight: "200",
    },
    {
      path: "../../../../../packages/ui/src/styles/fonts/Neulis-Cursive-Light.woff2",
      weight: "300",
    },
    {
      path: "../../../../../packages/ui/src/styles/fonts/Neulis-Cursive-Regular.woff2",
      weight: "400",
    },
    {
      path: "../../../../../packages/ui/src/styles/fonts/Neulis-Cursive-Medium.woff2",
      weight: "500",
    },
    {
      path: "../../../../../packages/ui/src/styles/fonts/Neulis-Cursive-Semi-Bold.woff2",
      weight: "600",
    },
    {
      path: "../../../../../packages/ui/src/styles/fonts/Neulis-Cursive-Bold.woff2",
      weight: "700",
    },
    {
      path: "../../../../../packages/ui/src/styles/fonts/Neulis-Cursive-Extra-Bold.woff2",
      weight: "800",
    },
  ],
  variable: "--font-neulis",
  display: "optional",
})

export const metadata: Metadata = {
  title: {
    default: "UOACS Projects",
    template: "%s - UOACS Projects",
  },
  description: "Projects built by University of Auckland Computer Society members.",
}

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      className={`${inter.variable} ${switzer.variable} ${mono.variable} ${neulis.variable} overflow-x-hidden`}
      lang="en"
    >
      <body className="relative flex min-h-screen flex-col overflow-hidden">
        <SessionProvider>{children}</SessionProvider>
      </body>
    </html>
  )
}
