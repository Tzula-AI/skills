// CLI entrypoint: arg parsing, token resolution, mode dispatch, output
// formatting, and exit-code mapping.

import { spawn } from 'node:child_process';
import { readFile, stat } from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import { QuickShareError } from './api.mjs';
import { deployBuild } from './deploy-build.mjs';
import { deployStatic } from './deploy-static.mjs';
import { detectMode, sanitizeName } from './detect.mjs';

const USAGE = `Usage: quick-share [PATH] [options]

Deploys a local directory (or a single .html file) to Vercel and prints the
live URL. PATH defaults to the current directory.

Options:
  --name <slug>     Vercel project name. Default: sanitized basename of PATH.
  --preview         Deploy as a preview instead of production (default).
  --token <tok>     Override token (else $VERCEL_TOKEN, else ~/.quick-share/token).
  --team <id|slug>  Vercel team/scope id (appended as ?teamId=).
  --force-static    Skip detection, use the REST static deploy path.
  --force-build     Skip detection, use the Vercel CLI build path.
  --json            Emit a single JSON object on stdout instead of human text.
  --open            After success, best-effort open the URL.
  -h, --help        Show this help text.
`;

function requireValue(argv, i, flag) {
  const v = argv[i];
  if (v === undefined) throw new QuickShareError(`missing value for ${flag}`, 2);
  return v;
}

function parseArgs(argv) {
  const opts = {
    path: null, name: null, preview: false, token: null, team: null,
    forceStatic: false, forceBuild: false, json: false, open: false, help: false,
  };
  const positionals = [];
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    switch (a) {
      case '-h': case '--help': opts.help = true; break;
      case '--preview': opts.preview = true; break;
      case '--force-static': opts.forceStatic = true; break;
      case '--force-build': opts.forceBuild = true; break;
      case '--json': opts.json = true; break;
      case '--open': opts.open = true; break;
      case '--name': opts.name = requireValue(argv, ++i, '--name'); break;
      case '--token': opts.token = requireValue(argv, ++i, '--token'); break;
      case '--team': opts.team = requireValue(argv, ++i, '--team'); break;
      default:
        if (a.startsWith('--')) throw new QuickShareError(`unknown option: ${a}`, 2);
        positionals.push(a);
    }
  }
  if (positionals.length > 1) {
    throw new QuickShareError(`unexpected extra argument: ${positionals[1]}`, 2);
  }
  if (opts.forceStatic && opts.forceBuild) {
    throw new QuickShareError('--force-static and --force-build are mutually exclusive', 2);
  }
  opts.path = positionals[0] || '.';
  return opts;
}

async function resolveToken(cliToken) {
  if (cliToken) return cliToken;
  if (process.env.VERCEL_TOKEN) return process.env.VERCEL_TOKEN;
  try {
    const raw = await readFile(path.join(os.homedir(), '.quick-share', 'token'), 'utf8');
    const tok = raw.trim();
    if (tok) return tok;
  } catch {
    // fall through to error below
  }
  throw new QuickShareError('no Vercel token. Set VERCEL_TOKEN or write ~/.quick-share/token', 3);
}

function bestEffortOpen(url) {
  try {
    const child = spawn('xdg-open', [url], { stdio: 'ignore', detached: true });
    child.on('error', () => {});
    child.unref();
  } catch {
    // best-effort only
  }
}

// Vercel assigns the alias a beat before every edge node serves it, so a URL
// printed the instant a deployment goes READY can 404 for ~a second. Probe until
// it actually serves, bounded — the URL is this tool's entire output, it should
// work the moment the user clicks it.
async function waitServing(url, log) {
  const deadline = Date.now() + 10000;
  let warned = false;
  for (;;) {
    try {
      const res = await fetch(url, { method: 'GET', redirect: 'manual' });
      if (res.body) res.body.cancel().catch(() => {});
      if (res.status < 400) return;
    } catch {
      // network hiccup; treat as not-yet-serving
    }
    if (Date.now() >= deadline) {
      log('warning: URL is not serving yet; it may need a few more seconds');
      return;
    }
    if (!warned) {
      warned = true;
      log('waiting for the URL to serve...');
    }
    await new Promise((r) => setTimeout(r, 700));
  }
}

export async function main(argv) {
  let opts;
  try {
    opts = parseArgs(argv);
  } catch (err) {
    if (err instanceof QuickShareError) {
      process.stderr.write(`quick-share: ${err.message}\n`);
      return err.exitCode;
    }
    throw err;
  }

  if (opts.help) {
    process.stdout.write(USAGE);
    return 0;
  }

  const log = (msg) => process.stderr.write(`quick-share: ${msg}\n`);

  try {
    const absPath = path.resolve(process.cwd(), opts.path);
    let st;
    try {
      st = await stat(absPath);
    } catch {
      throw new QuickShareError(`path not found: ${opts.path}`, 4);
    }
    const isFile = st.isFile();
    if (!isFile && !st.isDirectory()) {
      throw new QuickShareError(`path is neither a file nor a directory: ${opts.path}`, 4);
    }

    const token = await resolveToken(opts.token);
    const team = opts.team || process.env.VERCEL_TEAM_ID || null;
    const target = opts.preview ? 'preview' : 'production';
    const name = sanitizeName(opts.name || path.basename(absPath));

    let mode;
    if (opts.forceStatic) mode = 'static';
    else if (opts.forceBuild) mode = 'build';
    else mode = await detectMode(absPath, isFile);
    log(`mode: ${mode}, target: ${target}, name: ${name}`);

    const deployFn = mode === 'build' ? deployBuild : deployStatic;
    const result = await deployFn({ absPath, isFile, name, target, token, team, log });

    await waitServing(result.url, log);

    log(`done in ${result.durationMs}ms`);
    if (opts.open) bestEffortOpen(result.url);

    if (opts.json) {
      process.stdout.write(`${JSON.stringify({
        url: result.url,
        inspectorUrl: result.inspectorUrl ?? null,
        name,
        mode: result.mode,
        fileCount: result.fileCount,
        durationMs: result.durationMs,
        target,
      })}\n`);
    } else {
      process.stdout.write(`URL: ${result.url}\n`);
    }
    return 0;
  } catch (err) {
    if (err instanceof QuickShareError) {
      process.stderr.write(`quick-share: ${err.message}\n`);
      return err.exitCode;
    }
    process.stderr.write(`quick-share: ${err && err.message ? err.message : String(err)}\n`);
    return 1;
  }
}
