#!/bin/sh
set -eu

: "${PREVIEW_URL:=http://localhost:3000}"

envsubst '${PREVIEW_URL}' \
  < /usr/share/nginx/html/config.template.js \
  > /usr/share/nginx/html/config.js

exec nginx -g 'daemon off;'
