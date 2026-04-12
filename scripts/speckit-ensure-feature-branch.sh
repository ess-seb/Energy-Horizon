#!/usr/bin/env bash
# Create or switch to a git branch matching the active feature from .specify/feature.json.
# Spec Kit resolves FEATURE_DIR from feature.json even on main; other scripts still expect
# a feature-shaped branch (NNN-name or timestamp-name). Run after /speckit.specify.
#
# Usage: ./scripts/speckit-ensure-feature-branch.sh
# Env: SPECIFY_FEATURE_JSON (optional) path to feature.json, default: .specify/feature.json
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
FEATURE_JSON="${SPECIFY_FEATURE_JSON:-$ROOT/.specify/feature.json}"

if [[ ! -f "$FEATURE_JSON" ]]; then
  echo "speckit-ensure-feature-branch: missing $FEATURE_JSON (run /speckit.specify first)" >&2
  exit 1
fi

if ! command -v git >/dev/null 2>&1 || [[ ! -e "$ROOT/.git" ]]; then
  echo "speckit-ensure-feature-branch: not a git repo; skipping" >&2
  exit 0
fi

_feature_dir=""
if command -v jq >/dev/null 2>&1; then
  _feature_dir=$(jq -r '.feature_directory // empty' "$FEATURE_JSON" 2>/dev/null || true)
elif command -v python3 >/dev/null 2>&1; then
  _feature_dir=$(python3 -c "import json,sys; d=json.load(open(sys.argv[1])); print(d.get('feature_directory',''))" "$FEATURE_JSON" 2>/dev/null || true)
else
  echo "speckit-ensure-feature-branch: need jq or python3 to read feature.json" >&2
  exit 1
fi

if [[ -z "$_feature_dir" ]]; then
  echo "speckit-ensure-feature-branch: feature.json has no feature_directory" >&2
  exit 1
fi

# Basename: specs/006-foo -> 006-foo
_branch=$(basename "$_feature_dir")
_branch="${_branch%/}"

# Match Spec Kit: 3+ digit prefix-slug or YYYYMMDD-HHMMSS-slug
if [[ ! "$_branch" =~ ^([0-9]{3,}-|[0-9]{8}-[0-9]{6}-).+ ]]; then
  echo "speckit-ensure-feature-branch: directory name '$_branch' is not a valid feature branch slug" >&2
  exit 1
fi

cd "$ROOT"
current=$(git rev-parse --abbrev-ref HEAD 2>/dev/null || echo "")
if [[ "$current" == "$_branch" ]]; then
  echo "speckit-ensure-feature-branch: already on $_branch"
  exit 0
fi

if git show-ref --verify --quiet "refs/heads/$_branch"; then
  git switch "$_branch"
  echo "speckit-ensure-feature-branch: switched to existing branch $_branch"
  exit 0
fi

git switch -c "$_branch"
echo "speckit-ensure-feature-branch: created and switched to branch $_branch"
