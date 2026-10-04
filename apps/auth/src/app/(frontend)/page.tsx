import { AuthPages } from "@uoacs/shared"
import { redirect } from "next/navigation"

export default function HomePage() {
  redirect(AuthPages.LOGIN)
}
