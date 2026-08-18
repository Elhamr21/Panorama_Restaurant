import Link from "next/link"
import { business, nav } from "@/lib/site-data"
import { Logo } from "./logo"

export function Footer() {
  return (
    <footer className="border-t border-border bg-secondary">
      <div className="mx-auto max-w-6xl px-6 py-16 md:px-10">
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <Logo className="h-9 w-auto text-foreground" />
            <p className="mt-5 max-w-xs text-pretty leading-relaxed text-muted-foreground">
              Kroatische Küche mit Panoramablick &ndash; direkt am {business.locatedAt}. Herzlich willkommen.
            </p>
          </div>

          <nav aria-label="Footer-Navigation">
            <h3 className="eyebrow text-muted-foreground">Entdecken</h3>
            <ul className="mt-5 space-y-3">
              {nav.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-foreground transition-colors hover:text-primary">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h3 className="eyebrow text-muted-foreground">Kontakt</h3>
            <address className="mt-5 space-y-3 not-italic text-foreground">
              <p className="text-muted-foreground">
                {business.street}
                <br />
                {business.postal} {business.city}
              </p>
              <a href={business.phoneHref} className="block transition-colors hover:text-primary">
                {business.phone}
              </a>
              <a href={business.emailHref} className="block transition-colors hover:text-primary">
                {business.email}
              </a>
            </address>
          </div>
        </div>

<div className="mt-14 grid grid-cols-1 items-center gap-4 border-t border-border pt-8 text-sm text-muted-foreground md:grid-cols-3">
  {/* Left */}
  <p className="text-center md:text-left">
    &copy; {new Date().getFullYear()} {business.name}. Alle Rechte vorbehalten.
  </p>

  {/* Center */}
  <p className="text-center">
    Developed by{" "}
    <a
      href="https://clearline-ai.tech/en"
      target="_blank"
      rel="noopener noreferrer"
      className="transition-colors hover:text-primary"
    >
      ClearlineTech
    </a>
  </p>

  {/* Right */}
  <div className="flex justify-center gap-6 md:justify-end">
    <Link
      href="/impressum"
      className="transition-colors hover:text-primary"
    >
      Impressum
    </Link>
    <Link
      href="/datenschutz"
      className="transition-colors hover:text-primary"
    >
      Datenschutz
    </Link>
  </div>
</div>
      </div>
    </footer>
  )
}
