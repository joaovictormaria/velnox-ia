import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';
import { marked } from 'marked';
import { DEFAULT_LOCALE } from '@/lib/content';

const BLOG_ROOT = path.join(process.cwd(), 'content', 'blog');

function dirFor(locale) {
  return path.join(BLOG_ROOT, locale);
}

function readPostFile(dir, filename) {
  const slug = filename.replace(/\.md$/, '');
  const raw = fs.readFileSync(path.join(dir, filename), 'utf8');
  const { data, content } = matter(raw);
  return { slug, title: data.title, description: data.description, date: data.date, content };
}

// Every post that exists for the default locale defines the canonical set of
// slugs; other locales only need a translated file per slug when it exists,
// falling back to the default-locale version so new posts don't have to be
// translated on day one.
export function getAllPosts(locale = DEFAULT_LOCALE) {
  const defaultDir = dirFor(DEFAULT_LOCALE);
  if (!fs.existsSync(defaultDir)) return [];

  const localeDir = dirFor(locale);
  return fs
    .readdirSync(defaultDir)
    .filter((file) => file.endsWith('.md'))
    .map((file) => {
      const dir = locale !== DEFAULT_LOCALE && fs.existsSync(path.join(localeDir, file)) ? localeDir : defaultDir;
      const { content, ...meta } = readPostFile(dir, file);
      return meta;
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

// dangerouslySetInnerHTML below is safe only because posts are repo-authored
// .md files, not user-submitted content — add sanitization if that changes.
export function getPostBySlug(slug, locale = DEFAULT_LOCALE) {
  const filename = `${slug}.md`;
  const localeDir = dirFor(locale);
  const defaultDir = dirFor(DEFAULT_LOCALE);
  const dir = locale !== DEFAULT_LOCALE && fs.existsSync(path.join(localeDir, filename)) ? localeDir : defaultDir;

  const filePath = path.join(dir, filename);
  if (!fs.existsSync(filePath)) return null;
  const { content, ...meta } = readPostFile(dir, filename);
  return { ...meta, html: marked.parse(content) };
}
