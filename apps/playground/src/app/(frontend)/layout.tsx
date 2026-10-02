import type { Metadata } from "next"
import localFont from "next/font/local"
import { SessionProvider } from "@/features/user/context/SessionContext"
import "../globals.css"
import { Footer } from "@/features/layout/components/Footer/Footer"
import { PlaygroundNavbar } from "@/features/layout/components/PlaygroundNavbar/PlaygroundNavbar"

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
    default: "UOACS Project Playground",
    template: "%s - UOACS Project Playground",
  },
  description: "A place for projects built by University of Auckland Computer Society members.",
}

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      className={`${inter.variable} ${switzer.variable} ${mono.variable} ${neulis.variable} overflow-x-hidden`}
      lang="en"
    >
      <body className="flex min-h-screen flex-col overflow-x-hidden">
        <SessionProvider>
          <PlaygroundNavbar />

          <div className="mx-auto flex w-full max-w-[1480px] grow flex-col px-4 py-6 md:px-12 lg:px-20">
            <main className="flex grow flex-col items-center gap-14 py-9 md:gap-30">
              {children}
            </main>
          </div>
          <Footer links={[]} socialLinks={[]} />
        </SessionProvider>
      </body>
    </html>
  )
}
