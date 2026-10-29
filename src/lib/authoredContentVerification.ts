export const AUTHORED_SECTIONS = [
  "experience",
  "projects",
  "extras",
] as const;

export type AuthoredSection = (typeof AUTHORED_SECTIONS)[number];

export interface AuthoredContentEntry {
  section: AuthoredSection;
  file: string;
  data: Record<string, unknown>;
  body?: string;
}

export interface AuthoredContentIssue {
  code:
    | "missing-title"
    | "missing-start"
    | "invalid-start"
    | "invalid-end"
    | "reversed-dates"
    | "invalid-url"
    | "missing-points"
    | "empty-point"
    | "duplicate-point"
    | "reserved-heading"
    | "empty-section";
  file: string;
  message: string;
  path: Array<string | number>;
}

export interface AuthoredContentVerificationOptions {
  requirePublishedSections?: boolean;
}

function asDate(value: unknown): Date | null {
  if (value instanceof Date) return value;
  if (typeof value !== "string" || value.trim() === "") return null;
  return new Date(value);
}

function isValidDate(date: Date | null): date is Date {
  return date != null && !Number.isNaN(date.getTime());
}

function isAbsoluteHttpUrl(value: unknown): boolean {
  return typeof value === "string" && /^https?:\/\//.test(value);
}

function issue(
  entry: AuthoredContentEntry,
  code: AuthoredContentIssue["code"],
  message: string,
  path: Array<string | number>
): AuthoredContentIssue {
  return { code, file: entry.file, message, path };
}

function verifyEntry(entry: AuthoredContentEntry): AuthoredContentIssue[] {
  const issues: AuthoredContentIssue[] = [];
  const { data } = entry;

  if (typeof data.title !== "string" || data.title.trim() === "") {
    issues.push(issue(entry, "missing-title", "missing title", ["title"]));
  }

  if (data.start == null || data.start === "") {
    issues.push(issue(entry, "missing-start", "missing start date", ["start"]));
  } else {
    const start = asDate(data.start);
    if (!isValidDate(start)) {
      issues.push(issue(entry, "invalid-start", "invalid start date", ["start"]));
    } else if (data.end != null && data.end !== "") {
      const end = asDate(data.end);
      if (!isValidDate(end)) {
        issues.push(issue(entry, "invalid-end", "invalid end date", ["end"]));
      } else if (start.getTime() > end.getTime()) {
        issues.push(
          issue(entry, "reversed-dates", "start date is after end date", ["end"])
        );
      }
    }
  }

  for (const key of ["url", "github"] as const) {
    const value = data[key];
    if (value == null || value === "") continue;
    if (!isAbsoluteHttpUrl(value)) {
      issues.push(
        issue(entry, "invalid-url", `${key} is not an absolute HTTP URL`, [key])
      );
    }
  }

  if (!Array.isArray(data.points) || data.points.length === 0) {
    issues.push(issue(entry, "missing-points", "no points", ["points"]));
  } else {
    const seen = new Set<string>();
    data.points.forEach((point, index) => {
      if (typeof point !== "string" || point.trim() === "") {
        issues.push(
          issue(entry, "empty-point", "empty point", ["points", index])
        );
        return;
      }
      if (seen.has(point)) {
        issues.push(
          issue(entry, "duplicate-point", "duplicate point", ["points", index])
        );
      }
      seen.add(point);
    });
  }

  if (entry.body && /^# /m.test(entry.body)) {
    issues.push(
      issue(
        entry,
        "reserved-heading",
        "body uses h1, which is reserved for the page title",
        ["body"]
      )
    );
  }

  return issues;
}

/**
 * Verifies normalized authored content through one interface. The Astro adapter
 * supplies one entry; the raw-file adapter supplies the complete collection.
 */
export function verifyAuthoredContent(
  entries: AuthoredContentEntry[],
  options: AuthoredContentVerificationOptions = {}
): AuthoredContentIssue[] {
  const issues = entries.flatMap(verifyEntry);

  if (options.requirePublishedSections) {
    for (const section of AUTHORED_SECTIONS) {
      const hasPublished = entries.some(
        (entry) => entry.section === section && entry.data.draft !== true
      );
      if (!hasPublished) {
        issues.push({
          code: "empty-section",
          file: section,
          message: `${section} has no published entries`,
          path: [section],
        });
      }
    }
  }

  return issues;
}
