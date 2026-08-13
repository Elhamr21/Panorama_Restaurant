"use client"

import { motion, useReducedMotion, useScroll, useTransform } from "motion/react"
import { useEffect, useRef, useState } from "react"
import { ChevronDown } from "lucide-react"
import { CtaLink } from "./cta"
import { SplitWords, ease } from "./reveal"

export function Hero() {
  const reduce = useReducedMotion()
  const videoRef = useRef<HTMLVideoElement>(null)
  const sectionRef = useRef<HTMLElement>(null)
  const [canPlayVideo, setCanPlayVideo] = useState(false)

  useEffect(() => {
    // Respect reduced-motion and small screens: keep the poster instead of a heavy video download.
    const smallScreen = window.matchMedia("(max-width: 640px)").matches
    if (reduce || smallScreen) return
    setCanPlayVideo(true)
  }, [reduce])

  useEffect(() => {
    if (canPlayVideo) videoRef.current?.play().catch(() => {})
  }, [canPlayVideo])

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end start"] })
  const bgScale = useTransform(scrollYProgress, [0, 1], reduce ? [1, 1] : [1, 1.16])
  const contentY = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [0, 90])
  const contentOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0])
  const overlayBoost = useTransform(scrollYProgress, [0, 1], [0, 0.35])

  const container = {
    hidden: {},
    show: { transition: { staggerChildren: 0.16, delayChildren: 0.25 } },
  }
  const item = {
    hidden: { opacity: 0, y: 26 },
    show: { opacity: 1, y: 0, transition: { duration: 1, ease } },
  }

  return (
    <section
      ref={sectionRef}
      id="top"
      className="relative h-[100svh] min-h-[640px] w-full overflow-hidden bg-espresso"
    >
      {/* Background layer: outer div carries the scroll-linked scale, inner div a slow idle zoom */}
      <motion.div className="absolute inset-0" style={{ scale: bgScale }}>
  <motion.div
    className="absolute inset-0"
    animate={reduce ? undefined : { scale: [1, 1.06, 1] }}
    transition={{
      duration: 22,
      repeat: Number.POSITIVE_INFINITY,
      ease: "easeInOut",
    }}
  >
    {canPlayVideo && (
      <video
        ref={videoRef}
        className="absolute inset-0 h-full w-full object-cover"
        muted
        loop
        playsInline
        preload="none"
        aria-hidden="true"
      >
        <source src="/hero.mp4" type="video/mp4" />
      </video>
    )}
  </motion.div>
</motion.div>

      {/* Layered cinematic overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-espresso/70 via-espresso/35 to-espresso/85" />
      <div className="absolute inset-0 cinematic-vignette" />
      <motion.div className="absolute inset-0 bg-espresso" style={{ opacity: overlayBoost }} />

      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        className="relative z-10 flex h-full items-center"
      >
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="mx-auto w-full max-w-[1600px] px-6 md:px-10"
        >
          <div className="max-w-3xl">
            <motion.div variants={item} className="overflow-hidden">
              <motion.p
                initial={{ scaleX: 0.82, opacity: 0 }}
                animate={{ scaleX: 1, opacity: 1 }}
                transition={{ duration: reduce ? 0 : 0.9, delay: reduce ? 0 : 0.15, ease }}
                style={{ transformOrigin: "left center" }}
                className="eyebrow text-bronze"
              >
                Golfclub Rehburg-Loccum
              </motion.p>
            </motion.div>

            <h1 className="mt-5 flex items-center font-serif font-light leading-[0.92] text-white text-[clamp(3rem,10vw,8.5rem)] tracking-[0.02em] md:whitespace-nowrap">
              <span className="overflow-hidden">
                <motion.span
                  className="block"
                  initial={{ y: "100%" }}
                  animate={{ y: "0%" }}
                  transition={{ duration: reduce ? 0 : 0.9, delay: reduce ? 0 : 0.3, ease }}
                >
                  PAN
                </motion.span>
              </span>
              <motion.span
                aria-hidden="true"
                initial={{ scale: 0.3, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: reduce ? 0 : 0.7, delay: reduce ? 0 : 0.75, ease: [0.34, 1.56, 0.64, 1] }}
                className="mx-[0.03em] inline-block rounded-full border border-white/90 align-middle"
                style={{ width: "0.6em", height: "0.6em" }}
              />
              <span className="overflow-hidden">
                <motion.span
                  className="block"
                  initial={{ y: "100%" }}
                  animate={{ y: "0%" }}
                  transition={{ duration: reduce ? 0 : 0.9, delay: reduce ? 0 : 0.4, ease }}
                >
                  RAMA
                </motion.span>
              </span>
              <span className="sr-only">ORAMA</span>
            </h1>

            <motion.div variants={item} className="mt-2">
              <SplitWords
                text="Lounge & Restaurant"
                delay={0.9}
                className="font-sans text-sm md:text-base uppercase tracking-[0.42em] text-white/70"
              />
            </motion.div>

            <motion.p
              variants={item}
              className="mt-8 max-w-xl text-pretty text-lg md:text-xl leading-relaxed text-white/85"
            >
              Authentische kroatische Küche, herzliche Gastfreundschaft und ein
              weiter Blick über den Golfplatz. Ein Ort zum Verweilen.
            </motion.p>

            <motion.div variants={item} className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
              <CtaLink href="/menu" variant="solid" arrow>
                Speisekarte entdecken
              </CtaLink>
              <CtaLink href="#willkommen" variant="outlineLight">
                PANORAMA erleben
              </CtaLink>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.a
        href="#willkommen"
        aria-label="Weiter scrollen"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 1 }}
        className="absolute bottom-7 left-1/2 z-10 -translate-x-1/2 text-white/70 transition-colors hover:text-white"
      >
        <motion.span
          animate={reduce ? undefined : { y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="block"
        >
          <ChevronDown className="h-6 w-6" strokeWidth={1.3} />
        </motion.span>
      </motion.a>
    </section>
  )
}
