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
          Anbieter dieser Internetseite ist:
          <br />
          <br />
          Saban Bilali
          <br />
          {business.street}
          <br />
          {business.postal} {business.city}
        </p>
      </section>

      <section>
        <h2 className="font-serif text-2xl text-foreground">Kontakt</h2>
        <p className="mt-3">
          Telefon:{" "}
          <a href={business.phoneHref} className="text-primary underline underline-offset-4">
            0174 8189415
          </a>
          <br />
          E-Mail:{" "}
          <a href={business.emailHref} className="text-primary underline underline-offset-4">
            {business.email}
          </a>
        </p>
      </section>

      <section>
        <h2 className="font-serif text-2xl text-foreground">Handelsregister</h2>
        <p className="mt-3">
          Eingetragen in das Handelsregister beim Amtsgericht [Vorgang ist noch nicht abgeschlossen]
          <br />
          unter HRA [Vorgang ist noch nicht abgeschlossen]
        </p>
      </section>

      <section>
        <h2 className="font-serif text-2xl text-foreground">Zuständige Aufsichtsbehörde</h2>
        <p className="mt-3">[Vorgang ist noch nicht abgeschlossen]</p>
      </section>

      <section>
        <h2 className="font-serif text-2xl text-foreground">Umsatzsteuer-ID</h2>
        <p className="mt-3">
          USt.-Id.-Nr. gemäß § 27 UStG: DE [Vorgang ist noch nicht abgeschlossen]
        </p>
      </section>

      <section>
        <h2 className="font-serif text-2xl text-foreground">Verantwortlich für den Inhalt</h2>
        <p className="mt-3">Inhaltlich Verantwortlicher gemäß § 18 Abs. 2 MStV: Saban Bilali</p>
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
    </LegalShell>
  )
}
