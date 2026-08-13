"use client"

import Image from "next/image"
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react"
import { useEffect, useRef, useState } from "react"
import { StaggerText } from "./reveal"

export function PanoramaSection() {
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
  const scale = useTransform(scrollYProgress, [0, 1], reduce ? [1, 1] : [1.15, 1])
  const y = useTransform(scrollYProgress, [0, 1], reduce ? ["0%", "0%"] : ["-6%", "6%"])

  return (
    <section ref={ref} className="relative h-[92svh] min-h-[560px] w-full overflow-hidden bg-espresso">
      <motion.div style={{ scale, y }} className="absolute inset-0">
        <Image
          src="/ambient/ambient3.png"
          alt="Sonnenterrasse des PANORAMA mit Blick über den Golfplatz Rehburg-Loccum bei Sonnenuntergang"
          fill
          sizes="100vw"
          className="object-cover"
        />
      </motion.div>

      <div className="absolute inset-0 bg-gradient-to-t from-espresso/90 via-espresso/25 to-espresso/50" />

      <div className="relative z-10 flex h-full items-end">
        <div className="mx-auto w-full max-w-[1600px] px-6 pb-16 md:px-10 md:pb-24">
          <div className="max-w-2xl">
            <motion.p
              initial={reduce ? false : { opacity: 0, x: -24 }}
              whileInView={reduce ? undefined : { opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              className="eyebrow text-bronze"
            >
              Der Ort · Golfclub Rehburg-Loccum
            </motion.p>

            <h2 className="mt-6 font-serif text-4xl font-light leading-[1.02] text-white md:text-7xl">
              <StaggerText lines={["Weiter Blick,", <em key="e" className="italic text-bronze">stille Weite.</em>]} />
            </h2>

            <motion.p
              initial={reduce ? false : { opacity: 0, y: 20 }}
              whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="mt-7 max-w-xl text-pretty text-lg leading-relaxed text-white/80"
            >
              Unsere Terrasse öffnet sich zum weiten Grün des Golfplatzes. Ein Glas
              Wein, ein langer Nachmittag, die Sonne über den Fairways – Momente,
              die bleiben.
            </motion.p>
          </div>
        </div>
      </div>
    </section>
  )
}
