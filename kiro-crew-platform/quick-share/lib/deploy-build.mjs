// Build deploy path: shell out to `npx vercel@latest deploy` and scrape the
// resulting deployment URL from its stdout.

import { spawn } from 'node:child_process';
import { QuickShareError } from './api.mjs';
import { ensureProjectPublic } from './project.mjs';

const URL_RE = /https:\/\/[^\s"'`,;)\]]+/g;
const INSPECT_RE = /Inspect\s+(https:\/\/\S+)/i;
const ALIASED_RE = /Aliased/i;
const PRODUCTION_RE = /^\s*Production\b/i;

function sanitizeUrl(raw) {
  return raw.replace(/[.,"'`)\]]+$/, '');
}

function extractUrls(line) {
  const found = [];
  for (const m of line.matchAll(URL_RE)) {
    found.push(sanitizeUrl(m[0]));
  }
  return found;
}

function isInspectorUrl(url) {
  return /^https:\/\/vercel\.com\//i.test(url);
}

// Picks the canonical, user-shareable URL out of the CLI's stdout, favoring
// (a) an explicit "Aliased" line, (b) the known stable alias for prod
// deploys, (c) a "Production" summary line, then (d) the last non-inspector
// URL seen anywhere in the output.
function pickUrl(lines, rawOut, name, target) {
  for (const line of lines) {
    if (ALIASED_RE.test(line)) {
      const urls = extractUrls(line);
      if (urls.length) return urls[urls.length - 1];
    }
  }

  if (target === 'production') {
    const aliasUrl = `https://${name}.vercel.app`;
    if (rawOut.includes(aliasUrl)) return aliasUrl;
  }

  for (let i = lines.length - 1; i >= 0; i--) {
    if (PRODUCTION_RE.test(lines[i])) {
      const urls = extractUrls(lines[i]);
      if (urls.length) return urls[urls.length - 1];
    }
  }

  for (let i = lines.length - 1; i >= 0; i--) {
    const urls = extractUrls(lines[i]);
    for (let j = urls.length - 1; j >= 0; j--) {
      if (!isInspectorUrl(urls[j])) return urls[j];
    }
  }

  return null;
}

export async function deployBuild({ absPath, name, target, token, team, log }) {
  const start = Date.now();
  await ensureProjectPublic({ name, token, team, log });
  const args = ['--yes', 'vercel@latest', 'deploy', '--cwd', absPath, '--token', token, '--project', name, '--yes'];
  if (target === 'production') args.push('--prod');
  if (team) args.push('--scope', team);

  const redacted = args.map((a) => (a === token ? '***' : a));
  log(`running: npx ${redacted.join(' ')}`);

  // Vercel's stable alias line ("▲ Aliased  https://<slug>.vercel.app") and
  // the "Inspect"/"Production" summary lines are written to stderr, not
  // stdout (stdout carries a machine-readable JSON deployment summary in
  // non-interactive/agent mode). Capture both so URL scraping can see the
  // real progress output, while still forwarding stderr live for visibility.
  const { out, err } = await new Promise((resolve, reject) => {
    const child = spawn('npx', args, { stdio: ['ignore', 'pipe', 'pipe'] });
    let buf = '';
    let errBuf = '';
    child.stdout.on('data', (d) => {
      buf += d.toString();
    });
    child.stderr.on('data', (d) => {
      const s = d.toString();
      errBuf += s;
      process.stderr.write(s);
    });
    child.on('error', (spawnErr) => {
      reject(new QuickShareError(`failed to spawn npx: ${spawnErr.message}`, 1));
    });
    child.on('close', (code) => {
      if (code !== 0) {
        reject(new QuickShareError(`vercel CLI exited with code ${code}`, 1));
        return;
      }
      resolve({ out: buf, err: errBuf });
    });
  });

  const combined = `${out}\n${err}`;
  const lines = combined.split('\n').map((l) => l.trim()).filter(Boolean);

  const url = pickUrl(lines, combined, name, target);
  if (!url) {
    throw new QuickShareError('vercel CLI did not output a deployment URL', 1);
  }

  let inspectorUrl = null;
  for (const line of lines) {
    const m = line.match(INSPECT_RE);
    if (m) {
      inspectorUrl = sanitizeUrl(m[1]);
      break;
    }
  }

  return { url, inspectorUrl, mode: 'build', fileCount: 0, durationMs: Date.now() - start };
}
