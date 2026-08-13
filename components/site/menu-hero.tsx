"use client"

import Image from "next/image"
import Link from "next/link"
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react"
import { useRef } from "react"
import { ChevronDown, ArrowLeft } from "lucide-react"
import { SplitWords, ease } from "./reveal"

export function MenuHero() {
  const reduce = useReducedMotion()
  const sectionRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end start"] })
  const bgScale = useTransform(scrollYProgress, [0, 1], reduce ? [1, 1] : [1, 1.14])
  const contentOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0])

  const container = {
    hidden: {},
    show: { transition: { staggerChildren: 0.14, delayChildren: 0.2 } },
  }
  const item = {
    hidden: { opacity: 0, y: 22 },
    show: { opacity: 1, y: 0, transition: { duration: 0.9, ease } },
  }

  return (
    <section
      ref={sectionRef}
      id="top"
      className="relative flex h-[72svh] min-h-[460px] w-full items-center overflow-hidden bg-espresso"
    >
      <motion.div className="absolute inset-0" style={{ scale: bgScale }}>
        <motion.div
          className="absolute inset-0"
          animate={reduce ? undefined : { scale: [1, 1.06, 1] }}
          transition={{ duration: 22, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
        >
          <Image src="/food/food7.png" alt="" aria-hidden fill priority sizes="100vw" className="object-cover" />
        </motion.div>
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-b from-espresso/75 via-espresso/45 to-espresso/90" />
      <div className="absolute inset-0 cinematic-vignette" />

      <motion.div
        variants={container}
        initial={reduce ? undefined : "hidden"}
        animate={reduce ? undefined : "show"}
        style={{ opacity: contentOpacity }}
        className="relative z-10 mx-auto w-full max-w-[1600px] px-6 md:px-10"
      >
        <motion.div variants={item}>
          <Link
            href="/"
            className="group inline-flex items-center gap-2 text-sm text-white/70 transition-colors hover:text-white"
          >
            <ArrowLeft
              className="h-4 w-4 transition-transform duration-300 group-hover:-translate-x-1"
              strokeWidth={1.5}
            />
            Zurück zur Startseite
          </Link>
        </motion.div>

        <motion.div variants={item} className="mt-8">
          <SplitWords text="PANORAMA · Kroatische Küche" className="eyebrow text-bronze" />
        </motion.div>
        <h1 className="mt-5 overflow-hidden font-serif font-light leading-[0.95] text-white text-[clamp(2.75rem,8vw,6rem)]">
          <SplitWords text="Unsere Speisekarte" delay={0.55} stagger={0.08} />
        </h1>
        <motion.p
          variants={item}
          className="mt-6 max-w-xl text-pretty text-lg leading-relaxed text-white/85"
        >
          Entdecken Sie unsere Gerichte – erst als Eindruck aus der Küche, dann
          Seite für Seite in unserer aufklappbaren Karte.
        </motion.p>
      </motion.div>

      <motion.a
        href="#speisekarte"
        aria-label="Zur Speisekarte scrollen"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 1 }}
        className="absolute bottom-7 left-1/2 z-10 -translate-x-1/2 text-white/70 transition-colors hover:text-white"
      >
        <motion.span
          animate={reduce ? undefined : { y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
          className="block"
        >
          <ChevronDown className="h-6 w-6" strokeWidth={1.3} />
        </motion.span>
      </motion.a>
    </section>
  )
}
