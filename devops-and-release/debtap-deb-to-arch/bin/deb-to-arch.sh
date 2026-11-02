#!/usr/bin/env bash
# deb-to-arch: convert a .deb to a pacman package with debtap, install it,
# and wire up a user-level CLI command + desktop launcher.
#
# Usage:
#   deb-to-arch.sh <path/to/package.deb> [binary-name]
#   deb-to-arch.sh --1password            # fetch the latest 1Password deb first
#
# Steps:
#   1. debtap -q <deb>            -> <name>-<version>-1-x86_64.pkg.tar.zst
#   2. sudo pacman -U <pkg>       -> install (asks for sudo password)
#   3. Extract desktop entry from the package -> ~/.local/share/applications/
#      and ~/Desktop/ (user-level, no root needed)
#   4. Symlink /opt/<Vendor>/<binary> (fallback: scan package for the real
#      executable) into ~/.local/bin/ for CLI access
set -euo pipefail

OP_DEB_URL="https://downloads.1password.com/linux/x86_64/1password-latest.amd64.deb"
DEB=""
BINNAME=""

if [[ "${1:-}" == "--1password" ]]; then
    DEB="$HOME/Downloads/1password-latest.deb"
    BINNAME="1password"
    if [[ ! -f "$DEB" ]]; then
        echo "==> Downloading latest 1Password deb to $DEB"
        curl -fL --output "$DEB" "$OP_DEB_URL"
    fi
    shift
else
    DEB="${1:?usage: deb-to-arch.sh <package.deb> [binary-name] | --1password}"
    BINNAME="${2:-}"
fi

DEB="$(realpath "$DEB")"
DIR="$(dirname "$DEB")"
cd "$DIR"

command -v debtap >/dev/null || { echo "ERROR: debtap not installed (AUR: debtap)"; exit 1; }
command -v bsdtar >/dev/null || { echo "ERROR: bsdtar (libarchive) not installed"; exit 1; }

echo "==> Converting $(basename "$DEB") (this can take a few minutes)"
debtap -q "$DEB"

PKG="$(ls -t "$DIR"/*.pkg.tar.zst | head -1)"
echo "==> Built: $(basename "$PKG")"

# debtap maps Debian package names to best-effort Arch names; some are stale
# (e.g. libgtk-3-0 -> "gtk", which no longer exists — the real dep "gtk3" is
# mapped separately). Drop the stale ones and repack before installing.
STALE_DEPS="gtk"
if bsdtar -xOf "$PKG" .PKGINFO 2>/dev/null | grep -qxE "^depend = ($(echo "$STALE_DEPS" | tr ' ' '|'))\$"; then
    echo "==> Dropping stale dependency/dependencies and repacking"
    REPACK_DIR="$(mktemp -d)"
    (cd "$REPACK_DIR" \
        && bsdtar -xf "$PKG" \
        && sed -i -E "\#^depend = ($(echo "$STALE_DEPS" | tr ' ' '|'))\$#d" .PKGINFO \
        && TOP_DIRS="$(ls -d opt usr etc lib bin sbin 2>/dev/null || true)" \
        && META="$(ls -d .PKGINFO .INSTALL .MTREE 2>/dev/null)" \
        && bsdtar --uid 0 --gid 0 -cf - $META $TOP_DIRS \
        | zstd -q -f -T0 -o "$PKG") \
        || { echo "ERROR: repack failed"; exit 1; }
    rm -rf "$REPACK_DIR"
    # sanity: same entry count as debtap produced, no duplicate paths
    [[ "$(tar -tf "$PKG" | wc -l)" -gt 3 ]] || { echo "ERROR: repacked package too small"; exit 1; }
    [[ -z "$(tar -tf "$PKG" | sort | uniq -d)" ]] || { echo "ERROR: repacked package has duplicate entries"; exit 1; }
    pacman -Qp "$PKG" >/dev/null || { echo "ERROR: repacked package unreadable"; exit 1; }
fi


echo "==> Installing with pacman (sudo required)"
sudo pacman -U --noconfirm "$PKG"

# --- user-level desktop entry (no root) ---
DESKTOP_FILE="$(tar -tf "$PKG" | grep -m1 '^usr/share/applications/.*\.desktop$' || true)"
if [[ -n "$DESKTOP_FILE" ]]; then
    mkdir -p ~/.local/share/applications
    tar -xOf "$PKG" "$DESKTOP_FILE" > ~/.local/share/applications/"$(basename "$DESKTOP_FILE")"
    [[ -d ~/Desktop ]] && tar -xOf "$PKG" "$DESKTOP_FILE" > ~/Desktop/"$(basename "$DESKTOP_FILE")" \
        && chmod +x ~/Desktop/"$(basename "$DESKTOP_FILE")"
    update-desktop-database ~/.local/share/applications 2>/dev/null || true
    echo "==> Desktop entry: ~/.local/share/applications/$(basename "$DESKTOP_FILE") (+ ~/Desktop)"
else
    echo "!! No .desktop entry found in package"
fi

# --- user-level CLI symlink (no root) ---
mkdir -p ~/.local/bin
TARGET=""
if [[ -n "$BINNAME" ]]; then
    # prefer /opt/<Vendor>/<bin>, then /usr/bin/<bin>, then /opt/*/<bin>
    for cand in "/opt/"*"/$BINNAME" "/opt/$BINNAME" "/usr/bin/$BINNAME"; do
        [[ -x "$cand" ]] && TARGET="$cand" && break
    done
fi
if [[ -z "$TARGET" ]]; then
    echo "!! Could not locate binary '$BINNAME' — create ~/.local/bin symlink manually"
else
    ln -sf "$TARGET" ~/.local/bin/"$BINNAME"
    echo "==> CLI: ~/.local/bin/$BINNAME -> $TARGET"
fi

echo "==> Done. Remove the built package with: pacman -R <name>"
