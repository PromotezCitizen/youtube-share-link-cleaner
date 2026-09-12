#!/bin/sh

set -eu

project_dir=$(CDPATH= cd -- "$(dirname -- "$0")/.." && pwd)
chrome_binary="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
output_dir="${project_dir}/store-assets"
preview_dir="${project_dir}/scripts/store-assets"
preview_profile_dir=$(mktemp -d "${TMPDIR:-/tmp}/youtube-share-cleaner-assets.XXXXXX")

trap 'rm -rf "$preview_profile_dir"' EXIT

mkdir -p \
  "$preview_profile_dir/en" \
  "$preview_profile_dir/ko" \
  "$preview_profile_dir/promo"

if [ ! -x "$chrome_binary" ]; then
  printf '%s\n' "Google Chrome was not found at: $chrome_binary" >&2
  exit 1
fi

mkdir -p "$output_dir"

"$chrome_binary" \
  --headless=new \
  --user-data-dir="$preview_profile_dir/en" \
  --no-first-run \
  --disable-default-apps \
  --hide-scrollbars \
  --disable-gpu \
  --force-device-scale-factor=1 \
  --window-size=1280,800 \
  --screenshot="${output_dir}/screenshot-1.png" \
  "file://${preview_dir}/screenshot.html"

"$chrome_binary" \
  --headless=new \
  --user-data-dir="$preview_profile_dir/ko" \
  --no-first-run \
  --disable-default-apps \
  --hide-scrollbars \
  --disable-gpu \
  --force-device-scale-factor=1 \
  --window-size=1280,800 \
  --screenshot="${output_dir}/screenshot-1-ko.png" \
  "file://${preview_dir}/screenshot.ko.html"

"$chrome_binary" \
  --headless=new \
  --user-data-dir="$preview_profile_dir/promo" \
  --no-first-run \
  --disable-default-apps \
  --hide-scrollbars \
  --disable-gpu \
  --force-device-scale-factor=1 \
  --window-size=440,280 \
  --screenshot="${output_dir}/small-promo-tile.png" \
  "file://${preview_dir}/promo.html"

printf '%s\n' "${output_dir}/screenshot-1.png"
printf '%s\n' "${output_dir}/screenshot-1-ko.png"
printf '%s\n' "${output_dir}/small-promo-tile.png"
