"use client"

import { Component, type ReactNode } from "react"

interface LoadBoundaryProps {
  children: ReactNode
  /**
   * Shown in place of the children when their code fails to load
   */
  message: string
  /**
   * Prefixes the logged error, e.g. "RichTextField"
   */
  source: string
}

/**
 * Catches a failed load of lazy code, e.g. offline, so the rest of the page keeps working
 */
export class LoadBoundary extends Component<LoadBoundaryProps, { failed: boolean }> {
  state = { failed: false }

  static getDerivedStateFromError() {
    return { failed: true }
  }

  componentDidCatch(error: unknown) {
    console.error(`[${this.props.source}] code failed to load`, { error })
  }

  render() {
    if (this.state.failed) {
      return (
        <p className="text-red-600 text-sm" role="alert">
          {this.props.message}
        </p>
      )
    }
    return this.props.children
  }
}
