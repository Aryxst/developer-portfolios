import { defineCollection, z } from 'astro:content';

export const collections = {
 developers: defineCollection({
  type: 'data',
  schema: ({ image }) =>
   z.object({
    name: z.string(),
    url: z.string().url(),
    screenshot: image(),
    tags: z.array(z.string()),
    featured: z.boolean().optional(),
   }),
 }),
};
