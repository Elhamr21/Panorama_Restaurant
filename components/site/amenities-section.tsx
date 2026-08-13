import { Accessibility, PartyPopper, ShoppingBag, Sun, Truck, Wifi } from "lucide-react"
import { amenities, dietary } from "@/lib/site-data"
import { Reveal, StaggerText, SplitWords } from "./reveal"

const icons: Record<string, typeof Sun> = {
  Terrasse: Sun,
  Barrierefrei: Accessibility,
  "Feiern & Events": PartyPopper,
  "Take Away": ShoppingBag,
  Lieferung: Truck,
  WLAN: Wifi,
}

export function AmenitiesSection() {
  return (
    <section className="bg-background py-24 md:py-28">
      <div className="mx-auto max-w-6xl px-6 md:px-10">
        <Reveal className="max-w-2xl">
          <SplitWords text="Gut zu wissen" className="eyebrow text-primary" />
          <h2 className="mt-6 text-balance font-serif text-4xl font-light leading-[1.05] md:text-5xl">
            <StaggerText delay={0.1} lines={["Alles für Ihren Besuch"]} />
          </h2>
        </Reveal>

        <div className="mt-14 grid gap-px overflow-hidden rounded-lg border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
          {amenities.map((item, i) => {
            const Icon = icons[item.title] ?? Sun
            return (
              <Reveal
                key={item.title}
                delay={i * 0.05}
                className="group relative bg-card p-8 transition-all duration-300 hover:z-10 hover:bg-secondary hover:shadow-[0_24px_48px_-28px_rgba(0,0,0,0.4)]"
              >
                <div className="flex items-center justify-between">
                  <span className="flex size-11 items-center justify-center rounded-full bg-primary/10 text-primary transition-transform duration-300 ease-out group-hover:-rotate-6 group-hover:scale-110">
                    <Icon className="size-5" strokeWidth={1.6} />
                  </span>
                  <p className="font-mono text-xs tabular-nums text-muted-foreground">
                    {String(i + 1).padStart(2, "0")}
                  </p>
                </div>
                <h3 className="mt-5 font-serif text-2xl font-light text-foreground">{item.title}</h3>
                <p className="mt-2 leading-relaxed text-muted-foreground">{item.desc}</p>
              </Reveal>
            )
          })}
        </div>

        <Reveal delay={0.1} className="mt-8 flex flex-wrap items-center gap-3">
          <span className="eyebrow text-muted-foreground">Ernährung:</span>
          {dietary.map((d) => (
            <span
              key={d}
              className="rounded-full border border-border bg-secondary px-4 py-1.5 text-sm text-foreground"
            >
              {d}
            </span>
          ))}
        </Reveal>
      </div>
    </section>
  )
}
