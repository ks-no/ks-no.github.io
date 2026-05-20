#!/usr/bin/env bash
# Run Hugo via Docker with the pinned version.
# Usage:
#   ./hugo.sh server        - start dev server
#   ./hugo.sh               - build site
#   ./hugo.sh <any args>    - passed directly to hugo

HUGO_VERSION="0.141.0"
IMAGE="hugomods/hugo:exts-${HUGO_VERSION}"

# Use -it only if running in a terminal
TTY_FLAG=""
if [ -t 0 ]; then
  TTY_FLAG="-it"
fi

# When serving, bind to 0.0.0.0 so it's accessible from the host
EXTRA_ARGS=""
if [[ "${1:-}" == "serve" || "${1:-}" == "server" ]]; then
  EXTRA_ARGS="--bind 0.0.0.0"
fi

docker run --rm $TTY_FLAG \
  -v "$(pwd):/src" \
  -p 1313:1313 \
  "$IMAGE" \
  hugo "$@" $EXTRA_ARGS
