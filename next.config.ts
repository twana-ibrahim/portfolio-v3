import bundleAnalyzer from "@next/bundle-analyzer";
import type { NextConfig } from "next";

/**
 * Headers applied to every route. Kept here rather than in middleware so they
 * are emitted statically and cost nothing at request time.
 */
const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), browsing-topics=()",
  },
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
] as const;

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,

  // Compile-time checking of every <Link href> and router.push in the app.
  typedRoutes: true,

  images: {
    formats: ["image/avif", "image/webp"],
    // Portfolio screenshots are wide; these are the widths we actually render at.
    deviceSizes: [640, 828, 1080, 1200, 1920, 2048],
  },

  experimental: {
    optimizePackageImports: ["motion", "lucide-react"],

    /**
     * Required by `app/global-not-found.tsx`. The root layout sits behind the
     * `[lang]` root param, so there is no plain root layout for a `not-found`
     * to compose itself inside — Next's docs name this as one of the two cases
     * the flag exists for. See the comment in that file for what it fixes.
     */
    globalNotFound: true,
  },

  async headers() {
    return [{ source: "/:path*", headers: [...securityHeaders] }];
  },
};

export default bundleAnalyzer({ enabled: process.env.ANALYZE === "true" })(nextConfig);
