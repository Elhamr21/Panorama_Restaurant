import { Analytics } from "@vercel/analytics/next"
import type { Metadata, Viewport } from "next"
import { Cormorant_Garamond, Inter } from "next/font/google"
import { business } from "@/lib/site-data"
import { CookieConsent } from "@/components/site/cookie-consent"
import "./globals.css"

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-cormorant",
  display: "swap",
})

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
})

const description =
  "PANORAMA Lounge & Restaurant am Golfclub Rehburg-Loccum. Authentische kroatische Küche, warme Gastfreundschaft und ein einzigartiger Panoramablick über den Golfplatz. Terrasse, Take Away und Lieferung."

export const metadata: Metadata = {
  metadataBase: new URL(business.website),
  title: {
    default: "PANORAMA Lounge & Restaurant | Kroatische Küche in Rehburg-Loccum",
    template: "%s | PANORAMA Lounge & Restaurant",
  },
  description,
  applicationName: "PANORAMA Lounge & Restaurant",
  keywords: [
    "PANORAMA",
    "Restaurant Rehburg-Loccum",
    "Kroatische Küche",
    "Golfclub Rehburg-Loccum",
    "Lounge",
    "Terrasse",
    "Kroatisches Restaurant Niedersachsen",
  ],
  authors: [{ name: "PANORAMA Lounge & Restaurant" }],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "de_DE",
    url: business.website,
    siteName: "PANORAMA Lounge & Restaurant",
    title: "PANORAMA Lounge & Restaurant | Kroatische Küche in Rehburg-Loccum",
    description,
    images: [{ url: "/ambient/ambient3.png", width: 1200, height: 1200, alt: "PANORAMA Lounge & Restaurant" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "PANORAMA Lounge & Restaurant",
    description,
    images: ["/ambient/ambient3.png"],
  },
  generator: "v0.app",
}

export const viewport: Viewport = {
  themeColor: "#1a1109",
  colorScheme: "dark",
}

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Restaurant",
  name: business.name,
  image: [`${business.website}/ambient/ambient3.png`, `${business.website}/food/food6.png`],
  servesCuisine: "Croatian",
  priceRange: "€€",
  telephone: business.phone,
  email: business.email,
  url: business.website,
  address: {
    "@type": "PostalAddress",
    streetAddress: business.street,
    postalCode: business.postal,
    addressLocality: business.city,
    addressCountry: "DE",
  },
  geo: { "@type": "GeoCoordinates", latitude: 52.4708, longitude: 9.2264 },
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: business.rating,
    reviewCount: business.reviews,
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
      opens: "10:30",
      closes: "22:00",
    },
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="de" className={`dark ${cormorant.variable} ${inter.variable} bg-background`}>
      <body className="antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
        <CookieConsent />
        {process.env.NODE_ENV === "production" && <Analytics />}
      </body>
    </html>
  )
}
