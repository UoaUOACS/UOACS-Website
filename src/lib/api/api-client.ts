import { toast } from "@/lib/toast"

export type ApiFieldError = { field: string; message: string }

export class ApiError extends Error {
  constructor(
    message: string,
    public readonly status: number,
    public readonly fieldErrors?: ApiFieldError[],
  ) {
    super(message)
    this.name = "ApiError"
  }
}

type RequestOptions = {
  method?: string
  headers?: Record<string, string>
  body?: unknown
  params?: Record<string, string | number | boolean | undefined | null>
  cache?: RequestCache
  next?: NextFetchRequestConfig
  toastOnError?: boolean
}

function resolveUrl(url: string): string {
  if (typeof window !== "undefined") return url
  return `${process.env.NEXT_PUBLIC_URL}${url}`
}

function buildUrlWithParams(url: string, params?: RequestOptions["params"]): string {
  if (!params) return url
  const filteredParams = Object.fromEntries(
    Object.entries(params).filter(([, value]) => value !== undefined && value !== null),
  )
  if (Object.keys(filteredParams).length === 0) return url
  const queryString = new URLSearchParams(filteredParams as Record<string, string>).toString()
  return `${url}?${queryString}`
}

async function fetchApi<T>(url: string, options: RequestOptions = {}): Promise<T> {
  const {
    method = "GET",
    headers = {},
    body,
    params,
    cache = "no-store",
    next,
    toastOnError = true,
  } = options

  const fullUrl = buildUrlWithParams(resolveUrl(url), params)

  const response = await fetch(fullUrl, {
    method,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      ...headers,
    },
    body: body ? JSON.stringify(body) : undefined,
    credentials: "include",
    cache,
    next,
  })

  if (!response.ok) {
    const responseBody = await response.json().catch(() => null)
    const fieldErrors = Array.isArray(responseBody?.error) ? responseBody.error : undefined
    const message = fieldErrors
      ? "Validation failed"
      : typeof responseBody?.error === "string"
        ? responseBody.error
        : response.statusText

    if (toastOnError && typeof window !== "undefined") {
      toast.error({ description: message })
    }

    throw new ApiError(message, response.status, fieldErrors)
  }

  if (response.status === 204) return undefined as T

  return response.json().catch(() => {
    throw new ApiError("Received an invalid response from the server", response.status)
  })
}

export const api = {
  get<T>(url: string, options?: RequestOptions): Promise<T> {
    return fetchApi<T>(url, { ...options, method: "GET" })
  },
  post<T>(url: string, body?: unknown, options?: RequestOptions): Promise<T> {
    return fetchApi<T>(url, { ...options, method: "POST", body })
  },
  put<T>(url: string, body?: unknown, options?: RequestOptions): Promise<T> {
    return fetchApi<T>(url, { ...options, method: "PUT", body })
  },
  patch<T>(url: string, body?: unknown, options?: RequestOptions): Promise<T> {
    return fetchApi<T>(url, { ...options, method: "PATCH", body })
  },
  delete<T>(url: string, options?: RequestOptions): Promise<T> {
    return fetchApi<T>(url, { ...options, method: "DELETE" })
  },
}
