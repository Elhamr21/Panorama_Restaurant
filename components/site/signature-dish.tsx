"use client"

import Image from "next/image"
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react"
import { useEffect, useRef, useState } from "react"
import { signatureFood } from "@/lib/site-data"

export function SignatureDish() {
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
  const scale = useTransform(scrollYProgress, [0, 1], reduce ? [1, 1] : [1.12, 1])

  return (
    <section ref={ref} className="relative h-[88svh] min-h-[520px] w-full overflow-hidden bg-espresso">
      <motion.div
        style={{ scale }}
        initial={reduce ? false : { clipPath: "inset(12% 12% 12% 12%)" }}
        whileInView={reduce ? undefined : { clipPath: "inset(0% 0% 0% 0%)" }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        className="absolute inset-0"
      >
        <Image
          src={signatureFood.src}
          alt={signatureFood.alt}
          fill
          sizes="100vw"
          className="object-cover"
        />
      </motion.div>

      <div className="absolute inset-0 bg-gradient-to-t from-espresso/85 via-transparent to-espresso/40" />

      <div className="relative z-10 flex h-full items-center justify-center px-6 text-center">
        <div className="max-w-3xl">
          <motion.p
            initial={reduce ? false : { opacity: 0, y: 16 }}
            whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.3 }}
            className="eyebrow text-bronze"
          >
            Kroatische Küche
          </motion.p>
          <motion.h2
            initial={reduce ? false : { opacity: 0, y: 24 }}
            whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.42, ease: [0.22, 1, 0.36, 1] }}
            className="mt-5 text-balance font-serif text-4xl font-light italic leading-tight text-white md:text-7xl"
          >
            „Mit Leidenschaft zubereitet.“
          </motion.h2>
          <motion.p
            initial={reduce ? false : { opacity: 0 }}
            whileInView={reduce ? undefined : { opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.6 }}
            className="mx-auto mt-6 max-w-xl text-pretty text-base md:text-lg leading-relaxed text-white/80"
          >
            Frischer Fisch, feine Aromen, ehrliches Handwerk – auf jedem Teller
            steckt ein Stück adriatische Lebensfreude.
          </motion.p>
        </div>
      </div>
    </section>
  )
}
