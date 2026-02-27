import { defineCollection, z } from 'astro:content';
import { glob, file } from 'astro/loaders';

const menu = defineCollection({
	loader: file('src/content/menu.json')
});

/**
 * Blog collection - Posts organized by journey and topic
 * Supports both Markdown (.md) and MDX (.mdx) files
 */
const blog = defineCollection({
	loader: glob({ base: './src/content/blog', pattern: '**/*.{md,mdx}' }),
	schema: ({ image }) =>
		z.object({
			title: z.string(),
			description: z.string().optional(),
			pubDate: z.coerce.date(),
			updatedDate: z.coerce.date().optional(),
			heroImage: image().optional(),
			tags: z.array(z.string()).optional(),
			order: z.number().optional(),
			readingTime: z.string().optional(),
			draft: z.boolean().default(false),
		}),
});


/**
 * Talks collection - Speaking engagements and presentations
 * Loaded from JSON data
 */
const talks = defineCollection({
	loader: glob({ base: './src/content/talks', pattern: '*.{json,yaml,yml}' }),
	schema: z.object({
		title: z.string(),
		description: z.string().optional(),
		date: z.coerce.date().optional(),
		status: z.enum(['past', 'upcoming', 'draft']).default('draft'),
		event: z.string().optional(),
		link: z.string().url().optional(),
		topics: z.array(z.string()).optional(),
	}),
});

const publications = defineCollection({
	loader: file('src/content/publications.json'),
	schema: z.object({
		title: z.string(),
		authors: z.array(z.string()),
		conference: z.string(),
		year: z.number(),
		doi: z.string().optional(),
		pdf: z.string().optional(),
		poster: z.string().optional(),
	}),
});

const series = defineCollection({
	loader: glob({ base: './src/content/series', pattern: '**/*.json' }),
	schema: z.object({
		id: z.string(),
		title: z.string(),
		status: z.enum(['ongoing', 'completed', 'upcoming']).default('ongoing'),
		posts: z.array(z.string()),
		totalPosts: z.number(),
	}),
});

export const collections = { blog, talks, menu, publications, series };