import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";
import { verifyAuthoredContent } from "@/lib/authoredContentVerification";

const entryShape = z
  .object({
    title: z.string(),
    subtitle: z.string().nullable().default(null),
    start: z.coerce.date(),
    /** `null` renders as "Present". */
    end: z.coerce.date().nullable().default(null),
    url: z.string().nullable().default(null),
    github: z.string().nullable().default(null),
    points: z.array(z.string()),
    /** Short stand-in for `title` where the full name is too long to set large. */
    displayTitle: z.string().min(1).nullable().default(null),
    /** One-line hook shown when an accordion item expands. */
    abstract: z.string().min(1).nullable().default(null),
    /** Per-entry hue for hover/expanded states. Falls back to the section colour. */
    accent: z
      .string()
      .regex(/^#[0-9a-f]{6}$/i)
      .nullable()
      .default(null),
    /** Path under `src/assets/`. Falls back to a monogram when absent. */
    thumbnail: z.string().nullable().default(null),
    /** Public-root path to a looping clip shown as the card/panel artwork. */
    video: z.string().nullable().default(null),
    /** Hidden from the site but kept in the repo. */
    draft: z.boolean().default(false),
  })
  .superRefine((data, context) => {
    const issues = verifyAuthoredContent([
      {
        section: "experience",
        file: "Portfolio Entry",
        data,
      },
    ]);
    for (const issue of issues) {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        message: issue.message,
        path: issue.path,
      });
    }
  });

const collection = (dir: string) =>
  defineCollection({
    loader: glob({ pattern: "**/*.md", base: `./src/content/${dir}` }),
    schema: entryShape,
  });

export const collections = {
  experience: collection("experience"),
  projects: collection("projects"),
  extras: collection("extras"),
};

export type EntryShape = z.infer<typeof entryShape>;
