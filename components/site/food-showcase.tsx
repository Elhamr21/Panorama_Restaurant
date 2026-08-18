"use client"

import Image from "next/image"
import { Reveal, StaggerText, SplitWords } from "./reveal"
import { CtaLink } from "./cta"
import { foodPhotos, dietary } from "@/lib/site-data"

export function FoodShowcase() {
  return (
    <section id="kueche" className="relative bg-secondary py-16 md:py-24">
      <div className="mx-auto max-w-[1600px] px-6 md:px-10">
        {/* Header */}
        <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-end">
          <div className="max-w-2xl">
            <SplitWords text="Die Küche" className="eyebrow text-primary" />
            <h2 className="mt-4 text-balance font-serif text-3xl font-light leading-[1.05] md:text-5xl">
              <StaggerText delay={0.1} lines={["Authentische kroatische Küche"]} />
            </h2>
            <Reveal delay={0.15}>
              <p className="mt-4 max-w-xl text-pretty text-sm leading-relaxed text-muted-foreground md:text-base">
                Von der Adria inspiriert – frisch zubereitet, mit Liebe zum Detail.
              </p>
            </Reveal>
          </div>
          <Reveal delay={0.2}>
            <ul className="flex flex-wrap gap-1.5 lg:justify-end">
              {dietary.map((d) => (
                <li
                  key={d}
                  className="rounded-full border border-border bg-card px-3 py-1 text-[11px] font-medium tracking-wide text-muted-foreground"
                >
                  {d}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        {/* Dish grid — clean, evenly aligned, compact rhythm */}
        <div className="mt-10 grid grid-cols-2 gap-x-5 gap-y-8 md:mt-12 lg:grid-cols-4">
          {foodPhotos.map((dish, i) => (
            <Reveal key={dish.src} delay={0.04 * (i % 4)} y={30} scale={0.97}>
              <article className="group flex h-full flex-col">
                <figure className="frame">
                  <div className="frame-inner aspect-square w-full bg-muted">
                    <Image
                      src={dish.src || "/placeholder.svg"}
                      alt={dish.alt}
                      fill
                      sizes="(max-width:640px) 50vw, (max-width:1024px) 50vw, 24vw"
                      priority={i < 4}
                      className="object-cover transition-transform duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.06]"
                    />
                  </div>
                </figure>
                <h3 className="mt-3 font-serif text-base font-light leading-tight text-foreground md:text-lg">
                  {dish.name}
                </h3>
                <p className="mt-1 line-clamp-2 text-pretty text-xs leading-snug text-muted-foreground md:text-sm">
                  {dish.desc}
                </p>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.1}>
          <div className="mt-10 flex justify-center">
            <CtaLink href="#speisekarte" variant="solid" arrow>
              Unsere Speisekarte
            </CtaLink>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
