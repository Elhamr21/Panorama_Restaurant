"use client"

import Image from "next/image"
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react"
import { useRef } from "react"
import { business } from "@/lib/site-data"
import { Reveal, StaggerText, SplitWords } from "./reveal"
import { CtaButton } from "./cta"

export function FinalCta() {
  const reduce = useReducedMotion()
  const sectionRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] })
  const scale = useTransform(scrollYProgress, [0, 1], reduce ? [1, 1] : [1.1, 1.28])

  return (
    <section ref={sectionRef} className="relative overflow-hidden">
      <motion.div className="absolute inset-0" style={{ scale }}>
        <Image
          src="/ambient/ambient5.png"
          alt="Belebte Lounge im PANORAMA mit Gästen und kühlem Bier"
          fill
          className="object-cover"
          sizes="100vw"
        />
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-t from-espresso via-espresso/75 to-espresso/55" />
      <div className="relative mx-auto flex max-w-3xl flex-col items-center px-6 py-28 text-center text-white md:py-36">
        <Reveal className="flex flex-col items-center">
          <SplitWords text={business.locatedAt} className="eyebrow text-bronze" />
          <h2 className="mt-6 text-balance font-serif text-4xl font-light leading-[1.05] md:text-6xl">
            <StaggerText delay={0.1} lines={["Ein Platz mit Aussicht wartet auf Sie"]} />
          </h2>
          <p className="mt-5 max-w-xl text-pretty leading-relaxed text-white/80">
            Ob Mittagessen nach der Runde, ein gemütliches Abendessen oder Ihre nächste Feier &ndash; reservieren Sie
            jetzt Ihren Tisch im PANORAMA.
          </p>
          <div className="mt-9 flex flex-wrap justify-center gap-3">
            <CtaButton href={business.phoneHref}>{business.phone}</CtaButton>
            <CtaButton href="/menu" variant="ghostLight" arrow>
              Speisekarte ansehen
            </CtaButton>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
