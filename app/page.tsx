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
