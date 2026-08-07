import { test, expect, describe } from "bun:test";
import { Glob } from "bun";
import { NAV, SITE, SOCIALS } from "@/config/site";

const SECTIONS = ["experience", "projects", "extras"] as const;

type Frontmatter = {
  file: string;
  title?: string;
  start?: string;
  end?: string;
  url?: string;
  github?: string;
  points: string[];
  draft: boolean;
  body: string;
};

/**
 * Deliberately a hand-rolled reader rather than `astro:content` — these tests
 * must fail on malformed frontmatter, which the Astro loader would swallow at
 * a different layer.
 */
async function readSection(section: string): Promise<Frontmatter[]> {
  const glob = new Glob("*.md");
  const dir = `${import.meta.dir}/${section}`;
  const files: Frontmatter[] = [];

  for await (const name of glob.scan(dir)) {
    const raw = await Bun.file(`${dir}/${name}`).text();
    const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);
    expect(match, `${section}/${name} has no frontmatter block`).not.toBeNull();

    const [, frontmatter, body] = match!;
    const entry: Frontmatter = {
      file: `${section}/${name}`,
      points: [],
      draft: false,
      body: body ?? "",
    };

    let inPoints = false;
    for (const line of frontmatter!.split("\n")) {
      const point = line.match(/^\s+- (.+)$/);
      if (inPoints && point) {
        entry.points.push(point[1]!.trim());
        continue;
      }
      inPoints = false;

      const field = line.match(/^([a-zA-Z]+):\s*(.*)$/);
      if (!field) continue;
      const [, key, value] = field;

      if (key === "points") {
        inPoints = true;
        continue;
      }
      if (key === "draft") {
        entry.draft = value!.trim() === "true";
        continue;
      }
      const cleaned = value!.trim().replace(/^["']|["']$/g, "");
      if (cleaned && cleaned !== "null") {
        (entry as Record<string, unknown>)[key!] = cleaned;
      }
    }

    files.push(entry);
  }

  return files;
}

const allEntries = (await Promise.all(SECTIONS.map(readSection))).flat();

describe("content collections", () => {
  test("every section has at least one published entry", async () => {
    for (const section of SECTIONS) {
      const published = (await readSection(section)).filter((e) => !e.draft);
      expect(published.length, `${section} has no published entries`).toBeGreaterThan(0);
    }
  });

  test("required fields are present", () => {
    for (const entry of allEntries) {
      expect(entry.title, `${entry.file}: missing title`).toBeTruthy();
      expect(entry.start, `${entry.file}: missing start`).toBeTruthy();
      expect(entry.points.length, `${entry.file}: no points`).toBeGreaterThan(0);
    }
  });

  test("dates are valid ISO and start precedes end", () => {
    for (const entry of allEntries) {
      const start = new Date(entry.start!);
      expect(Number.isNaN(start.getTime()), `${entry.file}: bad start`).toBe(false);

      if (!entry.end) continue;
      const end = new Date(entry.end);
      expect(Number.isNaN(end.getTime()), `${entry.file}: bad end`).toBe(false);
      expect(
        start.getTime() <= end.getTime(),
        `${entry.file}: start is after end`
      ).toBe(true);
    }
  });

  test("urls are absolute http(s)", () => {
    for (const entry of allEntries) {
      for (const key of ["url", "github"] as const) {
        const value = entry[key];
        if (!value) continue;
        expect(
          /^https?:\/\//.test(value),
          `${entry.file}: ${key} is not an absolute URL`
        ).toBe(true);
      }
    }
  });

  test("points are non-empty and not duplicated within an entry", () => {
    for (const entry of allEntries) {
      const seen = new Set<string>();
      for (const point of entry.points) {
        expect(point.length, `${entry.file}: empty point`).toBeGreaterThan(0);
        expect(seen.has(point), `${entry.file}: duplicate point`).toBe(false);
        seen.add(point);
      }
    }
  });

  test("markdown bodies use h2 as their top level", () => {
    for (const entry of allEntries) {
      const body = entry.body.trim();
      if (!body) continue;
      expect(
        /^# /m.test(body),
        `${entry.file}: uses h1 in body — reserved for the page title`
      ).toBe(false);
    }
  });
});

describe("site config", () => {
  test("nav targets exist as section ids on the page", async () => {
    const page = await Bun.file(`${import.meta.dir}/../pages/index.astro`).text();
    for (const item of NAV) {
      const id = item.href.replace("#", "");
      expect(page.includes(`id="${id}"`), `no section with id ${id}`).toBe(true);
    }
  });

  test("socials and cv link are absolute or mailto", () => {
    for (const social of SOCIALS) {
      expect(/^(https?:\/\/|mailto:)/.test(social.href)).toBe(true);
    }
    expect(SITE.cvUrl.startsWith("https://")).toBe(true);
    expect(SITE.url.startsWith("https://")).toBe(true);
  });

  test("meta description stays within search-result length", () => {
    expect(SITE.description.length).toBeLessThanOrEqual(165);
    expect(SITE.description.length).toBeGreaterThanOrEqual(50);
  });
});
