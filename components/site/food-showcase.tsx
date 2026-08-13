"use client"

import Image from "next/image"
import { Reveal, StaggerText, SplitWords } from "./reveal"
import { CtaLink } from "./cta"
import { foodPhotos, dietary } from "@/lib/site-data"
import { cn } from "@/lib/utils"

export function FoodShowcase() {
  return (
    <section id="kueche" className="relative bg-secondary py-24 md:py-36">
      <div className="mx-auto max-w-[1600px] px-6 md:px-10">
        {/* Header */}
        <div className="grid gap-10 lg:grid-cols-[1fr_auto] lg:items-end">
          <div className="max-w-2xl">
            <SplitWords text="Die Küche" className="eyebrow text-primary" />
            <h2 className="mt-6 text-balance font-serif text-4xl font-light leading-[1.05] md:text-6xl">
              <StaggerText delay={0.1} lines={["Authentische kroatische Küche"]} />
            </h2>
            <Reveal delay={0.15}>
              <p className="mt-6 max-w-xl text-base md:text-lg leading-relaxed text-muted-foreground">
                Von der Adria inspiriert: gegrillter Fisch, mediterrane Antipasti,
                hausgemachte Pasta und Pizza aus dem Ofen. Frisch zubereitet, mit
                Liebe zum Detail und einem Menü für jeden Geschmack.
              </p>
            </Reveal>
          </div>
          <Reveal delay={0.2}>
            <ul className="flex flex-wrap gap-2 lg:justify-end">
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
        </div>

        {/* 4-column dish grid: image + name + description, staggered rhythm to avoid a flat uniform grid */}
        <div className="mt-14 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 md:mt-20 lg:grid-cols-4">
          {foodPhotos.map((dish, i) => (
            <Reveal key={dish.src} delay={0.04 * (i % 4)} y={40} scale={0.96}>
              <article
                className={cn(
                  "group flex h-full flex-col",
                  i % 3 === 1 && "lg:translate-y-8",
                  i % 3 === 2 && "lg:-translate-y-4",
                )}
              >
                <figure className="frame">
                  <div className="frame-inner aspect-square w-full bg-muted">
                    <Image
                      src={dish.src || "/placeholder.svg"}
                      alt={dish.alt}
                      fill
                      sizes="(max-width:640px) 100vw, (max-width:1024px) 50vw, 24vw"
                      priority={i < 4}
                      className="object-cover transition-transform duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.06]"
                    />
                  </div>
                </figure>
                <h3 className="mt-5 font-serif text-xl font-light leading-tight text-foreground">
                  {dish.name}
                </h3>
                <div className="mt-2 h-px w-8 bg-primary/60 transition-all duration-500 group-hover:w-14" />
                <p className="mt-3 text-pretty text-sm leading-relaxed text-muted-foreground">
                  {dish.desc}
                </p>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.1}>
          <div className="mt-16 flex justify-center">
            <CtaLink href="#speisekarte" variant="solid" arrow>
              Unsere Speisekarte
            </CtaLink>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
