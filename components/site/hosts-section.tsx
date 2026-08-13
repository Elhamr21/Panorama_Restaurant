import Image from "next/image"
import { teamPhotos } from "@/lib/site-data"
import { Reveal, StaggerText, SplitWords } from "./reveal"
import { cn } from "@/lib/utils"

export function HostsSection() {
  return (
    <section id="gastgeber" className="bg-secondary py-24 md:py-32">
      <div className="mx-auto grid max-w-[1600px] gap-14 px-6 md:px-10 lg:grid-cols-2 lg:items-center lg:gap-20">
        <Reveal className="order-2 lg:order-1">
          <SplitWords text="Ihre Gastgeber" className="eyebrow text-primary" />
          <h2 className="mt-6 text-balance font-serif text-4xl font-light leading-[1.05] md:text-5xl">
            <StaggerText delay={0.1} lines={["Mit Herz & Gastfreundschaft"]} />
          </h2>
          <div className="mt-8 max-w-xl space-y-5 leading-relaxed text-muted-foreground">
            <p>
              Hinter dem PANORAMA steht ein eingespieltes Team, das seine Gäste wie Freunde empfängt. Vom ersten
              Espresso am Morgen bis zum letzten Glas Wein am Abend sind wir mit Leidenschaft für Sie da.
            </p>
            <p>
              In unserer Küche entstehen Tag für Tag frische, kroatisch inspirierte Gerichte &ndash; von Hand
              zubereitet, mit besten Zutaten und dem unverwechselbaren Geschmack des Mittelmeers. Herzlich willkommen
              an unserem Tisch.
            </p>
          </div>
          <div className="mt-9 flex flex-wrap gap-8">
            <div>
              <p className="font-serif text-3xl font-light text-foreground">Täglich frisch</p>
              <p className="mt-1.5 eyebrow text-muted-foreground">Aus eigener Küche</p>
            </div>
            <div>
              <p className="font-serif text-3xl font-light text-foreground">Ein Team</p>
              <p className="mt-1.5 eyebrow text-muted-foreground">Wie eine Familie</p>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.15} scale={0.96} className="order-1 lg:order-2">
          <div className="grid grid-cols-2 gap-4">
            <div className="group frame-line relative col-span-2 aspect-[16/10] bg-muted">
              <Image
                src={teamPhotos[0].src || "/placeholder.svg"}
                alt={teamPhotos[0].alt}
                fill
                className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.05]"
                sizes="(max-width: 1024px) 100vw, 40vw"
              />
            </div>
            {teamPhotos.slice(1).map((photo, i) => (
              <div
                key={photo.src}
                className={cn(
                  "group frame-line relative aspect-square bg-muted shadow-[0_20px_45px_-24px_rgba(0,0,0,0.6)]",
                  i === 0 && "-mt-8 ml-4 lg:-mt-12 lg:ml-8",
                )}
              >
                <Image
                  src={photo.src || "/placeholder.svg"}
                  alt={photo.alt}
                  fill
                  className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.08]"
                  sizes="(max-width: 1024px) 50vw, 20vw"
                />
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  )
}
