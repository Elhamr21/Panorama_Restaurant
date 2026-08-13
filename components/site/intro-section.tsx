"use client"

import Image from "next/image"
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react"
import { useEffect, useRef, useState } from "react"
import { Reveal, StaggerText, SplitWords } from "./reveal"
import { CtaLink } from "./cta"

export function IntroSection() {
  const reduce = useReducedMotion()
  const ref = useRef<HTMLDivElement>(null)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    if (ref.current) setReady(true)
  }, [])

  const { scrollYProgress } = useScroll({
    target: ready ? ref : undefined,
    offset: ["start end", "end start"],
  })
  const y = useTransform(scrollYProgress, [0, 1], reduce ? ["0%", "0%"] : ["-8%", "8%"])

  return (
    <section ref={ref} id="willkommen" className="relative bg-background py-24 md:py-36">
      <div className="mx-auto grid max-w-[1600px] items-center gap-12 px-6 md:px-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-20">
        {/* Text */}
        <div className="order-2 lg:order-1">
          <SplitWords text="Willkommen" className="eyebrow text-primary" />
          <h2 className="mt-6 text-balance font-serif text-4xl font-light leading-[1.05] md:text-6xl">
            <StaggerText
              delay={0.1}
              lines={["Ein Stück Kroatien,", <span key="e" className="italic text-primary">mit Aussicht.</span>]}
            />
          </h2>
          <div className="mt-8 max-w-xl space-y-5 text-base md:text-lg leading-relaxed text-muted-foreground">
            <Reveal delay={0.15}>
              <p>
                Das PANORAMA Lounge &amp; Restaurant liegt eingebettet in den Golfclub
                Rehburg-Loccum. Zwischen weiten Grünflächen und ruhiger Landschaft
                verbinden wir mediterrane Wärme mit entspannter Lounge-Atmosphäre.
              </p>
            </Reveal>
            <Reveal delay={0.2}>
              <p>
                Bei uns wird jedes Gericht mit Sorgfalt zubereitet – nach kroatischer
                Tradition, mit frischen Zutaten und viel Herz. Ob langes Mittagessen auf
                der Terrasse oder ein Abend mit Freunden: Hier nimmt man sich Zeit.
              </p>
            </Reveal>
          </div>
          <Reveal delay={0.25}>
            <div className="mt-10">
              <CtaLink href="/menu" variant="outline" arrow>
                Zur Speisekarte
              </CtaLink>
            </div>
          </Reveal>
        </div>

        {/* Image — main shot kept at a gentle, near-full-frame crop, with a smaller overlapping accent photo for depth */}
        <Reveal className="order-1 lg:order-2" y={40} scale={0.96}>
          <div className="relative mx-auto w-full max-w-sm lg:max-w-none">
            <div className="frame aspect-square">
              <div className="frame-inner h-full w-full bg-muted">
                <motion.div style={{ y }} className="absolute inset-[-4%]">
                  <Image
                    src="/ambient/ambient6.png"
                    alt="Gedeckter Tisch mit Cappuccino, Rose und Kerze im PANORAMA"
                    fill
                    sizes="(max-width: 1024px) 90vw, 40vw"
                    className="object-cover"
                  />
                </motion.div>
              </div>
            </div>

            <Reveal
              delay={0.3}
              y={20}
              className="absolute -bottom-8 -left-8 z-10 hidden w-[40%] lg:block xl:-left-12"
            >
              <div className="frame aspect-[4/3] shadow-[0_32px_60px_-24px_rgba(0,0,0,0.75)]">
                <div className="frame-inner h-full w-full bg-muted">
                  <Image
                    src="/ambient/ambient1.png"
                    alt="Restaurantsaal mit roten Tischen und Bar im PANORAMA"
                    fill
                    sizes="18vw"
                    className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] hover:scale-[1.08]"
                  />
                </div>
              </div>
            </Reveal>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
