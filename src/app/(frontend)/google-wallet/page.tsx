"use client"

import { useState } from "react"
import { ApiRoutes } from "@/lib/routes"

const ROUTES = [
  { label: "getJWT", payload: { getJWT: true } },
  { label: "createPassObject", payload: { createPassObject: true } },
  { label: "createPassClass", payload: { createPassClass: true } },
]

export default function ApiTester() {
  const [response, setResponse] = useState<string | null>(null)
  const [loading, setLoading] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  async function call(label: string, payload: object) {
    setLoading(label)
    setResponse(null)
    setError(null)

    try {
      const res = await fetch(ApiRoutes.GOOGLE_WALLET, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
        credentials: "include",
      })
      const data = await res.json()
      setResponse(JSON.stringify(data, null, 2))
    } catch (e) {
      setError(String(e))
    } finally {
      setLoading(null)
    }
  }

  return (
    <div style={{ padding: "2rem", fontFamily: "monospace" }}>
      <h2>API Tester</h2>
      <div style={{ display: "flex", gap: "1rem", marginBottom: "1.5rem" }}>
        {ROUTES.map(({ label, payload }) => (
          <button
            disabled={loading !== null}
            key={label}
            onClick={() => call(label, payload)}
            type="button"
          >
            {loading === label ? "Loading..." : label}
          </button>
        ))}
      </div>

      {error && <pre style={{ color: "red" }}>{error}</pre>}

      {response && (
        <pre style={{ background: "#f4f4f4", padding: "1rem", borderRadius: "4px" }}>
          {response}
        </pre>
      )}
    </div>
  )
}
