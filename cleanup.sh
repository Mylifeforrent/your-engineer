#!/usr/bin/env bash
#
# cleanup.sh — one-off tidy-up for the AI Engineering Copilot project.
#
# What it does:
#   1. Removes the misplaced duplicate skill file .claude/skills/SKILL.md
#      (a stray copy of backend-patterns; a bare SKILL.md with no folder is
#      not a valid skill and can confuse skill discovery).
#   2. Removes the demo change file docs/changes/2026-07-05-login-captcha.md
#      (an unrelated example; keeps docs/changes/TEMPLATE.md).
#   3. Adds .claude/settings.local.json to .gitignore (so personal local
#      overrides never get committed), creating .gitignore if needed.
#   4. Stages the changes and, if this is a git repo with staged changes,
#      makes a single commit.
#
# Safe to run more than once (idempotent). Run it from your PROJECT ROOT.

set -euo pipefail

# --- 0) sanity: are we in the project root? -------------------------------
if [ ! -f CLAUDE.md ] || [ ! -d .claude ]; then
  echo "ERROR: run this from your project root (where CLAUDE.md and .claude/ live)." >&2
  exit 1
fi

# Detect whether we're inside a git work tree.
IS_GIT=0
if git rev-parse --is-inside-work-tree >/dev/null 2>&1; then
  IS_GIT=1
fi

# Helper: remove a path from disk (and git index if tracked).
remove_path() {
  local path="$1"
  if [ ! -e "$path" ]; then
    echo "  skip (already gone): $path"
    return 0
  fi
  if [ "$IS_GIT" -eq 1 ] && git ls-files --error-unmatch "$path" >/dev/null 2>&1; then
    git rm -q "$path"
    echo "  git rm: $path"
  else
    rm -f "$path"
    echo "  rm:     $path"
  fi
}

echo "1) Removing misplaced duplicate skill file..."
remove_path ".claude/skills/SKILL.md"

echo "2) Removing demo change file..."
remove_path "docs/changes/2026-07-05-login-captcha.md"

echo "3) Ensuring .gitignore ignores personal local overrides..."
LINE=".claude/settings.local.json"
if [ -f .gitignore ] && grep -qxF "$LINE" .gitignore; then
  echo "  already present in .gitignore"
else
  # Add a blank line + comment only if the file exists and isn't empty.
  if [ -s .gitignore ]; then printf '\n' >> .gitignore; fi
  {
    echo "# Commit shared Claude Code config, but ignore personal local overrides"
    echo "$LINE"
  } >> .gitignore
  echo "  added to .gitignore"
  [ "$IS_GIT" -eq 1 ] && git add .gitignore
fi

# --- 4) commit if there is anything staged --------------------------------
if [ "$IS_GIT" -eq 1 ]; then
  if ! git diff --cached --quiet; then
    git commit -q -m "chore: tidy Claude Code config (drop stray skill + demo change, ignore local settings)"
    echo "4) Committed the cleanup."
  else
    echo "4) Nothing to commit (already clean)."
  fi
else
  echo "4) Not a git repo — files changed on disk only, nothing committed."
fi

echo
echo "Done. Your skills are now: $(ls -d .claude/skills/*/ 2>/dev/null | wc -l | tr -d ' ') (each in its own folder)."
