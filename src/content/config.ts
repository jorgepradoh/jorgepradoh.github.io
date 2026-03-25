import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.coerce.date(),
    updated: z.coerce.date().optional(),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
    // optional: pin a post to the top of the index
    featured: z.boolean().default(false),
    // optional: cover image for og:image
    cover: z.string().optional(),
    // reading time in minutes — auto-computed if omitted
    readingTime: z.number().optional(),
  }),
});

export const collections = { blog };
