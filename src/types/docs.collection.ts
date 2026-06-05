import { glob } from "astro/loaders";
import { defineCollection, z } from "astro:content";

// A box/callout that can appear in the optional W3C masthead "Status" block.
const boxSchema = z.object({
  type: z.enum(["note", "example", "issue", "advisement"]),
  title: z.string().optional(),
  content: z.string(),
});

const docsSchema = z.object({
  enable: z.boolean().default(true),
  title: z.string(),
  subtitle: z.string().optional(),
  meta_title: z.string().optional(),
  description: z.string().optional(),
  // Auto-generated table of contents (from the document headings). Set to
  // false to hide it for a given doc.
  toc: z.boolean().default(true),

  // Optional W3C / ReSpec masthead — used by the spec, omitted by plain docs.
  versions: z
    .object({
      thisVersion: z.string(),
      latestVersion: z.string().optional(),
      history: z.string().optional(),
    })
    .optional(),
  editors: z.array(z.string()).optional(),
  feedback: z.string().optional(),
  copyright: z.string().optional(),
  abstract: z.string().optional(),
  status: z
    .object({
      content: z.string().optional(),
      boxes: z.array(boxSchema).optional(),
    })
    .optional(),
});

/**
 * Generic documentation collection.
 *
 * Drop any `.md` / `.mdx` file into `src/content/docs/` and it becomes a page at
 * `/docs/<filename>/` (the `spec` entry is served at `/spec/` instead — see
 * `src/pages/spec.astro`). The body is authored as ordinary Markdown; only the
 * small masthead metadata lives in frontmatter, and all of it is optional except
 * `title`.
 */
export const docs = defineCollection({
  loader: glob({
    pattern: "**/*.{md,mdx}",
    base: "src/content/docs",
  }),
  schema: docsSchema,
});

export type DocsBox = z.infer<typeof boxSchema>;
export type DocsData = z.infer<typeof docsSchema>;
