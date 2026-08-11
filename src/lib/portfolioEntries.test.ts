import { describe, expect, test } from "bun:test";
import {
  getPortfolioEntries,
  type PortfolioEntrySource,
  type PortfolioEntrySourceSet,
} from "./portfolioEntries";

const sourceEntry = (
  id: string,
  overrides: Partial<PortfolioEntrySource["data"]> = {},
  body?: string
): PortfolioEntrySource => ({
  id,
  body,
  rendered: body ? { html: `<h2>${id}</h2>` } : undefined,
  data: {
    title: "Deep Module",
    subtitle: null,
    start: new Date("2024-01-01T00:00:00.000Z"),
    end: null,
    url: null,
    github: null,
    points: ["Hides complexity"],
    displayTitle: null,
    abstract: null,
    accent: null,
    thumbnail: null,
    video: null,
    draft: false,
    ...overrides,
  },
});

const sourceSet = (
  overrides: Partial<PortfolioEntrySourceSet> = {}
): PortfolioEntrySourceSet => ({
  experience: [],
  projects: [],
  extras: [],
  ...overrides,
});

describe("Portfolio Entry interface", () => {
  test("filters drafts and sorts every category newest first", async () => {
    const old = sourceEntry("old", {
      start: new Date("2022-01-01T00:00:00.000Z"),
    });
    const current = sourceEntry("current", {
      start: new Date("2025-01-01T00:00:00.000Z"),
    });
    const draft = sourceEntry("draft", { draft: true });

    const portfolio = await getPortfolioEntries(
      sourceSet({ experience: [old, draft, current] })
    );

    expect(portfolio.experience.map(({ id }) => id)).toEqual([
      "current",
      "old",
    ]);
  });

  test("prepares category variants behind one interface", async () => {
    const experience = sourceEntry("experience", {
      title: "Sandbox VR",
      displayTitle: "Sandbox",
      abstract: "Booking systems",
      accent: "#4c82f7",
      end: new Date("2024-03-01T00:00:00.000Z"),
    });
    const project = sourceEntry(
      "project",
      { title: "React Slides", video: "/demo.mp4" },
      "## Detail"
    );
    const extra = sourceEntry(
      "extra",
      { title: "Physics Olympiad", thumbnail: "physics.png" },
      "## Result"
    );

    const portfolio = await getPortfolioEntries(
      sourceSet({ experience: [experience], projects: [project], extras: [extra] })
    );

    expect(portfolio.experience[0]).toMatchObject({
      kind: "experience",
      displayTitle: "Sandbox",
      duration: "Jan 2024 - Mar 2024",
      iso: "2024-01-01/2024-03-01",
      monogram: "SV",
    });
    expect(portfolio.projects[0]).toMatchObject({
      kind: "project",
      bodyHtml: "<h2>project</h2>",
      video: "/demo.mp4",
      monogram: "RS",
    });
    expect(portfolio.extras[0]).toMatchObject({
      kind: "extra",
      bodyHtml: "<h2>extra</h2>",
      thumbnail: "physics.png",
      monogram: "PO",
    });
  });

  test("uses stable fallbacks for open ranges and presentation details", async () => {
    const portfolio = await getPortfolioEntries(
      sourceSet({ experience: [sourceEntry("fallback")] })
    );

    expect(portfolio.experience[0]).toMatchObject({
      displayTitle: "Deep Module",
      duration: "Jan 2024 - Present",
      iso: "2024-01-01",
      accent: "var(--color-accent)",
      monogram: "DM",
    });
  });
});
