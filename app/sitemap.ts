import type { MetadataRoute } from "next"
import { business } from "@/lib/site-data"

// Indexable pages only (legal pages are noindex). lastModified omitted: no reliable date is tracked.
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: `${business.website}/`, changeFrequency: "monthly", priority: 1 },
    { url: `${business.website}/menu`, changeFrequency: "monthly", priority: 0.9 },
  ]
}
