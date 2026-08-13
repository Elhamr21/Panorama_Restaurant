import { Star } from "lucide-react"
import { business, reviews } from "@/lib/site-data"
import { Reveal, SplitWords } from "./reveal"

export function ReviewsSection() {
  return (
    <section className="relative overflow-hidden bg-foreground py-24 text-background md:py-32">
      <div className="mx-auto max-w-6xl px-6 md:px-10">
        <Reveal className="flex flex-col items-center text-center">
          <div className="flex items-center gap-1" aria-hidden="true">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} className="size-5 fill-primary text-primary" />
            ))}
          </div>
          <p className="mt-4 font-serif text-3xl font-light md:text-4xl">
            {business.rating.toString().replace(".", ",")} von 5
          </p>
          <SplitWords
            text={`Aus ${business.reviews} Bewertungen`}
            delay={0.1}
            className="mt-1 eyebrow text-background/60"
          />
        </Reveal>

        <div className="mt-16 grid gap-8 md:grid-cols-3">
          {reviews.map((review, i) => (
            <Reveal
              key={review.author}
              delay={i * 0.1}
              className="relative flex flex-col overflow-hidden rounded-lg border border-background/15 bg-background/[0.04] p-8 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-background/25 hover:bg-background/[0.07]"
            >
              <span
                aria-hidden="true"
                className="pointer-events-none absolute -top-6 left-5 select-none font-serif text-[7rem] leading-none text-background/[0.06]"
              >
                &rdquo;
              </span>
              <div className="relative flex gap-1" aria-hidden="true">
                {Array.from({ length: 5 }).map((_, s) => (
                  <Star key={s} className="size-4 fill-primary text-primary" />
                ))}
              </div>
              <blockquote className="relative mt-5 flex-1 text-pretty leading-relaxed text-background/85">
                &ldquo;{review.quote}&rdquo;
              </blockquote>
              <footer className="relative mt-6 border-t border-background/15 pt-4">
                <p className="font-serif text-lg">{review.author}</p>
                <p className="mt-0.5 eyebrow text-background/50">{review.context}</p>
              </footer>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
