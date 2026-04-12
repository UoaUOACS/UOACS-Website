"use client"

import { Button, useDocumentInfo } from "@payloadcms/ui"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { ApiRoutes } from "@/lib/routes"

export function DeleteMemberButton() {
  const { id } = useDocumentInfo()
  const router = useRouter()
  const [confirming, setConfirming] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleDelete() {
    if (!id) return
    setLoading(true)
    setError(null)

    try {
      const res = await fetch(ApiRoutes.ADMIN.MEMBERS(id), { method: "DELETE" })
      if (!res.ok) {
        const body = await res.json().catch(() => ({}))
        setError(body.error ?? `Delete failed (${res.status})`)
        setConfirming(false)
        return
      }
      router.push("/payload/admin/collections/member")
    } catch {
      setError("Unexpected error — please try again")
      setConfirming(false)
    } finally {
      setLoading(false)
    }
  }

  if (confirming) {
    return (
      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
        <span style={{ fontSize: "13px" }}>Delete member and auth user?</span>
        <Button
          buttonStyle="primary"
          className="btn--delete"
          disabled={loading}
          onClick={handleDelete}
          size="small"
        >
          {loading ? "Deleting…" : "Yes, delete"}
        </Button>
        <Button
          buttonStyle="secondary"
          disabled={loading}
          onClick={() => setConfirming(false)}
          size="small"
        >
          Cancel
        </Button>
        {error && (
          <span style={{ color: "var(--theme-error-500)", fontSize: "13px" }}>{error}</span>
        )}
      </div>
    )
  }

  return (
    <Button
      buttonStyle="primary"
      className="btn--delete"
      onClick={() => setConfirming(true)}
      size="small"
    >
      Delete with Auth
    </Button>
  )
}
