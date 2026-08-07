import { getCollection, type CollectionEntry } from "astro:content";

export type Section = "experience" | "projects" | "extras";
export type Entry = CollectionEntry<Section>;

/** Published entries, newest first — mirrors the old Notion `Duration desc` sort. */
export async function getEntries(section: Section): Promise<Entry[]> {
  const entries = await getCollection(section, ({ data }) => !data.draft);
  return entries.sort(
    (a, b) => b.data.start.getTime() - a.data.start.getTime()
  );
}

const MONTH_YEAR = new Intl.DateTimeFormat("en", {
  month: "short",
  year: "numeric",
  timeZone: "UTC",
});

export function formatMonth(date: Date): string {
  return MONTH_YEAR.format(date);
}

/** "Jan 2023 - Present" / "Jan 2023 - Mar 2023" / "Jan 2023" when both match. */
export function formatDuration(start: Date, end: Date | null): string {
  const from = formatMonth(start);
  if (!end) return `${from} - Present`;
  const to = formatMonth(end);
  return from === to ? from : `${from} - ${to}`;
}

/** Machine-readable range for <time datetime>. */
export function isoRange(start: Date, end: Date | null): string {
  const iso = (d: Date) => d.toISOString().slice(0, 10);
  return end ? `${iso(start)}/${iso(end)}` : iso(start);
}

/** Up to two initials from a title, for the thumbnail fallback. */
export function monogram(title: string): string {
  const words = title
    .replace(/[^\p{L}\p{N} ]/gu, " ")
    .split(/\s+/)
    .filter(Boolean);
  if (words.length === 0) return "?";
  if (words.length === 1) return words[0]!.slice(0, 2).toUpperCase();
  return (words[0]![0]! + words[1]![0]!).toUpperCase();
}
