import { cn } from "@/lib/utils"

/**
 * Typographic PANORAMA wordmark that inherits `currentColor`,
 * so it adapts cleanly to light and dark cinematic sections.
 * The distinctive circular mark of the brand replaces the "O".
 */
export function Logo({
  className,
  showTagline = true,
}: {
  className?: string
  showTagline?: boolean
}) {
  return (
    <span className={cn("inline-flex flex-col items-start leading-none text-current", className)}>
      {showTagline && (
        <span className="eyebrow text-[0.5em] opacity-80 mb-[0.35em] ml-[0.15em]">
          Lounge &amp; Restaurant
        </span>
      )}
      <span className="font-serif font-medium tracking-[0.22em] text-[1em] flex items-center">
        PAN
        <span
          aria-hidden="true"
          className="inline-block rounded-full border-[0.06em] border-current align-middle mx-[0.04em]"
          style={{ width: "0.62em", height: "0.62em" }}
        />
        RAMA
      </span>
    </span>
  )
}
