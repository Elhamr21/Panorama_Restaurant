"use client"

import { Phone, MapPin, BookOpen } from "lucide-react"
import Link from "next/link"
import { business } from "@/lib/site-data"

export function MobileBar() {
  const items = [
    { label: "Speisekarte", href: "/menu", icon: BookOpen, external: false },
    { label: "Anrufen", href: business.phoneHref, icon: Phone, external: true },
    {
      label: "Route",
      href: `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(business.mapsQuery)}`,
      icon: MapPin,
      external: true,
    },
  ]

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-background/95 backdrop-blur-md md:hidden">
      <nav
        aria-label="Schnellzugriff"
        className="mx-auto grid max-w-md grid-cols-3 pb-[env(safe-area-inset-bottom)]"
      >
        {items.map(({ label, href, icon: Icon, external }) => {
          const content = (
            <>
              <Icon className="size-5 text-primary" />
              <span className="font-medium">{label}</span>
            </>
          )
          const cls =
            "flex flex-col items-center justify-center gap-1 py-3 text-xs text-foreground transition-colors active:bg-secondary"
          return external ? (
            <a key={label} href={href} className={cls}>
              {content}
            </a>
          ) : (
            <Link key={label} href={href} className={cls}>
              {content}
            </Link>
          )
        })}
      </nav>
    </div>
  )
}
