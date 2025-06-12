#!/bin/bash

API_DIR="static/api"
OUTPUT_FILE="static/api/specs.csv"
BASE_URL="https://developers.fiks.ks.no/api"

TMP_FILE=$(mktemp)

for file in "$API_DIR"/*.json; do
  filename=$(basename "$file")

  if raw_title=$(jq -r '.info.title // empty' "$file"); then
    if [[ -n "$raw_title" ]]; then
      # Fjern komma og trim whitespace
      clean_title=$(echo "$raw_title" | sed 's/,//g' | xargs)
      echo "$clean_title,$BASE_URL/$filename" >> "$TMP_FILE"
    else
      echo "⚠️  Mangler info.title i $file" >&2
    fi
  else
    echo "⚠️  $file er ikke gyldig JSON" >&2
  fi
done

# Sorter alfabetisk og skriv til output
sort "$TMP_FILE" > "$OUTPUT_FILE"
rm "$TMP_FILE"

echo "✅ CSV generert (uten komma og fnutter): $OUTPUT_FILE"

