import { cp, mkdir, rm } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const OUT = path.join(ROOT, 'dist');
const OMIT = new Set(['dist', 'node_modules', '.git', '.github', 'scripts', 'data', 'README.md', 'site-template.html', 'package.json', 'package-lock.json']);

await rm(OUT, { recursive: true, force: true });
await mkdir(OUT, { recursive: true });
for (const item of (await (await import('node:fs/promises')).readdir(ROOT, { withFileTypes: true }))) {
  if (OMIT.has(item.name)) continue;
  await cp(path.join(ROOT, item.name), path.join(OUT, item.name), { recursive: true, force: true });
}
console.log('AURA WALL static site built into ./dist');
