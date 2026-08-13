import Image from "next/image"
import { Reveal, StaggerText, SplitWords } from "./reveal"
import { CtaLink } from "./cta"
import { foodPhotos, dietary } from "@/lib/site-data"

export function MenuTeaser() {
  const preview = foodPhotos.slice(0, 3)

  return (
    <section id="kueche" className="relative overflow-hidden bg-secondary py-24 md:py-36">
      <div className="mx-auto grid max-w-[1600px] items-center gap-16 px-6 md:px-10 lg:grid-cols-[0.95fr_1.05fr] lg:gap-20">
        {/* Text */}
        <div>
          <SplitWords text="Die Küche" className="eyebrow text-primary" />
          <h2 className="mt-6 text-balance font-serif text-4xl font-light leading-[1.05] md:text-6xl">
            <StaggerText delay={0.1} lines={["Authentische kroatische Küche"]} />
          </h2>
          <Reveal delay={0.15}>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg">
              Von der Adria inspiriert: gegrillter Fisch, mediterrane Antipasti,
              hausgemachte Pasta und Pizza aus dem Ofen. Frisch zubereitet, mit
              Liebe zum Detail – aufgeschlagen als digitale Speisekarte zum Blättern.
            </p>
          </Reveal>
          <Reveal delay={0.2}>
            <ul className="mt-7 flex flex-wrap gap-2">
              {dietary.map((d) => (
                <li
                  key={d}
                  className="rounded-full border border-border bg-card px-4 py-2 text-xs font-medium tracking-wide text-muted-foreground"
                >
                  {d}
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={0.25}>
            <div className="mt-10">
              <CtaLink href="/menu" variant="solid" arrow>
                Zur Speisekarte
              </CtaLink>
            </div>
          </Reveal>
        </div>

        {/* Framed image collage — staggered, asymmetric rhythm with hover captions */}
        <Reveal y={40} scale={0.96} className="grid grid-cols-2 gap-4 md:gap-6">
          <DishFigure photo={preview[0]} className="col-span-2 aspect-[16/10]" sizes="(max-width: 1024px) 100vw, 52vw" />
          <DishFigure photo={preview[1]} className="aspect-square lg:mt-8" sizes="(max-width: 1024px) 50vw, 26vw" />
          <DishFigure photo={preview[2]} className="aspect-square lg:-mt-8" sizes="(max-width: 1024px) 50vw, 26vw" />
        </Reveal>
      </div>
    </section>
  )
}

function DishFigure({
  photo,
  className,
  sizes,
}: {
  photo: { src: string; alt: string; name: string }
  className?: string
  sizes: string
}) {
  return (
    <figure className={`group frame ${className}`}>
      <div className="frame-inner relative h-full w-full bg-muted">
        <Image
          src={photo.src}
          alt={photo.alt}
          fill
          sizes={sizes}
          className="object-cover transition-transform duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.06]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-espresso/70 via-espresso/0 to-espresso/0 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
        <figcaption className="absolute inset-x-4 bottom-3 translate-y-2 text-sm font-medium text-white opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
          {photo.name}
        </figcaption>
      </div>
    </figure>
  )
}
