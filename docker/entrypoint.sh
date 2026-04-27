#!/bin/sh
set -eu

: "${PREVIEW_URL:=/__expo_preview/}"
: "${EXPO_WEB_URL:=http://localhost:3001}"
export PREVIEW_URL EXPO_WEB_URL

envsubst '${EXPO_WEB_URL}' \
  < /etc/nginx/conf.d/default.conf.template \
  > /etc/nginx/conf.d/default.conf

envsubst '${PREVIEW_URL}' \
  < /usr/share/nginx/html/config.template.js \
  > /usr/share/nginx/html/config.js

exec nginx -g 'daemon off;'
