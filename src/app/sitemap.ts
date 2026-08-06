import type { MetadataRoute } from "next";
import { defaultLocale, localeMeta, locales } from "@/lib/config/i18n";
import { SITE_URL } from "@/lib/config/site";
import { getCaseStudies } from "@/lib/content/case-studies";

/**
 * Generated from the routes that actually exist, so a new case study appears
 * in the sitemap without anyone remembering to add it.
 *
 * Every route is emitted once per locale, and each entry carries `alternates`
 * naming all of them. Listing the Kurdish URLs without that cross-reference
 * would let a crawler read them as duplicate content rather than as
 * translations of one page — which is the whole reason hreflang exists.
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  const routes = [
    { path: "", changeFrequency: "monthly", priority: 1 },
    { path: "/work", changeFrequency: "monthly", priority: 0.9 },
    { path: "/about", changeFrequency: "yearly", priority: 0.8 },
    { path: "/contact", changeFrequency: "yearly", priority: 0.7 },
  ] as const satisfies readonly {
    path: string;
    changeFrequency: NonNullable<MetadataRoute.Sitemap[number]["changeFrequency"]>;
    priority: number;
  }[];

  const studies = await getCaseStudies();
  const allRoutes = [
    ...routes,
    ...studies.map((study) => ({
      path: `/work/${study.slug}`,
      changeFrequency: "yearly" as const,
      priority: 0.8,
      lastModified: new Date(study.published),
    })),
  ];

  /** hreflang keys use the `ckb` form, matching the `lang` attribute. */
  const alternatesFor = (path: string) => ({
    languages: Object.fromEntries([
      ...locales.map((locale) => [localeMeta[locale].htmlLang, `${SITE_URL}/${locale}${path}`]),
      ["x-default", `${SITE_URL}/${defaultLocale}${path}`],
    ]),
  });

  return allRoutes.flatMap((route) =>
    locales.map((locale) => ({
      url: `${SITE_URL}/${locale}${route.path}`,
      lastModified: "lastModified" in route ? route.lastModified : now,
      changeFrequency: route.changeFrequency,
      priority: route.priority,
      alternates: alternatesFor(route.path),
    })),
  );
}
