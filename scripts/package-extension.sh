#!/bin/sh

set -eu

project_dir=$(CDPATH= cd -- "$(dirname -- "$0")/.." && pwd)
version=$(node -p "require('${project_dir}/manifest.json').version")
output_dir="${project_dir}/dist"
package_name="youtube-share-link-cleaner-v${version}.zip"
output_path="${output_dir}/${package_name}"

mkdir -p "$output_dir"
rm -f "$output_path"

cd "$project_dir"
zip -q -r "$output_path" \
  manifest.json \
  content.js \
  state-bridge.js \
  sanitize-url.js \
  popup \
  _locales \
  icons/icon-16.png \
  icons/icon-32.png \
  icons/icon-48.png \
  icons/icon-128.png

printf '%s\n' "$output_path"
