export const business = {
  name: "PANORAMA Lounge & Restaurant",
  shortName: "PANORAMA",
  tagline: "Lounge & Restaurant",
  cuisine: "Kroatische Küche",
  street: "Hormannshausen 2a",
  postal: "31547",
  city: "Rehburg-Loccum",
  country: "Deutschland",
  locatedAt: "Golfclub Rehburg-Loccum",
  phone: "+49 174 8189415",
  phoneHref: "tel:+491748189415",
  email: "info@panorelo.de",
  emailHref: "mailto:info@panorelo.de",
  website: "https://panorelo.de",
  priceRange: "€20–30",
  rating: 4.7,
  reviews: 107,
  hours: "Dienstag – Sonntag · 10:30 – ca. 22:00 Uhr",
  closed: "Montag · Ruhetag",
  mapsQuery: "PANORAMA Lounge & Restaurant, Hormannshausen 2a, 31547 Rehburg-Loccum",
} as const

export const nav = [
  { label: "Über uns", href: "/#willkommen" },
  { label: "Speisekarte", href: "/menu" },
  { label: "Galerie", href: "/#galerie" },
  { label: "Gastgeber", href: "/#gastgeber" },
  { label: "Besuch planen", href: "/#besuch" },
] as const

export const menuPages = Array.from({ length: 14 }, (_, i) => ({
  src: `/menu/men${i + 1}.png`,
  alt: `PANORAMA Speisekarte – Seite ${i + 1} von 14`,
}))

export const foodPhotos = [
  {
    src: "/food/food7.png",
    alt: "Gegrillte Dorade mit Pesto-Kartoffeln, Tomaten und Zitrone",
    name: "Gegrillte Dorade",
    desc: "Frisch vom Grill, mit Pesto-Kartoffeln, Tomaten & Zitrone.",
  },
  {
    src: "/food/food6.png",
    alt: "Meeresfrüchteplatte mit Fisch, Garnelen und Lachs",
    name: "Meeresfrüchteplatte",
    desc: "Fisch, Garnelen & Lachs vom Grill – für echte Adria-Genießer.",
  },
  {
    src: "/food/food8.png",
    alt: "Caprese-Salat mit Mozzarella, Kirschtomaten und Basilikum",
    name: "Caprese",
    desc: "Cremiger Mozzarella, Kirschtomaten & frisches Basilikum.",
  },
  {
    src: "/food/food1.png",
    alt: "Dünne Pizza mit frischem Basilikum und Tomaten",
    name: "Pizza aus dem Ofen",
    desc: "Dünner Boden, San-Marzano-Tomaten & frisches Basilikum.",
  },
  {
    src: "/food/food2.png",
    alt: "Gegrillter Calzone mit Tomatensugo und grünen Oliven",
    name: "Calzone",
    desc: "Gefüllt & gegrillt, mit Tomatensugo und grünen Oliven.",
  },
  {
    src: "/food/food3.png",
    alt: "Fleischgericht in Erdbeer-Rahmsauce mit Bratkartoffeln",
    name: "Fleisch in Rahmsauce",
    desc: "Zartes Fleisch in Erdbeer-Rahmsauce mit Bratkartoffeln.",
  },
  {
    src: "/food/food5.png",
    alt: "Burger mit schwarzem Brötchen und knusprigen Pommes",
    name: "PANORAMA Burger",
    desc: "Saftiges Patty im schwarzen Brötchen, mit knusprigen Pommes.",
  },
  {
    src: "/food/food4.png",
    alt: "Hausgemachte Erdbeertorte mit frischen Erdbeeren",
    name: "Erdbeertorte",
    desc: "Hausgemacht, luftig-cremig und mit frischen Erdbeeren.",
  },
]

// Strongest single image for the signature moment
export const signatureFood = { src: "/food/food6.png", alt: "Kroatische Meeresfrüchteplatte, kunstvoll angerichtet" }

export const ambientPhotos = [
  { src: "/ambient/ambient3.png", alt: "Sonnenterrasse mit Blick über den Golfplatz Rehburg-Loccum", span: "wide" },
  { src: "/ambient/ambient4.png", alt: "Eleganter Speisesaal mit Kristall-Kronleuchter", span: "tall" },
  { src: "/ambient/ambient1.png", alt: "Restaurantsaal mit roten Tischen und Bar", span: "normal" },
  { src: "/ambient/ambient8.png", alt: "Beleuchtete Bar mit Spirituosen und Natursteinwand", span: "normal" },
  { src: "/ambient/ambient7.png", alt: "Gemütliche Lounge-Ecke mit Ledersofa", span: "tall" },
  { src: "/ambient/ambient5.png", alt: "Belebte Lounge mit Gästen und Krombacher Bier", span: "wide" },
  { src: "/ambient/ambient2.png", alt: "Kaffee und Kerze an einem Loungetisch", span: "normal" },
  { src: "/ambient/ambient6.png", alt: "Gedeckter Tisch mit Cappuccino, Rose und Kerze", span: "normal" },
] as const

export const teamPhotos = [
  { src: "/team/staf3.png", alt: "Das Team des PANORAMA Lounge & Restaurant" },
  { src: "/team/staf1.png", alt: "Blick in die PANORAMA Küche" },
  { src: "/team/staf2.png", alt: "PANORAMA Mitarbeiterin im Poloshirt mit Logo" },
]

export const amenities = [
  { title: "Terrasse", desc: "Panoramablick über den Golfplatz" },
  { title: "Barrierefrei", desc: "Ebenerdiger, bequemer Zugang" },
  { title: "Feiern & Events", desc: "Private Veranstaltungen & Feiern" },
  { title: "Take Away", desc: "Zum Mitnehmen vorbestellen" },
  { title: "Lieferung", desc: "Bequem nach Hause geliefert" },
  { title: "WLAN", desc: "Kostenfreies WLAN für Gäste" },
]

export const dietary = [
  "Vegetarische Gerichte",
  "Vegane Gerichte",
  "Glutenfreie Optionen",
  "Laktosefreie Optionen",
]

export const reviews = [
  {
    quote:
      "Wunderbares Essen mit Blick über den Golfplatz. Die kroatische Küche ist ein echter Geheimtipp und das Team überaus herzlich.",
    author: "Sabine K.",
    context: "Google Bewertung",
  },
  {
    quote:
      "Die Terrasse bei Sonnenuntergang ist einfach traumhaft. Frische Meeresfrüchte, freundlicher Service &ndash; wir kommen immer wieder gerne.",
    author: "Thomas B.",
    context: "Stammgast",
  },
  {
    quote:
      "Gemütliche Lounge-Atmosphäre und eine Küche, die von Herzen kommt. Perfekt für einen entspannten Abend zu zweit.",
    author: "Familie Wagner",
    context: "Google Bewertung",
  },
]
