"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { CtaButton } from "./cta"

const STORAGE_KEY = "panorama-consent"

export function CookieConsent() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    try {
      if (!localStorage.getItem(STORAGE_KEY)) setVisible(true)
    } catch {
      // ignore storage errors
    }
  }, [])

  function decide(value: "accepted" | "declined") {
    try {
      localStorage.setItem(STORAGE_KEY, value)
    } catch {
      // ignore
    }
    setVisible(false)
  }

  if (!visible) return null

  return (
    <div
      role="dialog"
      aria-label="Cookie-Hinweis"
      aria-live="polite"
      className="fixed inset-x-3 bottom-3 z-50 mx-auto max-w-2xl rounded-lg border border-border bg-card/95 p-5 shadow-2xl backdrop-blur-md md:inset-x-6 md:bottom-6 md:p-6"
    >
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between md:gap-6">
        <p className="text-pretty text-sm leading-relaxed text-muted-foreground">
          Wir verwenden Cookies, um unsere Website optimal zu gestalten. Externe Inhalte wie die Karte werden erst nach
          Ihrer Zustimmung geladen. Mehr in unserer{" "}
          <Link href="/datenschutz" className="text-primary underline underline-offset-4">
            Datenschutzerklärung
          </Link>
          .
        </p>
        <div className="flex shrink-0 gap-3">
          <CtaButton variant="outline" className="px-5 py-2.5 min-h-0 text-xs" onClick={() => decide("declined")}>
            Ablehnen
          </CtaButton>
          <CtaButton className="px-5 py-2.5 min-h-0 text-xs" onClick={() => decide("accepted")}>
            Akzeptieren
          </CtaButton>
        </div>
      </div>
    </div>
  )
}
