"use client"

import { AnimatePresence, motion } from "motion/react"
import Link from "next/link"
import { useEffect, useState } from "react"
import { Menu, X } from "lucide-react"
import { cn } from "@/lib/utils"
import { nav } from "@/lib/site-data"
import { Logo } from "./logo"

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState<string>("")

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  // Active section indicator (only for on-page hash anchors)
  useEffect(() => {
    const ids = nav
      .map((n) => (n.href.includes("#") ? n.href.split("#")[1] : null))
      .filter((id): id is string => Boolean(id))
    const sections = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el))
    if (!sections.length) return
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id)
        })
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 },
    )
    sections.forEach((s) => obs.observe(s))
    return () => obs.disconnect()
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : ""
    return () => {
      document.body.style.overflow = ""
    }
  }, [open])

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-all duration-500",
          scrolled
            ? "bg-espresso/80 backdrop-blur-xl border-b border-white/10 py-3"
            : "bg-transparent py-5",
        )}
      >
        <nav className="mx-auto flex max-w-[1600px] items-center justify-between px-5 md:px-10">
          <Link
            href="/"
            aria-label="PANORAMA – zur Startseite"
            className="text-white transition-opacity hover:opacity-80"
          >
            <Logo className="text-[15px] md:text-[17px]" showTagline={!scrolled} />
          </Link>

          {/* Desktop nav */}
          <div className="hidden items-center gap-1 lg:flex">
            {nav.map((item) => {
              const isActive = item.href.includes("#") && active === item.href.split("#")[1]
              return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "group relative px-4 py-2 text-sm tracking-wide text-white/75 transition-colors hover:text-white",
                  isActive && "text-white",
                )}
              >
                {item.label}
                {isActive ? (
                  <motion.span
                    layoutId="nav-active"
                    className="absolute inset-x-4 -bottom-0.5 h-px bg-bronze"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                ) : (
                  <span className="absolute inset-x-4 -bottom-0.5 h-px origin-center scale-x-0 bg-white/50 transition-transform duration-300 ease-out group-hover:scale-x-100" />
                )}
              </Link>
              )
            })}
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/menu"
              className="hidden rounded-full border border-white/35 px-6 py-2.5 text-sm font-medium text-white transition-all hover:border-white hover:bg-white/10 sm:inline-flex"
            >
              Speisekarte
            </Link>
            <button
              onClick={() => setOpen(true)}
              aria-label="Menü öffnen"
              className="grid h-11 w-11 place-items-center rounded-full text-white transition-colors hover:bg-white/10 lg:hidden"
            >
              <Menu className="h-6 w-6" strokeWidth={1.5} />
            </button>
          </div>
        </nav>
      </motion.header>

      {/* Mobile fullscreen menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            className="fixed inset-0 z-[60] bg-espresso text-white lg:hidden"
          >
            <div className="flex items-center justify-between px-5 py-5">
              <Logo className="text-[17px]" />
              <button
                onClick={() => setOpen(false)}
                aria-label="Menü schließen"
                className="grid h-11 w-11 place-items-center rounded-full transition-colors hover:bg-white/10"
              >
                <X className="h-6 w-6" strokeWidth={1.5} />
              </button>
            </div>
            <nav className="flex flex-col px-6 pt-6">
              {nav.map((item, i) => (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + i * 0.06, ease: [0.22, 1, 0.36, 1] }}
                >
                  <Link
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="block border-b border-white/10 py-5 font-serif text-3xl tracking-wide text-white/90 transition-colors hover:text-bronze"
                  >
                    {item.label}
                  </Link>
                </motion.div>
              ))}
            </nav>
            <div className="px-6 pt-8">
              <Link
                href="/menu"
                onClick={() => setOpen(false)}
                className="flex w-full items-center justify-center rounded-full bg-primary px-6 py-4 text-base font-medium text-primary-foreground"
              >
                Speisekarte entdecken
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
