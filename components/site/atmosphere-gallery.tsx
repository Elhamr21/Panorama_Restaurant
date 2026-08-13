"use client"

import Image from "next/image"
import { useState } from "react"
import { Plus } from "lucide-react"
import { ambientPhotos } from "@/lib/site-data"
import { Reveal, StaggerText, SplitWords } from "./reveal"
import { Lightbox } from "./lightbox"
import { cn } from "@/lib/utils"

const spanClass: Record<string, string> = {
  wide: "sm:col-span-2",
  tall: "sm:row-span-2",
  normal: "",
}

const aspect: Record<string, string> = {
  wide: "aspect-[16/9]",
  tall: "aspect-[3/4] sm:h-full",
  normal: "aspect-square",
}

export function AtmosphereGallery() {
  const [index, setIndex] = useState<number | null>(null)
  const items = ambientPhotos.map((p) => ({ src: p.src, alt: p.alt }))

  return (
    <section id="galerie" className="relative bg-background py-24 md:py-36">
      <div className="mx-auto max-w-[1600px] px-6 md:px-10">
        <div className="mb-14 max-w-2xl md:mb-20">
          <SplitWords text="Atmosphäre" className="eyebrow text-primary" />
          <h2 className="mt-6 text-balance font-serif text-4xl font-light leading-[1.05] md:text-6xl">
            <StaggerText delay={0.1} lines={["Räume zum Wohlfühlen"]} />
          </h2>
          <Reveal delay={0.15}>
            <p className="mt-6 max-w-xl text-base md:text-lg leading-relaxed text-muted-foreground">
              Von der lichtdurchfluteten Lounge bis zur Terrasse im Grünen – jeder
              Winkel des PANORAMA erzählt seine eigene Geschichte.
            </p>
          </Reveal>
        </div>

        <div className="grid auto-rows-[minmax(0,1fr)] grid-cols-2 gap-3 [grid-auto-flow:dense] sm:grid-cols-3 sm:gap-4 lg:grid-cols-4">
          {ambientPhotos.map((p, i) => (
            <Reveal
              key={p.src}
              as="figure"
              y={40}
              scale={0.94}
              delay={(i % 4) * 0.05}
              className={cn(spanClass[p.span])}
            >
              <button
                onClick={() => setIndex(i)}
                aria-label={`${p.alt} – vergrößern`}
                className={cn(
                  "group frame-line relative w-full bg-muted",
                  aspect[p.span],
                )}
              >
                <Image
                  src={p.src}
                  alt={p.alt}
                  fill
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  loading="lazy"
                  className="object-cover brightness-[0.97] transition-[transform,filter] duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.06] group-hover:brightness-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-espresso/80 via-espresso/0 to-espresso/0 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                <span className="absolute inset-x-3 bottom-3 line-clamp-2 translate-y-2 text-left text-xs leading-snug text-white/90 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                  {p.alt}
                </span>
                <span className="absolute right-3 top-3 grid h-9 w-9 -translate-y-2 place-items-center rounded-full bg-white/85 text-espresso opacity-0 backdrop-blur transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                  <Plus className="h-4 w-4" strokeWidth={1.6} />
                </span>
              </button>
            </Reveal>
          ))}
        </div>
      </div>

      <Lightbox items={items} index={index} onClose={() => setIndex(null)} onIndexChange={setIndex} />
    </section>
  )
}
