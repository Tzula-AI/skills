// File-system walking, hashing, size guards, name sanitization, and
// static-vs-build project detection.

import { createHash } from 'node:crypto';
import { readdir, readFile, stat } from 'node:fs/promises';
import path from 'node:path';
import { QuickShareError } from './api.mjs';

const MAX_SINGLE = 100 * 1024 * 1024;
const MAX_TOTAL = 100 * 1024 * 1024;

const SKIP_DIRS = new Set([
  '.git', 'node_modules', '.vercel', '.next', '.cache', '.turbo',
  '__pycache__', '.venv', '.idea', '.svelte-kit',
]);
const SKIP_FILES_EXACT = new Set(['.DS_Store', 'Thumbs.db']);

const BUILD_FRAMEWORKS = [
  'next', 'nuxt', 'astro', 'vite', '@remix-run/dev', '@sveltejs/kit',
  'gatsby', 'react-scripts', '@angular/cli', 'parcel', 'expo',
];

export function sanitizeName(input) {
  let s = String(input || '').toLowerCase();
  s = s.replace(/[^a-z0-9._-]+/g, '-');
  s = s.replace(/^[-._]+|[-._]+$/g, '');
  s = s.replace(/-+/g, '-');
  if (!s) s = 'quick-share';
  return s.slice(0, 52);
}

function hashBuf(buf) {
  return createHash('sha1').update(buf).digest('hex');
}

function shouldSkipFile(name) {
  if (SKIP_FILES_EXACT.has(name)) return true;
  if (name === '.env' || name.startsWith('.env.')) return true;
  if (name.endsWith('.log')) return true;
  return false;
}

async function loadVercelIgnore(rootAbs) {
  try {
    const raw = await readFile(path.join(rootAbs, '.vercelignore'), 'utf8');
    return raw.split('\n').map((l) => l.trim()).filter((l) => l && !l.startsWith('#'));
  } catch {
    return [];
  }
}

function isIgnored(rel, base, lines) {
  for (const line of lines) {
    if (rel === line || base === line) return true;
    const prefix = line.endsWith('/') ? line : `${line}/`;
    if (rel.startsWith(prefix)) return true;
  }
  return false;
}

async function walkDir(dirAbs, relBase, out, ignoreLines) {
  const entries = await readdir(dirAbs, { withFileTypes: true });
  for (const entry of entries) {
    const rel = relBase ? `${relBase}/${entry.name}` : entry.name;
    const abs = path.join(dirAbs, entry.name);
    if (entry.isDirectory()) {
      if (SKIP_DIRS.has(entry.name) || isIgnored(rel, entry.name, ignoreLines)) continue;
      await walkDir(abs, rel, out, ignoreLines);
    } else if (entry.isFile()) {
      if (shouldSkipFile(entry.name) || isIgnored(rel, entry.name, ignoreLines)) continue;
      out.push({ abs, rel });
    }
  }
}

// Returns { manifest: [{relPath, buffer, sha1, size}], realFileCount }.
export async function walkFiles(absPath, isFile) {
  if (isFile) {
    const st = await stat(absPath);
    if (st.size > MAX_SINGLE) {
      throw new QuickShareError(`file exceeds 100 MiB: ${absPath}`, 1);
    }
    const buf = await readFile(absPath);
    const sha1 = hashBuf(buf);
    const ext = path.extname(absPath).toLowerCase();
    const relPath = ext === '.html' || ext === '.htm' ? 'index.html' : path.basename(absPath);
    return { manifest: [{ relPath, buffer: buf, sha1, size: buf.length }], realFileCount: 1 };
  }

  const ignoreLines = await loadVercelIgnore(absPath);
  const collected = [];
  await walkDir(absPath, '', collected, ignoreLines);
  if (collected.length === 0) {
    throw new QuickShareError(`no files found to deploy under ${absPath}`, 4);
  }

  let totalBytes = 0;
  const sized = [];
  for (const f of collected) {
    const st = await stat(f.abs);
    if (st.size > MAX_SINGLE) {
      throw new QuickShareError(`file exceeds 100 MiB: ${f.rel}`, 1);
    }
    totalBytes += st.size;
    sized.push(f);
  }
  if (totalBytes > MAX_TOTAL) {
    throw new QuickShareError(`total size ${totalBytes} bytes exceeds 100 MiB limit`, 1);
  }

  const manifest = [];
  for (const f of sized) {
    const buf = await readFile(f.abs);
    manifest.push({ relPath: f.rel, buffer: buf, sha1: hashBuf(buf), size: buf.length });
  }

  const hasRootIndex = manifest.some((m) => m.relPath === 'index.html');
  if (!hasRootIndex) {
    const htmlFiles = manifest.filter((m) => m.relPath.endsWith('.html'));
    if (htmlFiles.length === 1) {
      const src = htmlFiles[0];
      manifest.push({ relPath: 'index.html', buffer: src.buffer, sha1: src.sha1, size: src.size });
    }
  }

  return { manifest, realFileCount: collected.length };
}

export async function detectMode(rootAbsPath, isFile) {
  if (isFile) return 'static';
  let pkg;
  try {
    pkg = JSON.parse(await readFile(path.join(rootAbsPath, 'package.json'), 'utf8'));
  } catch {
    return 'static';
  }
  if (pkg.scripts && pkg.scripts.build) return 'build';
  const deps = { ...(pkg.dependencies || {}), ...(pkg.devDependencies || {}) };
  if (BUILD_FRAMEWORKS.some((f) => f in deps)) return 'build';
  return 'static';
}
