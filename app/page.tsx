import type { Metadata } from "next"
import { Navbar } from "@/components/site/navbar"
import { Hero } from "@/components/site/hero"
import { IntroSection } from "@/components/site/intro-section"
import { MenuTeaser } from "@/components/site/menu-teaser"
import { AtmosphereGallery } from "@/components/site/atmosphere-gallery"
import { HostsSection } from "@/components/site/hosts-section"
import { AmenitiesSection } from "@/components/site/amenities-section"
import { ReviewsSection } from "@/components/site/reviews-section"
import { LocationSection } from "@/components/site/location-section"
import { FinalCta } from "@/components/site/final-cta"
import { Footer } from "@/components/site/footer"
import { MobileBar } from "@/components/site/mobile-bar"

// Canonical set here (not in the root layout) so legal pages and 404s don't inherit it.
export const metadata: Metadata = {
  alternates: { canonical: "/" },
  openGraph: { url: "/" },
}

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <IntroSection />
        <MenuTeaser />
        <AtmosphereGallery />
        <HostsSection />
        <AmenitiesSection />
        <ReviewsSection />
        <LocationSection />
        <FinalCta />
      </main>
      <Footer />
      <MobileBar />
    </>
  )
}
