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

        <div className="mt-14 flex flex-col gap-4 border-t border-border pt-8 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>
            &copy; {new Date().getFullYear()} {business.name}. Alle Rechte vorbehalten.
          </p>
          <div className="flex gap-6">
            <Link href="/impressum" className="transition-colors hover:text-primary">
              Impressum
            </Link>
            <Link href="/datenschutz" className="transition-colors hover:text-primary">
              Datenschutz
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
