export type PortfolioEntryKind = "experience" | "project" | "extra";

export interface PortfolioEntrySource {
  id: string;
  body?: string;
  rendered?: { html?: string };
  data: {
    title: string;
    subtitle: string | null;
    start: Date;
    end: Date | null;
    url: string | null;
    github: string | null;
    points: string[];
    displayTitle: string | null;
    abstract: string | null;
    accent: string | null;
    thumbnail: string | null;
    video: string | null;
    draft: boolean;
  };
}

export interface PortfolioEntrySourceSet {
  experience: PortfolioEntrySource[];
  projects: PortfolioEntrySource[];
  extras: PortfolioEntrySource[];
}

interface PortfolioEntryBase<K extends PortfolioEntryKind> {
  kind: K;
  id: string;
  title: string;
  subtitle: string | null;
  duration: string;
  iso: string;
  points: string[];
  url: string | null;
  github: string | null;
  accent: string;
  monogram: string;
}

export interface ExperiencePortfolioEntry
  extends PortfolioEntryBase<"experience"> {
  displayTitle: string;
  abstract: string | null;
}

export interface ProjectPortfolioEntry
  extends PortfolioEntryBase<"project"> {
  /** Rendered markdown authored in this repository, never user input. */
  bodyHtml: string | null;
  video: string | null;
  /**
   * Still artwork for a project with no clip. Resolved to an optimised `src`
   * before it reaches the carousel, which is a React island and so can only
   * be handed a URL, not an `ImageMetadata`.
   */
  thumbnail: string | null;
}

export interface ExtraPortfolioEntry extends PortfolioEntryBase<"extra"> {
  /** Rendered markdown authored in this repository, never user input. */
  bodyHtml: string | null;
  thumbnail: string | null;
}

export type PortfolioEntry =
  | ExperiencePortfolioEntry
  | ProjectPortfolioEntry
  | ExtraPortfolioEntry;

export interface PortfolioEntries {
  experience: ExperiencePortfolioEntry[];
  projects: ProjectPortfolioEntry[];
  extras: ExtraPortfolioEntry[];
}

const MONTH_YEAR = new Intl.DateTimeFormat("en", {
  month: "short",
  year: "numeric",
  timeZone: "UTC",
});

function formatMonth(date: Date): string {
  return MONTH_YEAR.format(date);
}

function formatDuration(start: Date, end: Date | null): string {
  const from = formatMonth(start);
  if (!end) return `${from} - Present`;
  const to = formatMonth(end);
  return from === to ? from : `${from} - ${to}`;
}

function isoRange(start: Date, end: Date | null): string {
  const iso = (date: Date) => date.toISOString().slice(0, 10);
  return end ? `${iso(start)}/${iso(end)}` : iso(start);
}

function makeMonogram(title: string): string {
  const words = title
    .replace(/[^\p{L}\p{N} ]/gu, " ")
    .split(/\s+/)
    .filter(Boolean);
  if (words.length === 0) return "?";
  if (words.length === 1) return words[0]!.slice(0, 2).toUpperCase();
  return (words[0]![0]! + words[1]![0]!).toUpperCase();
}

function prepareBase<K extends PortfolioEntryKind>(
  kind: K,
  source: PortfolioEntrySource
): PortfolioEntryBase<K> {
  const { data } = source;
  return {
    kind,
    id: source.id,
    title: data.title,
    subtitle: data.subtitle,
    duration: formatDuration(data.start, data.end),
    iso: isoRange(data.start, data.end),
    points: data.points,
    url: data.url,
    github: data.github,
    accent: data.accent ?? "var(--color-accent)",
    monogram: makeMonogram(data.title),
  };
}

function publishedNewestFirst(
  entries: PortfolioEntrySource[]
): PortfolioEntrySource[] {
  return entries
    .filter(({ data }) => !data.draft)
    .toSorted((a, b) => b.data.start.getTime() - a.data.start.getTime());
}

function preparePortfolio(source: PortfolioEntrySourceSet): PortfolioEntries {
  return {
    experience: publishedNewestFirst(source.experience).map((entry) => ({
      ...prepareBase("experience", entry),
      displayTitle: entry.data.displayTitle ?? entry.data.title,
      abstract: entry.data.abstract,
    })),
    projects: publishedNewestFirst(source.projects).map((entry) => ({
      ...prepareBase("project", entry),
      bodyHtml: entry.rendered?.html ?? null,
      video: entry.data.video,
      thumbnail: entry.data.thumbnail,
    })),
    extras: publishedNewestFirst(source.extras).map((entry) => ({
      ...prepareBase("extra", entry),
      bodyHtml: entry.body?.trim() ? entry.rendered?.html ?? null : null,
      thumbnail: entry.data.thumbnail,
    })),
  };
}

async function loadAstroSource(): Promise<PortfolioEntrySourceSet> {
  const { getCollection } = await import("astro:content");
  const [experience, projects, extras] = await Promise.all([
    getCollection("experience"),
    getCollection("projects"),
    getCollection("extras"),
  ]);
  return { experience, projects, extras };
}

/**
 * Returns every published Portfolio Entry prepared for its Astro or React
 * adapter. Tests provide an in-memory source; production uses Astro content.
 */
export async function getPortfolioEntries(
  source?: PortfolioEntrySourceSet
): Promise<PortfolioEntries> {
  return preparePortfolio(source ?? (await loadAstroSource()));
}
