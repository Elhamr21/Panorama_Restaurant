import { Clock, MapPin, Phone, Mail } from "lucide-react"
import { business } from "@/lib/site-data"
import { Reveal, StaggerText, SplitWords } from "./reveal"
import { CtaButton } from "./cta"

const iconBadge =
  "mt-1 flex size-11 shrink-0 items-center justify-center rounded-full bg-secondary text-primary transition-transform duration-300 ease-out group-hover:-rotate-6 group-hover:scale-110"

export function LocationSection() {
  const mapSrc = `https://www.google.com/maps?q=${encodeURIComponent(business.mapsQuery)}&output=embed`

  return (
    <section id="besuch" className="bg-background py-24 md:py-32">
      <div className="mx-auto max-w-[1600px] px-6 md:px-10">
        <Reveal className="max-w-2xl">
          <SplitWords text="Besuch planen" className="eyebrow text-primary" />
          <h2 className="mt-6 text-balance font-serif text-4xl font-light leading-[1.05] md:text-5xl">
            <StaggerText delay={0.1} lines={["Wir freuen uns auf Sie"]} />
          </h2>
        </Reveal>

        <div className="mt-14 grid gap-10 lg:grid-cols-2 lg:gap-16">
          <Reveal className="flex flex-col gap-8">
            <div className="group flex gap-5">
              <span className={iconBadge}>
                <Clock className="size-5" />
              </span>
              <div>
                <h3 className="font-serif text-xl text-foreground">Öffnungszeiten</h3>
                <p className="mt-1 leading-relaxed text-muted-foreground">{business.hours}</p>
                <p className="text-muted-foreground">{business.closed}</p>
              </div>
            </div>

            <div className="group flex gap-5">
              <span className={iconBadge}>
                <MapPin className="size-5" />
              </span>
              <div>
                <h3 className="font-serif text-xl text-foreground">Adresse</h3>
                <p className="mt-1 leading-relaxed text-muted-foreground">
                  {business.street}
                  <br />
                  {business.postal} {business.city}
                  <br />
                  <span className="text-sm">am {business.locatedAt}</span>
                </p>
              </div>
            </div>

            <div className="group flex gap-5">
              <span className={iconBadge}>
                <Phone className="size-5" />
              </span>
              <div>
                <h3 className="font-serif text-xl text-foreground">Kontakt</h3>
                <a href={business.phoneHref} className="mt-1 block text-muted-foreground transition-colors hover:text-primary">
                  {business.phone}
                </a>
                <a href={business.emailHref} className="flex items-center gap-2 text-muted-foreground transition-colors hover:text-primary">
                  <Mail className="size-4" /> {business.email}
                </a>
              </div>
            </div>

            <div className="flex flex-wrap gap-3 pt-2">
              <CtaButton href={business.phoneHref}>Tisch reservieren</CtaButton>
              <CtaButton
                href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(business.mapsQuery)}`}
                variant="outline"
                external
                arrow
              >
                Route berechnen
              </CtaButton>
            </div>
          </Reveal>

          <Reveal delay={0.15} scale={0.97}>
            <div className="group relative aspect-[4/3] overflow-hidden rounded-lg border border-border lg:aspect-auto lg:h-full lg:min-h-[420px]">
              <iframe
                title={`Karte – Standort ${business.name}`}
                src={mapSrc}
                className="absolute inset-0 size-full grayscale-[0.35] transition-[filter] duration-700 ease-out group-hover:grayscale-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
