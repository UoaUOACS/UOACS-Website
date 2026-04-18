"use client"

import { useState } from "react"

export default function ApiTester() {
  const [response, setResponse] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function createPass() {
    setLoading(true)
    setResponse(null)
    setError(null)

    try {
      const res = await fetch("/api/google-wallet/pass", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({}),
      })
      const data = await res.json()
      setResponse(JSON.stringify(data, null, 2))
    } catch (e) {
      setError(String(e))
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ padding: "2rem", fontFamily: "monospace" }}>
      <h2>Google Wallet API Tester</h2>
      <div style={{ display: "flex", gap: "1rem", alignItems: "center", marginBottom: "1.5rem" }}>
        <button disabled={loading} onClick={createPass} type="button">
          {loading ? "Loading..." : "createPass"}
        </button>
        <a href="/api/google-wallet/link" rel="noopener noreferrer" target="_blank">
          Open wallet link ↗
        </a>
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
