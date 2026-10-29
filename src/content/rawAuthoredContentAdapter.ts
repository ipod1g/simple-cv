import { readdir, readFile } from "node:fs/promises";
import path from "node:path";
import { parseDocument } from "yaml";
import {
  AUTHORED_SECTIONS,
  type AuthoredContentEntry,
  type AuthoredSection,
} from "@/lib/authoredContentVerification";

const FRONTMATTER = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/;

/** Parse one raw Markdown file without relying on Astro's content loader. */
export function parseRawAuthoredContent(
  section: AuthoredSection,
  file: string,
  raw: string
): AuthoredContentEntry {
  const match = raw.match(FRONTMATTER);
  if (!match) {
    throw new Error(`${file} has no valid frontmatter block`);
  }

  const [, frontmatter, body = ""] = match;
  const document = parseDocument(frontmatter!, {
    prettyErrors: true,
    uniqueKeys: true,
  });
  if (document.errors.length > 0) {
    const details = document.errors.map(({ message }) => message).join("; ");
    throw new Error(`${file} has malformed frontmatter: ${details}`);
  }

  const data = document.toJS();
  if (data == null || Array.isArray(data) || typeof data !== "object") {
    throw new Error(`${file} frontmatter must be a mapping`);
  }

  return {
    section,
    file,
    data: data as Record<string, unknown>,
    body,
  };
}

/** Load every authored Portfolio Entry through the raw-file adapter. */
export async function loadRawAuthoredContent(
  contentRoot: string
): Promise<AuthoredContentEntry[]> {
  const entries: AuthoredContentEntry[] = [];

  for (const section of AUTHORED_SECTIONS) {
    const directory = path.join(contentRoot, section);
    const names = (await readdir(directory))
      .filter((name) => name.endsWith(".md"))
      .sort();

    for (const name of names) {
      const file = `${section}/${name}`;
      const raw = await readFile(path.join(directory, name), "utf8");
      entries.push(parseRawAuthoredContent(section, file, raw));
    }
  }

  return entries;
}
