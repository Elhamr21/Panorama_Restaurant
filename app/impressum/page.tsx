import type { Metadata } from "next"
import { business } from "@/lib/site-data"
import { LegalShell } from "@/components/site/legal-shell"

export const metadata: Metadata = {
  title: "Impressum",
  description: "Impressum und Anbieterkennzeichnung des PANORAMA Lounge & Restaurant.",
  robots: { index: false },
}

export default function ImpressumPage() {
  return (
    <LegalShell title="Impressum">
      <section>
        <h2 className="font-serif text-2xl text-foreground">Angaben gemäß § 5 DDG</h2>
        <p className="mt-3">
          {business.name}
          <br />
          {business.street}
          <br />
          {business.postal} {business.city}
          <br />
          {business.country}
        </p>
      </section>

      <section>
        <h2 className="font-serif text-2xl text-foreground">Kontakt</h2>
        <p className="mt-3">
          Telefon:{" "}
          <a href={business.phoneHref} className="text-primary underline underline-offset-4">
            {business.phone}
          </a>
          <br />
          E-Mail:{" "}
          <a href={business.emailHref} className="text-primary underline underline-offset-4">
            {business.email}
          </a>
        </p>
      </section>

      <section>
        <h2 className="font-serif text-2xl text-foreground">Umsatzsteuer-ID</h2>
        <p className="mt-3">
          Umsatzsteuer-Identifikationsnummer gemäß § 27 a Umsatzsteuergesetz: [bitte ergänzen]
        </p>
      </section>

      <section>
        <h2 className="font-serif text-2xl text-foreground">Verantwortlich für den Inhalt</h2>
        <p className="mt-3">nach § 18 Abs. 2 MStV: [Name der verantwortlichen Person, bitte ergänzen]</p>
      </section>

      <section>
        <h2 className="font-serif text-2xl text-foreground">Streitschlichtung</h2>
        <p className="mt-3">
          Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit:{" "}
          <a
            href="https://ec.europa.eu/consumers/odr/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary underline underline-offset-4"
          >
            https://ec.europa.eu/consumers/odr/
          </a>
          . Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer
          Verbraucherschlichtungsstelle teilzunehmen.
        </p>
      </section>

      <p className="text-sm">
        Hinweis: Die mit [bitte ergänzen] markierten Angaben müssen vor Veröffentlichung durch den Betreiber
        vervollständigt werden.
      </p>
    </LegalShell>
  )
}
