"use client"

import Image from "next/image"
import { AnimatePresence, motion, useReducedMotion } from "motion/react"
import { useCallback, useEffect, useRef, useState } from "react"
import { ChevronLeft, ChevronRight, Maximize2, X } from "lucide-react"
import { menuPages } from "@/lib/site-data"
import { Reveal, StaggerText, SplitWords } from "./reveal"
import { cn } from "@/lib/utils"

const TOTAL = menuPages.length
const SPREADS = Math.ceil(TOTAL / 2)
const PAGE_RATIO = 740 / 1100

/** Safe page source lookup */
function pageSrc(i: number): string | null {
  return i >= 0 && i < TOTAL ? menuPages[i].src : null
}

type Turn = { dir: 1 | -1 } | null

export function MenuBook() {
  const reduce = useReducedMotion()
  const [isWide, setIsWide] = useState(true)
  const [spread, setSpread] = useState(0) // desktop: two-page spread index
  const [page, setPage] = useState(0) // mobile: single page index
  const [turn, setTurn] = useState<Turn>(null)
  const [fs, setFs] = useState(false)

  // Track viewport for single vs. double page
  useEffect(() => {
    const m = window.matchMedia("(min-width: 1024px)")
    const on = () => setIsWide(m.matches)
    on()
    m.addEventListener("change", on)
    return () => m.removeEventListener("change", on)
  }, [])

  // ---- Desktop spread navigation (with page-turn) ----
  const turnConsumed = useRef(false)
  const startTurn = useCallback(
    (dir: 1 | -1) => {
      if (turn) return
      if (dir === 1 && spread >= SPREADS - 1) return
      if (dir === -1 && spread <= 0) return
      if (reduce) {
        setSpread((s) => s + dir)
        return
      }
      turnConsumed.current = false
      setTurn({ dir })
    },
    [turn, spread, reduce],
  )

  const finishTurn = useCallback((dir: 1 | -1) => {
    if (turnConsumed.current) return // ignore duplicate onAnimationComplete
    turnConsumed.current = true
    setSpread((s) => Math.max(0, Math.min(SPREADS - 1, s + dir)))
    setTurn(null)
  }, [])

  // ---- Mobile single-page navigation ----
  const [mDir, setMDir] = useState(1)
  const goPage = useCallback((next: number) => {
    setPage((prev) => {
      const clamped = Math.max(0, Math.min(TOTAL - 1, next))
      setMDir(clamped >= prev ? 1 : -1)
      return clamped
    })
  }, [])

  // ---- Keyboard ----
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") isWide ? startTurn(1) : goPage(page + 1)
      else if (e.key === "ArrowLeft") isWide ? startTurn(-1) : goPage(page - 1)
      else if (e.key === "Escape") setFs(false)
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [isWide, startTurn, goPage, page])

  // Lock scroll in fullscreen
  useEffect(() => {
    document.body.style.overflow = fs ? "hidden" : ""
    return () => {
      document.body.style.overflow = ""
    }
  }, [fs])

  const atStart = isWide ? spread === 0 : page === 0
  const atEnd = isWide ? spread === SPREADS - 1 : page === TOTAL - 1
  const label = isWide
    ? `Seiten ${spread * 2 + 1}–${Math.min(spread * 2 + 2, TOTAL)} / ${TOTAL}`
    : `Seite ${page + 1} / ${TOTAL}`

  const handlePrev = () => (isWide ? startTurn(-1) : goPage(page - 1))
  const handleNext = () => (isWide ? startTurn(1) : goPage(page + 1))

  /* ------------------------------- Book stage ------------------------------- */

  const DesktopBook = (
    <div
      className="relative mx-auto w-full"
      style={{ perspective: "2600px", maxWidth: fs ? "min(96vw, 1180px)" : "1040px" }}
    >
      <div
        className="book-shell relative w-full"
        style={{ aspectRatio: `${PAGE_RATIO * 2}`, transformStyle: "preserve-3d" }}
      >
        {/* Static left page */}
        <BookPage side="left" src={pageSrc(spread * 2)} />
        {/* Static right page (revealed underneath during forward turn) */}
        <BookPage
          side="right"
          src={turn?.dir === 1 ? pageSrc((spread + 1) * 2 + 1) : pageSrc(spread * 2 + 1)}
        />
        {/* Left underneath revealed during backward turn */}
        {turn?.dir === -1 && <BookPage side="left" src={pageSrc((spread - 1) * 2)} />}

        {/* Center spine */}
        <div className="pointer-events-none absolute inset-y-0 left-1/2 z-20 w-10 -translate-x-1/2 bg-gradient-to-r from-black/0 via-black/45 to-black/0" />

        {/* Turning leaf */}
        <AnimatePresence>
          {turn && (
            <TurningLeaf
              dir={turn.dir}
              front={turn.dir === 1 ? pageSrc(spread * 2 + 1) : pageSrc(spread * 2)}
              back={turn.dir === 1 ? pageSrc((spread + 1) * 2) : pageSrc(spread * 2 - 1)}
              onDone={() => finishTurn(turn.dir)}
            />
          )}
        </AnimatePresence>
      </div>

      {/* Neighbour preload */}
      <div className="pointer-events-none absolute h-px w-px overflow-hidden opacity-0" aria-hidden>
        {[spread * 2 + 2, spread * 2 + 3, spread * 2 - 1, spread * 2 - 2].map((p) => {
          const s = pageSrc(p)
          return s ? <Image key={p} src={s} alt="" width={30} height={44} /> : null
        })}
      </div>
    </div>
  )

  const MobileBook = (
    <div
      className="relative mx-auto w-full"
      style={{ perspective: "1800px", maxWidth: fs ? "min(92vw, 460px)" : "380px" }}
    >
      <div
        className="relative w-full overflow-hidden rounded-[3px] bg-white shadow-[0_30px_70px_-30px_rgba(0,0,0,0.85)]"
        style={{ aspectRatio: `${PAGE_RATIO}` }}
      >
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-6 bg-gradient-to-r from-black/12 to-transparent" />
        <AnimatePresence custom={mDir} mode="popLayout" initial={false}>
          <motion.div
            key={page}
            custom={mDir}
            initial={reduce ? { opacity: 0 } : { rotateY: mDir > 0 ? -80 : 80, opacity: 0 }}
            animate={{ rotateY: 0, opacity: 1 }}
            exit={reduce ? { opacity: 0 } : { rotateY: mDir > 0 ? 80 : -80, opacity: 0 }}
            transition={{ duration: reduce ? 0.2 : 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0"
            style={{ transformOrigin: mDir > 0 ? "left center" : "right center", transformStyle: "preserve-3d" }}
            drag={reduce ? false : "x"}
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.2}
            onDragEnd={(_, info) => {
              if (info.offset.x < -60) goPage(page + 1)
              else if (info.offset.x > 60) goPage(page - 1)
            }}
          >
            <Image
              src={menuPages[page].src}
              alt={menuPages[page].alt}
              fill
              sizes="(max-width: 640px) 90vw, 380px"
              priority={page === 0}
              className="select-none object-contain"
              draggable={false}
            />
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )

  const Controls = (
    <div className="mt-8 flex items-center justify-center gap-5">
      <button
        onClick={handlePrev}
        disabled={atStart}
        aria-label="Vorherige Seite"
        className={cn(
          "grid h-12 w-12 place-items-center rounded-full border border-white/25 text-white transition-all hover:border-white/70 hover:bg-white/10",
          atStart && "cursor-not-allowed opacity-30",
        )}
      >
        <ChevronLeft className="h-5 w-5" strokeWidth={1.5} />
      </button>

      <span className="min-w-[150px] text-center font-sans text-xs uppercase tracking-[0.22em] text-white/70">
        {label}
      </span>

      <button
        onClick={handleNext}
        disabled={atEnd}
        aria-label="Nächste Seite"
        className={cn(
          "grid h-12 w-12 place-items-center rounded-full border border-white/25 text-white transition-all hover:border-white/70 hover:bg-white/10",
          atEnd && "cursor-not-allowed opacity-30",
        )}
      >
        <ChevronRight className="h-5 w-5" strokeWidth={1.5} />
      </button>

      {!fs && (
        <button
          onClick={() => setFs(true)}
          aria-label="Vollbild öffnen"
          className="ml-2 hidden h-12 w-12 place-items-center rounded-full border border-white/25 text-white transition-all hover:border-white/70 hover:bg-white/10 sm:grid"
        >
          <Maximize2 className="h-5 w-5" strokeWidth={1.5} />
        </button>
      )}
    </div>
  )

  const Thumbs = (
    <div className={cn("mt-9 w-full max-w-3xl", fs && "hidden")}>
      <div className="hide-scrollbar flex snap-x justify-start gap-2 overflow-x-auto pb-2 md:justify-center">
        {menuPages.map((p, i) => {
          const activeThumb = isWide ? Math.floor(i / 2) === spread : i === page
          return (
            <button
              key={p.src}
              onClick={() => {
                if (isWide) {
                  setTurn(null)
                  setSpread(Math.floor(i / 2))
                } else {
                  goPage(i)
                }
              }}
              aria-label={`Zu Seite ${i + 1}`}
              aria-current={activeThumb}
              className={cn(
                "relative aspect-[74/110] w-11 shrink-0 snap-start overflow-hidden rounded-[2px] border transition-all",
                activeThumb
                  ? "border-bronze ring-1 ring-bronze"
                  : "border-white/15 opacity-50 hover:opacity-100",
              )}
            >
              <Image src={p.src} alt="" fill sizes="44px" className="object-cover" loading="lazy" />
            </button>
          )
        })}
      </div>
    </div>
  )

  const Stage = (
    <div className="flex flex-col items-center">
      {isWide ? DesktopBook : MobileBook}
      {Controls}
      {Thumbs}
    </div>
  )

  return (
    <section id="speisekarte" className="relative overflow-hidden bg-espresso py-24 text-white md:py-32">
      <div className="pointer-events-none absolute inset-0 opacity-80 cinematic-vignette" />
      <div className="relative mx-auto max-w-[1600px] px-6 md:px-10">
        <div className="mx-auto mb-14 max-w-2xl text-center md:mb-16">
          <SplitWords text="Speisekarte" className="eyebrow text-bronze" />
          <h2 className="mt-6 text-balance font-serif text-4xl font-light leading-[1.05] md:text-6xl">
            <StaggerText delay={0.1} lines={["Blättern Sie durch unsere Karte"]} />
          </h2>
          <Reveal delay={0.2}>
            <p className="mx-auto mt-6 max-w-xl text-pretty text-base leading-relaxed text-white/70 md:text-lg">
              Wie in einem echten Menü – Seite für Seite. Alle Gerichte, Getränke,
              Preise und Allergene, aufgeschlagen als aufklappbares Buch.
            </p>
          </Reveal>
        </div>

        {Stage}
      </div>

      {/* Fullscreen viewer */}
      <AnimatePresence>
        {fs && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[70] flex flex-col bg-espresso/98 backdrop-blur-sm"
          >
            <div className="flex items-center justify-between px-5 py-4 md:px-8">
              <span className="eyebrow text-bronze">PANORAMA · Speisekarte</span>
              <button
                onClick={() => setFs(false)}
                aria-label="Vollbild schließen"
                className="grid h-11 w-11 place-items-center rounded-full text-white transition-colors hover:bg-white/10"
              >
                <X className="h-6 w-6" strokeWidth={1.5} />
              </button>
            </div>
            <div className="flex flex-1 flex-col items-center justify-center px-4 pb-8">
              {isWide ? DesktopBook : MobileBook}
              {Controls}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}

/* ------------------------------- Sub-parts -------------------------------- */

function BookPage({ side, src }: { side: "left" | "right"; src: string | null }) {
  if (!src) {
    return (
      <div
        className={cn(
          "absolute inset-y-0 w-1/2 bg-[#f3efe7]",
          side === "left" ? "left-0 rounded-l-[3px]" : "right-0 rounded-r-[3px]",
        )}
      />
    )
  }
  return (
    <div
      className={cn(
        "absolute inset-y-0 w-1/2 overflow-hidden bg-white",
        side === "left"
          ? "left-0 rounded-l-[3px] shadow-[inset_-18px_0_28px_-24px_rgba(0,0,0,0.55)]"
          : "right-0 rounded-r-[3px] shadow-[inset_18px_0_28px_-24px_rgba(0,0,0,0.55)]",
      )}
    >
      <Image src={src} alt="" fill sizes="(max-width: 1024px) 50vw, 520px" className="object-contain" />
    </div>
  )
}

function TurningLeaf({
  dir,
  front,
  back,
  onDone,
}: {
  dir: 1 | -1
  front: string | null
  back: string | null
  onDone: () => void
}) {
  // Forward: leaf sits on the RIGHT half, hinged at the spine (its left edge).
  // Backward: leaf sits on the LEFT half, hinged at the spine (its right edge).
  const onRight = dir === 1
  return (
    <motion.div
      className={cn("absolute inset-y-0 z-30 w-1/2", onRight ? "left-1/2" : "left-0")}
      style={{
        transformStyle: "preserve-3d",
        transformOrigin: onRight ? "left center" : "right center",
      }}
      initial={{ rotateY: 0 }}
      animate={{ rotateY: onRight ? -180 : 180 }}
      transition={{ duration: 0.72, ease: [0.36, 0, 0.2, 1] }}
      onAnimationComplete={onDone}
    >
      {/* Front face */}
      <div
        className={cn(
          "absolute inset-0 overflow-hidden bg-white [backface-visibility:hidden]",
          onRight ? "rounded-r-[3px]" : "rounded-l-[3px]",
        )}
      >
        {front && <Image src={front} alt="" fill sizes="520px" className="object-contain" />}
        <div
          className={cn(
            "pointer-events-none absolute inset-0",
            onRight
              ? "bg-gradient-to-l from-black/0 to-black/10"
              : "bg-gradient-to-r from-black/0 to-black/10",
          )}
        />
      </div>
      {/* Back face */}
      <div
        className={cn(
          "absolute inset-0 overflow-hidden bg-white [backface-visibility:hidden]",
          onRight ? "rounded-l-[3px]" : "rounded-r-[3px]",
        )}
        style={{ transform: "rotateY(180deg)" }}
      >
        {back && <Image src={back} alt="" fill sizes="520px" className="object-contain" />}
      </div>
      {/* Moving page shadow */}
      <motion.div
        className="pointer-events-none absolute inset-0 bg-black"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 0.28, 0] }}
        transition={{ duration: 0.72, ease: "easeInOut" }}
      />
    </motion.div>
  )
}
