
FROM node:20-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

FROM nginx:1.27-alpine

RUN apk add --no-cache nodejs npm

RUN npm install -g json-server@0.17.4

COPY --from=builder /app/dist /tmp/ng-dist

RUN sh -c ' \
  if [ -d /tmp/ng-dist/browser ]; then \
    cp -r /tmp/ng-dist/browser/. /usr/share/nginx/html; \
  else \
    BROWSER=$(find /tmp/ng-dist -type d -name browser | head -1); \
    if [ -n "$BROWSER" ]; then \
      cp -r "$BROWSER"/. /usr/share/nginx/html; \
    else \
      cp -r /tmp/ng-dist/. /usr/share/nginx/html; \
    fi; \
  fi; \
  rm -rf /tmp/ng-dist'

RUN mkdir -p /data
COPY data/farmacia.json /data/farmacia.json

COPY nginx.conf /etc/nginx/conf.d/default.conf

RUN printf '#!/bin/sh\njson-server --watch /data/farmacia.json --port 3000 --host 127.0.0.1 &\nnginx -g "daemon off;"\n' > /docker-entrypoint.sh \
  && chmod +x /docker-entrypoint.sh

EXPOSE 80

CMD ["/docker-entrypoint.sh"]