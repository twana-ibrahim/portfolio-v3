import { ImageResponse } from "next/og";
import { profile } from "@/content/profile";
import { defaultLocale, locales } from "@/lib/config/i18n";
import { siteConfig } from "@/lib/config/site";
import { type Localized, pick } from "@/lib/i18n/localized";

/**
 * English in both locales, on purpose. Satori has no HarfBuzz and does no
 * complex shaping, so Sorani would rasterise as disconnected isolated forms —
 * unreadable, not merely degraded. `alt` is a static export besides, so it
 * cannot see the locale anyway. Revisit if Satori gains shaping.
 */
const en = <T,>(value: Localized<T>) => pick(value, defaultLocale);

export const alt = `${en(profile.name)} — ${en(profile.role)}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** Without this the `[lang]` segment is unresolved and Next renders on demand
 *  — a Google Fonts fetch per scrape, for an image that never changes. */
export function generateStaticParams() {
  return locales.map((locale) => ({ lang: locale }));
}

/** The site's first impression in Slack and LinkedIn far more often than the
 *  homepage is, so it gets the same editorial treatment. */

/**
 * Satori needs real font bytes, and only the glyphs rendered are requested.
 *
 * The User-Agent is deliberately absent: send a modern one and Google serves
 * WOFF2, which Satori cannot parse ("Unsupported OpenType signature wOF2").
 * Returns null if the network is down at build — a plainer card beats a
 * failed build.
 */
async function loadGeist(text: string, weight: number): Promise<ArrayBuffer | null> {
  try {
    const cssUrl = `https://fonts.googleapis.com/css2?family=Geist:wght@${weight}&text=${encodeURIComponent(text)}`;
    const css = await fetch(cssUrl).then((response) => response.text());

    const fontUrl = css.match(/src:\s*url\((.+?)\)\s*format\('(?:truetype|opentype)'\)/)?.[1];
    if (!fontUrl) return null;

    return await fetch(fontUrl).then((response) => response.arrayBuffer());
  } catch {
    return null;
  }
}

export default async function OpengraphImage() {
  const statement = en(profile.headline);
  const headline = `${statement.lead} ${statement.emphasis} ${statement.trail}`;
  const meta = `${en(profile.name)} · ${en(profile.role)} · ${en(profile.location.city)}, ${en(profile.location.country)}`;

  const [display, label] = await Promise.all([
    loadGeist(headline, 600),
    loadGeist(`${meta}${siteConfig.url}`, 500),
  ]);

  const fonts = [
    ...(display
      ? [{ name: "Geist", data: display, weight: 600 as const, style: "normal" as const }]
      : []),
    ...(label
      ? [{ name: "GeistLabel", data: label, weight: 500 as const, style: "normal" as const }]
      : []),
  ];

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        background: "#fbfaf9",
        color: "#17171a",
        padding: "72px 80px",
        fontFamily: "Geist, sans-serif",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 16,
          fontFamily: "GeistLabel, sans-serif",
          fontSize: 22,
          letterSpacing: "0.1em",
          textTransform: "uppercase",
          color: "#77776f",
        }}
      >
        <div style={{ width: 40, height: 3, background: "#c3441a" }} />
        {meta}
      </div>

      <div
        style={{
          display: "flex",
          fontSize: 88,
          lineHeight: 1.02,
          letterSpacing: "-0.04em",
          fontWeight: 600,
          maxWidth: 960,
        }}
      >
        {headline}
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-end",
          borderTop: "1px solid #e4e1dc",
          paddingTop: 28,
          fontFamily: "GeistLabel, sans-serif",
          fontSize: 22,
          letterSpacing: "0.08em",
          textTransform: "uppercase",
          color: "#77776f",
        }}
      >
        <div style={{ display: "flex" }}>{siteConfig.url.replace("https://", "")}</div>
        <div style={{ display: "flex", color: "#c3441a" }}>{en(profile.availability.label)}</div>
      </div>
    </div>,
    { ...size, ...(fonts.length > 0 ? { fonts } : {}) },
  );
}
