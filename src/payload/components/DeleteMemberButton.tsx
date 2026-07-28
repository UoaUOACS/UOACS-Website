"use client"

import { Button, useDocumentInfo } from "@payloadcms/ui"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { ApiError, api } from "@/lib/api/api-client"
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
      await api.delete(ApiRoutes.ADMIN.MEMBERS(id), { toastOnError: false })
      router.push("/payload/admin/collections/member")
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Unexpected error — please try again")
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
