---
name: debtap-deb-to-arch
version: 1.0.0
description: |
  Convert a vendor .deb package to a pacman package with debtap and install it on
  Arch/Manjaro, wiring up a user-level CLI command and desktop launcher.
  Use when asked to "install X via debtap", "convert this deb", "build 1password
  from the deb", or to install any .deb-only app (1Password, TeamViewer, Proton,
  Chrome...) on a pacman-based system.
allowed-tools:
  - Bash
  - Read
---

## What this does

Wraps the full deb→pacman pipeline in one script:

```bash
~/.claude/skills/debtap-deb-to-arch/bin/deb-to-arch.sh --1password        # 1Password end-to-end
~/.claude/skills/debtap-deb-to-arch/bin/deb-to-arch.sh <app.deb> [bin]    # any deb
```

The script: downloads the deb (1Password only), runs `debtap -q`, installs the
resulting `.pkg.tar.zst` via `sudo pacman -U`, extracts the packaged
`.desktop` entry into `~/.local/share/applications/` and `~/Desktop/`, and
symlinks the real binary into `~/.local/bin/` for CLI use.

## Prerequisites (once per machine)

- `debtap` from the AUR (`pamac build debtap` / `yay -S debtap`).
- After installing debtap the first time, update its databases once:
  `debtap -u` (needs network; only required initially or when it fails to map deps).

## Procedure

1. Confirm debtap exists (`command -v debtap`); if conversions produce wrong
   dependency mappings or fail, run `debtap -u` and retry.
2. Run the script. `debtap -q` may still print one interactive editor prompt —
   it is safe to press any key; if run non-interactively it times out and
   continues with defaults (exit code stays 0).
3. The `sudo pacman -U` step needs a password. If the harness has no cached
   sudo credentials, tell the user to run it in a terminal:
   `sudo pacman -U ~/Downloads/<name>-*.pkg.tar.zst`
4. Verify afterwards:
   - CLI: `~/.local/bin/<bin> --version` or `command -v <bin>`
   - Desktop: `ls ~/.local/share/applications/<name>.desktop ~/Desktop/`
5. Debian `postinst` hooks do NOT run under debtap. The deb's `/usr/bin`
   symlinks, sandbox polkit rules, or browser-extension policy files may be
   missing — that is why the script creates the CLI symlink and desktop entry
   itself at user level.

## 1Password specifics

- Deb URL baked into the script:
  `https://downloads.1password.com/linux/x86_64/1password-latest.amd64.deb`
- Binary lands in `/opt/1Password/1password`; desktop file is
  `usr/share/applications/1password.desktop`; CLI is
  `~/.local/bin/1password` (the deb does not ship a `usr/bin` symlink).
- The `op` CLI (1Password command-line) is a SEPARATE tool — install it from
  the AUR (`1password-cli`) or its own zip, not from this deb.

## Updating later

Re-run with `--1password`; the script re-downloads the latest deb, rebuilds,
and `pacman -U` upgrades in place. Alternatively refresh the deb manually and
pass its path.

## Notes

- Built packages stay in `~/Downloads` — safe to delete after install.
- Uninstall with `pacman -R <pkgname>`; also remove the user-level symlink and
  desktop files listed above.
- debtap dependency names are best-effort translations of Debian package names;
  if `pacman -U` reports unresolvable deps, read the mapped name and install
  the Arch equivalent first, then retry (or add to `STALE_DEPS`, see below).
- debtap maps Debian `libgtk-3-0` to the stale Arch name `gtk` (the real dep
  `gtk3` is mapped separately). The script detects known stale names (`STALE_DEPS`
  at the top) and repacks the package with them dropped before installing. If a
  NEW unresolvable dep appears, add it to `STALE_DEPS` only after confirming the
  real Arch package providing it is already installed.
