import { glob } from "astro/loaders";
import { defineCollection, z } from "astro:content";

const commonFields = {
  title: z.string(),
  description: z.string(),
  meta_title: z.string().optional(),
  date: z.union([z.date(), z.string()]).optional(),
  image: z.string().optional(),
  draft: z.boolean(),
};

export const about = defineCollection({
  loader: glob({
    pattern: "**/-*.{md,mdx}",
    base: "src/content/about",
  }),
  schema: z.object({
    ...commonFields,
  }),
});

export const blog = defineCollection({
  loader: glob({
    pattern: "**/*.{md,mdx}",
    base: "src/content/blog",
  }),
  schema: z.object({
   ...commonFields,
    featured: z.boolean().optional(),
    tags: z.array(z.string()).optional(),

    hero: z
      .object({
        title: z.string(),
        subtitle: z.string().optional(),
        description: z.string().optional(),
      })
      .optional(),
  }),
});

export const changelog = defineCollection({
  loader: glob({
    pattern: "**/-*.{md,mdx}",
    base: "src/content/changelog",
  }),
  schema: z.object({
    ...commonFields,
  }),
});

export const contact = defineCollection({
  loader: glob({
    pattern: "**/-*.{md,mdx}",
    base: "src/content/contact",
  }),
  schema: z.object({
   ...commonFields,

    // Hero section
    hero: z.object({
      title: z.string(),
      description: z.string(),
      list: z.array(
        z.object({
          icon: z.string(),
          title: z.string(),
          description: z.string(),
          button: z
            .object({
              enable: z.boolean(),
              label: z.string(),
              link: z.string(),
            })
            .optional(),
        }),
      ),
    }),

    // Contact form section
    contact_form: z
      .object({
        title: z.string(),
        list: z.array(
          z.object({
            icon: z.string(),
            title: z.string(),
            description: z.string(),
          }),
        ),
      })
      .optional(),
  }),
});

export const feature = defineCollection({
  loader: glob({
    pattern: "**/-*.{md,mdx}",
    base: "src/content/feature",
  }),
  schema: z.object({
    ...commonFields,

    // Hero section
    hero: z.object({
      subtitle: z.string(),
      title: z.string(),
      description: z.string(),
    }),
  }),
});

export const integration = defineCollection({
  loader: glob({
    pattern: "**/*.{md,mdx}",
    base: "src/content/integration",
  }),
  schema: z.object({
   ...commonFields,
    all_integration: z
      .object({
        title: z.string(),
      })
      .optional(),

    type: z.string().optional(),
    button: z
      .object({
        enable: z.boolean(),
        label: z.string(),
        link: z.string(),
      })
      .optional(),
  }),
});

export const pages = defineCollection({
  loader: glob({
    pattern: "**/*.{md,mdx}",
    base: "src/content/pages",
  }),
  schema: z.object({
   ...commonFields,
  }),
});

export const pricing = defineCollection({
  loader: glob({
    pattern: "**/-*.{md,mdx}",
    base: "src/content/pricing",
  }),
  schema: z.object({
    ...commonFields,
    features: z.object({
      title: z.string(),
      description: z.string(),
    }),
  }),
});
