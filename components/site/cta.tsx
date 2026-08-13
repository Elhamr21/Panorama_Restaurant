import Link from "next/link"
import type { ReactNode } from "react"
import { ArrowRight } from "lucide-react"
import { cn } from "@/lib/utils"

type Variant = "solid" | "outline" | "outlineLight" | "ghostLight"

const base =
  "group inline-flex items-center justify-center gap-2.5 rounded-full px-7 py-3.5 text-sm font-medium tracking-wide transition-all duration-300 min-h-[48px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent focus-visible:ring-current active:scale-[0.98] cursor-pointer"

const variants: Record<Variant, string> = {
  solid:
    "bg-primary text-primary-foreground hover:bg-primary/90 shadow-[0_1px_0_rgba(255,255,255,0.15)_inset,0_10px_30px_-12px_rgba(0,0,0,0.5)] hover:-translate-y-0.5",
  outline:
    "border border-foreground/25 text-foreground hover:border-foreground/60 hover:bg-foreground/[0.04] hover:-translate-y-0.5",
  outlineLight:
    "border border-white/35 text-white hover:border-white hover:bg-white/10 hover:-translate-y-0.5",
  ghostLight: "text-white/90 hover:text-white underline underline-offset-8 decoration-white/40 hover:decoration-white",
}

type CtaProps = {
  href?: string
  variant?: Variant
  external?: boolean
  className?: string
  children: ReactNode
  onClick?: () => void
  arrow?: boolean
  "aria-label"?: string
}

const Arrow = () => (
  <ArrowRight
    className="size-4 shrink-0 transition-transform duration-300 ease-out group-hover:translate-x-1"
    strokeWidth={1.75}
  />
)

export function CtaButton({
  href,
  variant = "solid",
  external,
  className,
  children,
  onClick,
  arrow,
  ...rest
}: CtaProps) {
  const classes = cn(base, variants[variant], className)
  const content = (
    <>
      {children}
      {arrow && <Arrow />}
    </>
  )

  if (href) {
    if (external || href.startsWith("http") || href.startsWith("tel:") || href.startsWith("mailto:")) {
      return (
        <a
          href={href}
          className={classes}
          {...(external || href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
          {...rest}
        >
          {content}
        </a>
      )
    }
    return (
      <Link href={href} className={classes} {...rest}>
        {content}
      </Link>
    )
  }

  return (
    <button type="button" className={classes} onClick={onClick} {...rest}>
      {content}
    </button>
  )
}

export const CtaLink = CtaButton
