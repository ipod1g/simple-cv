import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const entryShape = z.object({
  title: z.string().min(1),
  subtitle: z.string().nullable().default(null),
  start: z.coerce.date(),
  /** `null` renders as "Present". */
  end: z.coerce.date().nullable().default(null),
  url: z.string().url().nullable().default(null),
  github: z.string().url().nullable().default(null),
  points: z.array(z.string().min(1)).min(1),
  /** Path under `src/assets/`. Falls back to a monogram when absent. */
  thumbnail: z.string().nullable().default(null),
  /** Hidden from the site but kept in the repo. */
  draft: z.boolean().default(false),
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
