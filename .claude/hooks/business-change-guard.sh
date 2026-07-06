#!/usr/bin/env bash
#
# business-change-guard.sh
# PreToolUse hook. Fires before Edit / Write / MultiEdit.
#
# Purpose:
#   1. Detect whether the file being edited is SOURCE CODE (not docs).
#   2. If it is source code, check that there is an ACTIVE change file in
#      docs/changes/ whose pipeline is complete up to "Project management".
#   3. If the pipeline is not complete, block the edit (exit code 2) and tell
#      Claude to run the business-change-workflow skill first.
#
# Notes:
#   - Editing files under docs/ is always allowed (that IS the workflow).
#   - "Active change" is signalled by an env file: docs/changes/.active
#     containing the slug of the change currently being worked on.
#     The business-change-workflow skill / pm-agent writes this file.
#   - This is a guard, not a classifier of intent. It errs on the side of
#     asking the human to be explicit.
#
# Exit codes:
#   0  -> allow the tool call
#   2  -> block the tool call; stderr is shown back to Claude so it can react

set -euo pipefail

PROJECT_DIR="${CLAUDE_PROJECT_DIR:-$(pwd)}"
CHANGES_DIR="$PROJECT_DIR/docs/changes"
ACTIVE_FILE="$CHANGES_DIR/.active"

# Read the tool input JSON from stdin.
INPUT="$(cat)"

# Extract the target file path (works for Edit/Write/MultiEdit).
FILE_PATH="$(printf '%s' "$INPUT" | jq -r '.tool_input.file_path // .tool_input.path // empty')"

# If we can't tell what file it is, don't block.
if [ -z "$FILE_PATH" ]; then
  exit 0
fi

# Normalise to a path relative to the project when possible.
REL_PATH="${FILE_PATH#"$PROJECT_DIR"/}"

# 1) Always allow edits inside docs/ — that's how the workflow gets done.
case "$REL_PATH" in
  docs/*|*/docs/*)
    exit 0
    ;;
esac

# 2) Allow common non-source files that are not business logic.
case "$REL_PATH" in
  *.md|*.txt|*.json|*.lock|*.yml|*.yaml|*.gitignore|README*|LICENSE*)
    # These are usually config/metadata; adjust to your project if needed.
    # If your business rules live in YAML/JSON, remove those from this list.
    exit 0
    ;;
esac

# 3) This looks like source code. Require an active, complete change pipeline.
if [ ! -f "$ACTIVE_FILE" ]; then
  cat >&2 <<'EOF'
[business-change-guard] BLOCKED: no active change is registered.

You are about to edit source code, but there is no active business change.
If this edit is part of a business-rule change, run the
"business-change-workflow" skill first: it will create a change file under
docs/changes/, walk the product -> prototype -> architecture -> frontend ->
backend -> devops -> project-management pipeline (with human confirmation at
each stage), and only then register the change as active.

If this is a trivial, non-business change (typo, comment, formatting), the
human can create docs/changes/.active with the value "trivial" to bypass this
guard for the current change.
EOF
  exit 2
fi

ACTIVE_SLUG="$(tr -d '[:space:]' < "$ACTIVE_FILE")"

# Escape hatch for explicitly-declared trivial changes.
if [ "$ACTIVE_SLUG" = "trivial" ]; then
  exit 0
fi

CHANGE_FILE="$CHANGES_DIR/$ACTIVE_SLUG.md"
if [ ! -f "$CHANGE_FILE" ]; then
  # Try to find by suffix if the .active file only holds a partial slug.
  CHANGE_FILE="$(ls "$CHANGES_DIR"/*"$ACTIVE_SLUG"*.md 2>/dev/null | head -n1 || true)"
fi

if [ -z "${CHANGE_FILE:-}" ] || [ ! -f "$CHANGE_FILE" ]; then
  cat >&2 <<EOF
[business-change-guard] BLOCKED: active change "$ACTIVE_SLUG" has no change file.

Expected docs/changes/$ACTIVE_SLUG.md but it was not found. Run the
business-change-workflow skill to (re)create it before editing code.
EOF
  exit 2
fi

# 4) Check the pipeline is complete up to "Project management".
# In the change file, incomplete stages look like "- [ ] <Stage>".
# A stage that is "N/A" or "[x]" is considered satisfied.
# We block if any of the required stages before implementation is unchecked.
REQUIRED_STAGES="Product|Prototype|Architecture|Frontend|Backend|DevOps|Project management"

UNCHECKED="$(grep -E "^- \[ \] +($REQUIRED_STAGES)" "$CHANGE_FILE" || true)"

if [ -n "$UNCHECKED" ]; then
  {
    echo "[business-change-guard] BLOCKED: the documentation pipeline for"
    echo "change \"$ACTIVE_SLUG\" is not complete. Outstanding stages:"
    echo
    printf '%s\n' "$UNCHECKED" | sed 's/^- \[ \] */  - /'
    echo
    echo "Finish and get human confirmation for each stage (or mark it N/A"
    echo "explicitly) in $CHANGE_FILE before editing source code. Use the"
    echo "business-change-workflow skill to proceed stage by stage."
  } >&2
  exit 2
fi

# Pipeline complete -> allow the edit.
exit 0
