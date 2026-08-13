import type { Metadata } from "next"
import { Navbar } from "@/components/site/navbar"
import { MenuHero } from "@/components/site/menu-hero"
import { FoodShowcase } from "@/components/site/food-showcase"
import { MenuBook } from "@/components/site/menu-book"
import { Footer } from "@/components/site/footer"
import { MobileBar } from "@/components/site/mobile-bar"
import { business } from "@/lib/site-data"

export const metadata: Metadata = {
  title: "Speisekarte",
  description:
    "Die Speisekarte des PANORAMA – authentische kroatische Küche, mediterrane Spezialitäten, Pizza, Pasta, frischer Fisch sowie eine große Auswahl an Getränken, Bieren, Weinen und Cocktails.",
  alternates: { canonical: "/menu" },
  openGraph: {
    title: `Speisekarte · ${business.name}`,
    description:
      "Blättern Sie durch unsere aufklappbare Speisekarte – kroatische Küche, mediterrane Spezialitäten und mehr.",
  },
}

export default function MenuPage() {
  return (
    <>
      <Navbar />
      <main>
        <MenuHero />
        <FoodShowcase />
        <MenuBook />
      </main>
      <Footer />
      <MobileBar />
    </>
  )
}
