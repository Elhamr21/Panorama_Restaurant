"use client"

import { motion, useReducedMotion } from "motion/react"
import type { ReactNode } from "react"
import { cn } from "@/lib/utils"

export const ease = [0.22, 1, 0.36, 1] as const

type RevealProps = {
  children: ReactNode
  className?: string
  delay?: number
  y?: number
  scale?: number
  once?: boolean
  as?: "div" | "section" | "span" | "li" | "figure" | "article"
}

/**
 * Fade + rise (+ optional scale-in) entrance, triggered on scroll-into-view.
 *
 * `initial` and `whileInView` are always set to the same hidden/shown pair —
 * only the transition speed changes for reduced motion. Framer Motion only
 * reads `initial` at mount and `useReducedMotion()` resolves from `null` to
 * its real value a tick later, so gating `initial`/`whileInView` themselves
 * on that value (as an earlier version of this file did) could leave content
 * permanently stuck at opacity:0 for anyone whose browser prefers reduced
 * motion — the reveal trigger would vanish before it ever fired.
 */
export function Reveal({ children, className, delay = 0, y = 24, scale, once = true, as = "div" }: RevealProps) {
  const reduce = useReducedMotion()
  const MotionTag = motion[as] as typeof motion.div

  return (
    <MotionTag
      className={className}
      initial={{ opacity: 0, y, ...(scale ? { scale } : {}) }}
      whileInView={{ opacity: 1, y: 0, ...(scale ? { scale: 1 } : {}) }}
      viewport={{ once, margin: "-12% 0px -12% 0px" }}
      transition={{ duration: reduce ? 0 : 0.9, delay: reduce ? 0 : delay, ease }}
    >
      {children}
    </MotionTag>
  )
}

/**
 * Staggered heading reveal — each line rises out of a clipped mask.
 *
 * Triggered on MOUNT (`animate`), not on scroll-into-view. An earlier version
 * used `whileInView`, which depends on an IntersectionObserver ever reporting
 * the element as visible — some rendering/preview setups (full-page capture
 * tools, very fast viewers, etc.) never fire that reliably, which left
 * headings stuck at their hidden `translateY(110%)` starting position. Mount
 * animation has no such dependency: it always runs once the component exists.
 */
export function StaggerText({
  lines,
  className,
  lineClassName,
  delay = 0,
  stagger = 0.1,
}: {
  lines: ReactNode[]
  className?: string
  lineClassName?: string
  delay?: number
  stagger?: number
}) {
  const reduce = useReducedMotion()
  return (
    <span className={className}>
      {lines.map((line, i) => (
        <span key={i} className="block overflow-hidden py-[0.06em]">
          <motion.span
            className={lineClassName ?? "block"}
            initial={{ y: "110%" }}
            animate={{ y: "0%" }}
            transition={{ duration: reduce ? 0 : 0.9, delay: reduce ? 0 : delay + i * stagger, ease }}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </span>
  )
}

/** Word-by-word cascade — for eyebrows, short labels and emphasis phrases. Also mount-triggered, see StaggerText. */
export function SplitWords({
  text,
  className,
  wordClassName,
  delay = 0,
  stagger = 0.045,
}: {
  text: string
  className?: string
  wordClassName?: string
  delay?: number
  stagger?: number
  once?: boolean
}) {
  const reduce = useReducedMotion()
  const words = text.split(" ")
  return (
    <span className={className}>
      {words.map((word, i) => (
        <span key={i} className="inline-block overflow-hidden pb-[0.15em] align-bottom">
          <motion.span
            className={cn("inline-block", wordClassName)}
            initial={{ y: "100%", opacity: 0 }}
            animate={{ y: "0%", opacity: 1 }}
            transition={{ duration: reduce ? 0 : 0.6, delay: reduce ? 0 : delay + i * stagger, ease }}
          >
            {word}
            {i < words.length - 1 ? " " : ""}
          </motion.span>
        </span>
      ))}
    </span>
  )
}
