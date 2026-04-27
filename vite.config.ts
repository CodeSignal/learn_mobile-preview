import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

const expoWebUrl = process.env.EXPO_WEB_URL || "http://localhost:3001";

const expoProxy = {
  target: expoWebUrl,
  changeOrigin: true,
  ws: true,
};

export default defineConfig({
  base: "/__mobile_preview_assets/",
  plugins: [react()],
  server: {
    port: 8080,
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
    port: 8080,
  },
});
