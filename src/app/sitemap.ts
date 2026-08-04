import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/config/site";
import { getCaseStudies } from "@/lib/content/case-studies";

/**
 * Generated from the routes that actually exist, so a new case study appears
 * in the sitemap without anyone remembering to add it.
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${SITE_URL}/`, lastModified: now, changeFrequency: "monthly", priority: 1 },
    { url: `${SITE_URL}/work`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${SITE_URL}/about`, lastModified: now, changeFrequency: "yearly", priority: 0.8 },
    { url: `${SITE_URL}/contact`, lastModified: now, changeFrequency: "yearly", priority: 0.7 },
  ];

  const studies = await getCaseStudies();
  const caseStudyRoutes: MetadataRoute.Sitemap = studies.map((study) => ({
    url: `${SITE_URL}/work/${study.slug}`,
    lastModified: new Date(study.published),
    changeFrequency: "yearly",
    priority: 0.8,
  }));

  return [...staticRoutes, ...caseStudyRoutes];
}
