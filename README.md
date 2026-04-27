# Mobile Preview

A lightweight phone UI wrapper around an Expo web preview.

The app does not emulate native APIs. Expo handles the runtime; this project only displays the Expo web output inside a phone-shaped frame.

## Local Development

Start your Expo web app on port `3001`, then run:

```bash
npm install
npm run dev
```

Open the wrapper at `http://localhost:3000`. It defaults to loading Expo web through `/__expo_preview/`.

To target a different local Expo web URL:

```bash
EXPO_WEB_URL="http://localhost:3002" npm run dev
```

## Docker

Build the image:

```bash
docker build -t learn_mobile-preview .
```

Run it:

```bash
docker run --rm -p 3000:3000 learn_mobile-preview
```

Open `http://localhost:3000`. The phone iframe points at `/__expo_preview/`, which the Vite server proxies to Expo web at `http://localhost:3001` by default. In Docker, that default only works when Expo is reachable from the container as `localhost:3001`.

To target a different Expo web URL:

```bash
docker run --rm -p 3000:3000 -e EXPO_WEB_URL="http://host.docker.internal:3001" learn_mobile-preview
```

Or use Docker Compose so the port mapping is stored in config:

```bash
docker compose up
```

## Container Registry

GitHub Actions publishes the image to GitHub Container Registry on pushes to `main`, `develop`, and `v*` tags:

```bash
ghcr.io/<owner>/<repo>
```

Pull requests build the image without pushing it. If the package appears private in GHCR, change the package visibility to public in the repository's package settings.
