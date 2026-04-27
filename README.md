# Mobile Preview

A lightweight phone UI wrapper around an Expo web preview.

The app does not emulate native APIs. Expo handles the runtime; this project only displays the Expo web output inside a phone-shaped frame.

## Local Development

Start your Expo web app on port `3000`, then run:

```bash
npm install
npm run dev
```

Open the wrapper at `http://localhost:5173`. It defaults to loading `http://localhost:3000`.

## Docker

Build the image:

```bash
docker build -t learn_mobile-preview .
```

Run it:

```bash
docker run --rm -p 8080:80 learn_mobile-preview
```

Open `http://localhost:8080`. The phone iframe will point at `http://localhost:3000` by default.

To target a different Expo web URL:

```bash
docker run --rm -p 8080:80 -e PREVIEW_URL="http://localhost:3000" learn_mobile-preview
```

## Container Registry

GitHub Actions publishes the image to GitHub Container Registry on pushes to `main`, `develop`, and `v*` tags:

```bash
ghcr.io/<owner>/<repo>
```

Pull requests build the image without pushing it. If the package appears private in GHCR, change the package visibility to public in the repository's package settings.
