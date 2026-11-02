// Project provisioning: create the Vercel project if needed (CLI's
// `--project <name>` only targets, it does not create) and best-effort
// disable Deployment Protection, since every project this token creates
// gets SSO protection on by default. That protection redirects every
// per-deployment hostname (i.e. every `--preview` URL) to Vercel's SSO
// gate, which defeats the point of sharing a link.

import { QuickShareError, vercelFetch } from './api.mjs';

function discard(res) {
  if (res && res.body && typeof res.body.cancel === 'function') {
    res.body.cancel().catch(() => {});
  }
}

async function createProject(name, token, team) {
  const res = await vercelFetch(
    'https://api.vercel.com/v11/projects',
    { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ name }) },
    token, team,
  );
  let data = null;
  try {
    data = await res.json();
  } catch {
    // non-JSON body; fall through to status-based handling below
  }
  if (res.ok) return;
  const code = data && data.error && data.error.code;
  if (res.status === 409 || code === 'conflict' || code === 'project_already_exists') return;
  const msg = (data && data.error && data.error.message) || res.statusText || String(res.status);
  throw new QuickShareError(`failed to create Vercel project "${name}": ${msg}`, 1);
}

async function disableProtection(name, token, team) {
  const res = await vercelFetch(
    `https://api.vercel.com/v9/projects/${encodeURIComponent(name)}`,
    {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ssoProtection: null, passwordProtection: null }),
    },
    token, team,
  );
  discard(res);
}

// Ensures the project exists and is publicly viewable. Creation is required
// (throws on real failure); disabling protection is best-effort (a failure
// here only degrades to "recipient needs Vercel auth", it must never fail
// the deploy itself).
export async function ensureProjectPublic({ name, token, team, log }) {
  await createProject(name, token, team);
  try {
    await disableProtection(name, token, team);
  } catch {
    log('warning: could not disable deployment protection; the link may require Vercel auth');
    return;
  }
  log(`project "${name}" ready and public`);
}
