"use client"

import Image from "next/image"
import { AnimatePresence, motion, useReducedMotion } from "motion/react"
import { useCallback, useEffect } from "react"
import { ChevronLeft, ChevronRight, X } from "lucide-react"

type Item = { src: string; alt: string }

export function Lightbox({
  items,
  index,
  onClose,
  onIndexChange,
}: {
  items: Item[]
  index: number | null
  onClose: () => void
  onIndexChange: (i: number) => void
}) {
  const reduce = useReducedMotion()
  const open = index !== null

  const nav = useCallback(
    (delta: number) => {
      if (index === null) return
      onIndexChange((index + delta + items.length) % items.length)
    },
    [index, items.length, onIndexChange],
  )

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
      else if (e.key === "ArrowRight") nav(1)
      else if (e.key === "ArrowLeft") nav(-1)
    }
    window.addEventListener("keydown", onKey)
    document.body.style.overflow = "hidden"
    return () => {
      window.removeEventListener("keydown", onKey)
      document.body.style.overflow = ""
    }
  }, [open, onClose, nav])

  return (
    <AnimatePresence>
      {open && index !== null && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label="Bildergalerie"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[80] flex flex-col bg-espresso/97 backdrop-blur-sm"
        >
          <div className="flex items-center justify-between px-5 py-4 md:px-8">
            <span className="font-sans text-sm tracking-[0.2em] text-white/70">
              {String(index + 1).padStart(2, "0")} / {items.length}
            </span>
            <button
              onClick={onClose}
              aria-label="Galerie schließen"
              className="grid h-11 w-11 place-items-center rounded-full text-white transition-colors hover:bg-white/10"
            >
              <X className="h-6 w-6" strokeWidth={1.5} />
            </button>
          </div>

          <div className="relative flex flex-1 items-center justify-center overflow-hidden px-4 pb-6">
            <button
              onClick={() => nav(-1)}
              aria-label="Vorheriges Bild"
              className="absolute left-3 z-10 grid h-12 w-12 place-items-center rounded-full text-white transition-colors hover:bg-white/10 md:left-8"
            >
              <ChevronLeft className="h-7 w-7" strokeWidth={1.4} />
            </button>

            <AnimatePresence mode="wait" initial={false}>
              <motion.figure
                key={index}
                initial={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={reduce ? { opacity: 0 } : { opacity: 0, scale: 1.02 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="relative flex max-h-full max-w-5xl flex-col items-center"
                drag={reduce ? false : "x"}
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.2}
                onDragEnd={(_, info) => {
                  if (info.offset.x < -70) nav(1)
                  else if (info.offset.x > 70) nav(-1)
                }}
              >
                <div className="relative h-[70svh] w-[88vw] max-w-5xl">
                  <Image
                    src={items[index].src}
                    alt={items[index].alt}
                    fill
                    sizes="88vw"
                    className="select-none object-contain"
                    draggable={false}
                  />
                </div>
                <figcaption className="mt-4 max-w-2xl px-4 text-center text-sm text-white/60">
                  {items[index].alt}
                </figcaption>
              </motion.figure>
            </AnimatePresence>

            <button
              onClick={() => nav(1)}
              aria-label="Nächstes Bild"
              className="absolute right-3 z-10 grid h-12 w-12 place-items-center rounded-full text-white transition-colors hover:bg-white/10 md:right-8"
            >
              <ChevronRight className="h-7 w-7" strokeWidth={1.4} />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
