import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import type { IncomingMessage, ServerResponse } from "node:http";

const expoWebUrl = process.env.EXPO_WEB_URL || "http://localhost:3001";
const healthResponse = JSON.stringify({ status: "ok" });

const expoProxy = {
  target: expoWebUrl,
  changeOrigin: true,
  ws: true,
};

function handleHealthRequest(
  req: IncomingMessage,
  res: ServerResponse,
  next: () => void,
) {
  if (req.url !== "/health") {
    next();
    return;
  }

  res.statusCode = 200;
  res.setHeader("Content-Type", "application/json");
  res.end(healthResponse);
}

export default defineConfig({
  base: "/__mobile_preview_assets/",
  plugins: [
    react(),
    {
      name: "health-endpoint",
      configureServer(server) {
        server.middlewares.use(handleHealthRequest);
      },
      configurePreviewServer(server) {
        server.middlewares.use(handleHealthRequest);
      },
    },
  ],
  server: {
    host: "0.0.0.0",
    port: 3000,
    proxy: {
      "/__expo_preview": {
        ...expoProxy,
        rewrite: (path) => path.replace(/^\/__expo_preview/, "") || "/",
      },
      "/node_modules": expoProxy,
      "/assets": expoProxy,
      "/static": expoProxy,
      "/_expo": expoProxy,
      "/index.bundle": expoProxy,
      "/favicon.ico": expoProxy,
      "/manifest.json": expoProxy,
    },
    allowedHosts: true,
  },
  preview: {
    port: 3000,
  },
});
