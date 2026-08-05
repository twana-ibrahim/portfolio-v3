import { ImageResponse } from "next/og";
import { siteConfig } from "@/lib/config/site";

export const alt = `${siteConfig.name} — ${siteConfig.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * Social card, generated at build time.
 *
 * This is the site's first impression in Slack, LinkedIn and iMessage far more
 * often than the homepage is, so it gets the same editorial treatment: paper
 * ground, hairline rules, one accent mark, type doing the work.
 */

/**
 * Pulls the real typeface rather than falling back to a generic sans.
 *
 * Satori needs actual font bytes, and the Google Fonts CSS endpoint hands back
 * a URL we can follow. Only the glyphs we render are requested.
 *
 * The User-Agent is deliberately absent: send a modern one and Google serves
 * WOFF2, which Satori cannot parse ("Unsupported OpenType signature wOF2").
 * Without it the endpoint falls back to TrueType, which it can.
 *
 * If the network is unavailable at build time this returns null and Satori
 * uses its default face — a plainer card beats a failed build.
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
  const headline = `${siteConfig.headline.lead} ${siteConfig.headline.emphasis} ${siteConfig.headline.trail}`;
  const meta = `${siteConfig.name} · ${siteConfig.role} · ${siteConfig.location.city}, ${siteConfig.location.country}`;

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
        <div style={{ display: "flex", color: "#c3441a" }}>Available for work</div>
      </div>
    </div>,
    { ...size, ...(fonts.length > 0 ? { fonts } : {}) },
  );
}
