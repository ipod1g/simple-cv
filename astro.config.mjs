import path from "node:path";
import { fileURLToPath } from "node:url";
import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  site: "https://cvbono.vercel.app",
  output: "static",
  // The toolbar's X-Ray app re-measures every hydrated island on each scroll
  // frame, which makes local motion substantially rougher than production.
  devToolbar: { enabled: false },
  integrations: [react(), sitemap()],
  image: {
    responsiveStyles: true,
  },
  vite: {
    plugins: [
      tailwindcss(),
      {
        name: "separate-vite-caches-by-mode",
        // `astro check` syncs in production mode. Keep its optimized React
        // runtime separate from the one used by a running dev server.
        config: (_config, { mode }) => ({
          cacheDir: path.resolve(__dirname, "node_modules/.vite", mode),
        }),
      },
    ],
    build: {
      minify: "esbuild",
    },
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
  },
});
