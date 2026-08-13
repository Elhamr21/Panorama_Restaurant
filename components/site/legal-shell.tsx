import type { ReactNode } from "react"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Logo } from "./logo"
import { Footer } from "./footer"

export function LegalShell({ title, children }: { title: string; children: ReactNode }) {
  return (
    <>
      <header className="border-b border-border bg-background">
        <div className="mx-auto flex max-w-3xl items-center justify-between px-6 py-5">
          <Link href="/" aria-label="Zur Startseite">
            <Logo className="h-8 w-auto text-foreground" />
          </Link>
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-primary"
          >
            <ArrowLeft className="size-4" /> Zurück
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-6 py-16 md:py-24">
        <h1 className="font-serif text-4xl text-foreground md:text-5xl">{title}</h1>
        <div className="legal-prose mt-10 space-y-6 leading-relaxed text-muted-foreground">{children}</div>
      </main>

      <Footer />
    </>
  )
}
