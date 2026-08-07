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
  integrations: [react(), sitemap()],
  image: {
    responsiveStyles: true,
  },
  vite: {
    plugins: [tailwindcss()],
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
