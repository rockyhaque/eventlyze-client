"use client"

import { useState, useEffect } from "react"
import { usePathname } from "next/navigation"
import { LoadingScreen } from "./loading-screen"

export function PageTransition() {
  const pathname = usePathname()
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    // Show loading state briefly when pathname changes
    setLoading(true)

    // Clear loading state after a short delay
    const timer = setTimeout(() => {
      setLoading(false)
    }, 800) // Short enough to not be annoying, long enough to be visible

    return () => clearTimeout(timer)
  }, [pathname])

  return loading ? <LoadingScreen /> : null
}
