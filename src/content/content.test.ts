import { describe, expect, test } from "bun:test";
import { NAV, SITE, SOCIALS } from "@/config/site";
import {
  verifyAuthoredContent,
  type AuthoredContentEntry,
} from "@/lib/authoredContentVerification";
import {
  loadRawAuthoredContent,
  parseRawAuthoredContent,
} from "./rawAuthoredContentAdapter";

const allEntries = await loadRawAuthoredContent(import.meta.dir);

describe("Authored Content Verification", () => {
  test("all raw Portfolio Entries satisfy the shared rules", () => {
    const issues = verifyAuthoredContent(allEntries, {
      requirePublishedSections: true,
    });
    expect(issues.map(({ file, message }) => `${file}: ${message}`)).toEqual([]);
  });

  test("the raw-file adapter rejects malformed frontmatter", () => {
    expect(() =>
      parseRawAuthoredContent(
        "projects",
        "projects/broken.md",
        "---\ntitle: [broken\n---\n"
      )
    ).toThrow("projects/broken.md has malformed frontmatter");
  });

  test("the shared interface reports semantic failures", () => {
    const invalid: AuthoredContentEntry = {
      section: "projects",
      file: "projects/invalid.md",
      body: "# Reserved heading",
      data: {
        title: "Invalid",
        start: "2025-02-01",
        end: "2025-01-01",
        url: "/relative",
        points: ["Repeated", "Repeated", ""],
        draft: false,
      },
    };

    expect(verifyAuthoredContent([invalid]).map(({ code }) => code)).toEqual([
      "reversed-dates",
      "invalid-url",
      "duplicate-point",
      "empty-point",
      "reserved-heading",
    ]);
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
