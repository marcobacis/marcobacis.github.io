import { existsSync, readFileSync } from 'node:fs';

const routes = [
	'index.html',
	'blog/index.html',
	'contact/index.html',
	'privacy/index.html',
	'journeys/index.html',
];

for (const route of routes) {
	const path = `dist/${route}`;
	if (!existsSync(path)) throw new Error(`Missing generated route: ${route}`);
}

const home = readFileSync('dist/index.html', 'utf8');
const article = readFileSync('dist/blog/2025-review/index.html', 'utf8');

for (const [name, html, marker] of [
	['homepage skip link', home, 'Skip to main content'],
	['homepage structured data', home, 'application/ld+json'],
	['article structured data', article, 'application/ld+json'],
	['article navigation', article, 'Article navigation'],
]) {
	if (!html.includes(marker)) throw new Error(`Missing ${name}: ${marker}`);
}

console.log(`Site smoke checks passed for ${routes.length} routes.`);
