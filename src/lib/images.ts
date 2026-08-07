import type { ImageMetadata } from "astro";

/**
 * Content `thumbnail` frontmatter is a path relative to `src/assets/`
 * (e.g. `logos/sandbox-vr.png`). Resolved here so the content files stay
 * free of import syntax and `astro:assets` can optimise the result.
 */
const ASSETS = import.meta.glob<{ default: ImageMetadata }>(
  "/src/assets/**/*.{jpeg,jpg,png,webp,avif,gif,svg}",
  { eager: true }
);

export function resolveThumbnail(path: string | null): ImageMetadata | null {
  if (!path) return null;
  const key = `/src/assets/${path.replace(/^\/+/, "")}`;
  return ASSETS[key]?.default ?? null;
}
