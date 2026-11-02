// Static deploy path: upload blobs via the Vercel REST API, create a
// deployment from the file manifest, then poll until it is READY.

import { vercelFetch, QuickShareError } from './api.mjs';
import { ensureProjectPublic } from './project.mjs';
import { walkFiles } from './detect.mjs';

const POLL_INTERVAL_MS = 1500;
const POLL_TIMEOUT_MS = 300000;
const ALIAS_WAIT_MS = 20000;
const UPLOAD_CONCURRENCY = 8;

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function discard(res) {
  if (res && res.body && typeof res.body.cancel === 'function') {
    res.body.cancel().catch(() => {});
  }
}

async function pool(items, limit, worker) {
  let idx = 0;
  async function run() {
    while (idx < items.length) {
      const cur = idx++;
      await worker(items[cur]);
    }
  }
  await Promise.all(Array.from({ length: Math.min(limit, items.length) }, run));
}

async function uploadBlob(f, token, team) {
  const res = await vercelFetch(
    'https://api.vercel.com/v2/files',
    { method: 'POST', headers: { 'Content-Length': String(f.size), 'x-vercel-digest': f.sha1 }, body: f.buffer },
    token, team,
  );
  discard(res);
}

async function createDeployment({ name, manifest, target, token, team }) {
  const body = {
    name,
    files: manifest.map((f) => ({ file: f.relPath, sha: f.sha1, size: f.size })),
    projectSettings: { framework: null },
  };
  if (target === 'production') body.target = 'production';
  const res = await vercelFetch(
    'https://api.vercel.com/v13/deployments?skipAutoDetectionConfirmation=1',
    { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) },
    token, team,
  );
  return res.json();
}

async function pollUntilReady(id, token, team, log) {
  const deadline = Date.now() + POLL_TIMEOUT_MS;
  for (;;) {
    const res = await vercelFetch(`https://api.vercel.com/v13/deployments/${id}`, {}, token, team);
    const data = await res.json();
    const state = data.readyState || data.status;
    if (state === 'READY') return data;
    if (state === 'ERROR' || state === 'CANCELED') {
      const msg = data.errorMessage || (data.error && data.error.message) || `deployment ${String(state).toLowerCase()}`;
      throw new QuickShareError(msg, 1);
    }
    if (Date.now() > deadline) {
      throw new QuickShareError(`timed out waiting for deployment to become READY (state: ${state})`, 5);
    }
    log(`deployment state: ${state}...`);
    await sleep(POLL_INTERVAL_MS);
  }
}

// Production only: the alias (stable <slug>.vercel.app URL) can lag behind
// READY by a few seconds. Poll a bit longer, bounded, so we don't hand back
// the immutable per-deployment hostname when the stable one is seconds away.
async function waitForAlias(initialData, id, token, team, log) {
  let data = initialData;
  if (data.aliasAssigned && Array.isArray(data.alias) && data.alias.length > 0) {
    return data;
  }
  const deadline = Date.now() + ALIAS_WAIT_MS;
  let logged = false;
  while (Date.now() < deadline) {
    if (!logged) {
      log('waiting for alias...');
      logged = true;
    }
    await sleep(POLL_INTERVAL_MS);
    const res = await vercelFetch(`https://api.vercel.com/v13/deployments/${id}`, {}, token, team);
    data = await res.json();
    if (data.aliasAssigned && Array.isArray(data.alias) && data.alias.length > 0) {
      return data;
    }
  }
  log('stable alias was not assigned in time; using per-deployment URL');
  return data;
}

function pickUrl(finalData, created, name) {
  const aliases = finalData.alias || created.alias || [];
  const named = aliases.filter((a) => typeof a === 'string' && a.length > 0);
  const exact = named.find((a) => a === `${name}.vercel.app`);
  if (exact) return `https://${exact}`;
  const vercelHosted = named.filter((a) => a.endsWith('.vercel.app'));
  if (vercelHosted.length > 0) {
    return `https://${vercelHosted.reduce((shortest, a) => (a.length < shortest.length ? a : shortest))}`;
  }
  if (named.length > 0) {
    return `https://${named.reduce((shortest, a) => (a.length < shortest.length ? a : shortest))}`;
  }
  const rawUrl = finalData.url || created.url;
  return `https://${rawUrl}`;
}

export async function deployStatic({ absPath, isFile, name, target, token, team, log }) {
  const start = Date.now();
  const { manifest, realFileCount } = await walkFiles(absPath, isFile);
  log(`collected ${realFileCount} file(s), ${manifest.length} manifest entr${manifest.length === 1 ? 'y' : 'ies'}`);

  const uniqueBlobs = new Map();
  for (const f of manifest) {
    if (!uniqueBlobs.has(f.sha1)) uniqueBlobs.set(f.sha1, f);
  }
  log(`uploading ${uniqueBlobs.size} unique blob(s)...`);
  await pool([...uniqueBlobs.values()], UPLOAD_CONCURRENCY, (f) => uploadBlob(f, token, team));

  await ensureProjectPublic({ name, token, team, log });
  log('creating deployment...');
  const created = await createDeployment({ name, manifest, target, token, team });
  log(`deployment ${created.id} created, polling for readiness...`);
  let finalData = await pollUntilReady(created.id, token, team, log);
  if (target === 'production') {
    finalData = await waitForAlias(finalData, created.id, token, team, log);
  }
  const url = pickUrl(finalData, created, name);
  const inspectorUrl = finalData.inspectorUrl || created.inspectorUrl || null;

  return { url, inspectorUrl, mode: 'static', fileCount: realFileCount, durationMs: Date.now() - start };
}
