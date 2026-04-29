// @ts-check
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import { transformerRenderIndentGuides } from '@shikijs/transformers';
import { defineConfig } from 'astro/config';
import mermaid from 'astro-mermaid';


// https://astro.build/config
export default defineConfig({
	site: 'https://marcobacis.dev',
	integrations: [
		mermaid({
			autoTheme: true,
			enableLog: false,
			mermaidConfig: {
				flowchart: {
					curve: 'basis'
				}
			},
		}),
		mdx(),
		sitemap(),
	],
	markdown: {
		shikiConfig: {
			transformers: [
				transformerRenderIndentGuides()
			]
		}
	}
});
