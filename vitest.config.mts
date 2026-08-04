import react from "@vitejs/plugin-react";
import { defineConfig } from "vitest/config";

/**
 * .mts rather than .ts: Vite's native config loader treats a bare .ts file in a
 * CommonJS package as CJS and warns about the ESM syntax. The explicit module
 * extension settles it without adding "type": "module" to package.json, which
 * Next does not want.
 */
export default defineConfig({
  plugins: [react()],
  resolve: {
    // Native replacement for vite-tsconfig-paths — resolves the "@/*" alias
    // straight from tsconfig.json.
    tsconfigPaths: true,
  },
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: ["./vitest.setup.ts"],
    include: ["src/**/*.{test,spec}.{ts,tsx}"],
    css: false,
    coverage: {
      provider: "v8",
      include: ["src/**/*.{ts,tsx}"],
      exclude: ["src/**/*.{test,spec}.{ts,tsx}", "src/**/index.ts", "src/app/**"],
    },
  },
});
