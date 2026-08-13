import type { Metadata } from "next"
import { business } from "@/lib/site-data"
import { LegalShell } from "@/components/site/legal-shell"

export const metadata: Metadata = {
  title: "Datenschutzerklärung",
  description: "Datenschutzerklärung des PANORAMA Lounge & Restaurant.",
  robots: { index: false },
}

export default function DatenschutzPage() {
  return (
    <LegalShell title="Datenschutz">
      <p>
        Der Schutz Ihrer persönlichen Daten ist uns ein wichtiges Anliegen. Nachfolgend informieren wir Sie über die
        Erhebung und Verwendung personenbezogener Daten bei der Nutzung dieser Website.
      </p>

      <section>
        <h2 className="font-serif text-2xl text-foreground">Verantwortlicher</h2>
        <p className="mt-3">
          {business.name}
          <br />
          {business.street}, {business.postal} {business.city}
          <br />
          E-Mail:{" "}
          <a href={business.emailHref} className="text-primary underline underline-offset-4">
            {business.email}
          </a>
        </p>
      </section>

      <section>
        <h2 className="font-serif text-2xl text-foreground">Server-Logfiles</h2>
        <p className="mt-3">
          Beim Besuch dieser Website werden durch den Hosting-Anbieter automatisch Informationen (z. B. IP-Adresse,
          Datum und Uhrzeit des Zugriffs, Browsertyp) erhoben und in Server-Logfiles gespeichert. Dies dient der
          Sicherheit und dem technisch fehlerfreien Betrieb (Art. 6 Abs. 1 lit. f DSGVO).
        </p>
      </section>

      <section>
        <h2 className="font-serif text-2xl text-foreground">Kontaktaufnahme</h2>
        <p className="mt-3">
          Wenn Sie uns per Telefon oder E-Mail kontaktieren, werden Ihre Angaben zur Bearbeitung Ihrer Anfrage
          verarbeitet und nicht ohne Ihre Einwilligung weitergegeben (Art. 6 Abs. 1 lit. b und f DSGVO).
        </p>
      </section>

      <section>
        <h2 className="font-serif text-2xl text-foreground">Google Maps</h2>
        <p className="mt-3">
          Zur Darstellung unseres Standorts binden wir Google Maps (Google Ireland Ltd.) ein. Die Karte wird erst nach
          Ihrer Einwilligung über den Cookie-Hinweis geladen. Dabei können Daten wie Ihre IP-Adresse an Google
          übertragen werden. Weitere Informationen finden Sie in der{" "}
          <a
            href="https://policies.google.com/privacy"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary underline underline-offset-4"
          >
            Datenschutzerklärung von Google
          </a>
          .
        </p>
      </section>

      <section>
        <h2 className="font-serif text-2xl text-foreground">Ihre Rechte</h2>
        <p className="mt-3">
          Sie haben jederzeit das Recht auf Auskunft, Berichtigung, Löschung, Einschränkung der Verarbeitung,
          Datenübertragbarkeit sowie Widerspruch. Zudem steht Ihnen ein Beschwerderecht bei einer Aufsichtsbehörde zu.
        </p>
      </section>

      <p className="text-sm">
        Diese Datenschutzerklärung ist eine Grundlage und sollte vor Veröffentlichung rechtlich geprüft und an die
        tatsächlich eingesetzten Dienste angepasst werden.
      </p>
    </LegalShell>
  )
}
