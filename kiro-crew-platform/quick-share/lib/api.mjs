// Thin fetch wrapper for the Vercel REST API: auth header, ?teamId=, retry
// with backoff on network errors / 429 / 5xx, and 401/403 -> auth error.

export class QuickShareError extends Error {
  constructor(message, exitCode) {
    super(message);
    this.name = 'QuickShareError';
    this.exitCode = exitCode;
  }
}

const MAX_ATTEMPTS = 3;

export function appendTeam(url, team) {
  if (!team) return url;
  const sep = url.includes('?') ? '&' : '?';
  return `${url}${sep}teamId=${encodeURIComponent(team)}`;
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function extractMessage(res) {
  try {
    const data = await res.clone().json();
    if (data && data.error && data.error.message) return data.error.message;
    if (data && data.message) return data.message;
  } catch {
    // not JSON; fall through to text/status
  }
  try {
    const text = await res.text();
    if (text) return text.slice(0, 500);
  } catch {
    // ignore
  }
  return res.statusText || String(res.status);
}

function discard(res) {
  if (res && res.body && typeof res.body.cancel === 'function') {
    res.body.cancel().catch(() => {});
  }
}

// Performs an authenticated Vercel API request, retrying transient failures.
// `options` is a standard fetch RequestInit (method/headers/body).
export async function vercelFetch(url, options, token, team) {
  const finalUrl = appendTeam(url, team);
  const headers = { Authorization: `Bearer ${token}`, ...(options && options.headers) };
  const init = { ...options, headers };

  let lastErr = null;
  for (let attempt = 0; attempt < MAX_ATTEMPTS; attempt++) {
    let res;
    try {
      res = await fetch(finalUrl, init);
    } catch (err) {
      lastErr = err;
      if (attempt < MAX_ATTEMPTS - 1) {
        await sleep(500 * 2 ** attempt);
        continue;
      }
      throw new QuickShareError(`network error contacting Vercel: ${err.message}`, 1);
    }

    if (res.status === 429 || res.status >= 500) {
      if (attempt < MAX_ATTEMPTS - 1) {
        discard(res);
        await sleep(500 * 2 ** attempt);
        continue;
      }
      throw new QuickShareError(`Vercel API error ${res.status}: ${await extractMessage(res)}`, 1);
    }

    if (res.status === 401) {
      discard(res);
      throw new QuickShareError('token rejected by Vercel (401)', 3);
    }

    if (res.status === 403) {
      throw new QuickShareError(`Vercel API error 403: ${await extractMessage(res)}`, 3);
    }

    return res;
  }

  throw new QuickShareError(`network error contacting Vercel: ${lastErr ? lastErr.message : 'unknown'}`, 1);
}
