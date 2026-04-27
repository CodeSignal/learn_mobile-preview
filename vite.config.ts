import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

const expoWebUrl = process.env.EXPO_WEB_URL || "http://localhost:3001";

export default defineConfig({
  base: "/__mobile_preview_assets/",
  plugins: [react()],
  server: {
    port: 3000,
    proxy: {
      "/__expo_preview": {
        target: expoWebUrl,
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/__expo_preview/, "") || "/",
        ws: true,
      },
    },
    allowedHosts: true,
  },
  preview: {
    port: 3000,
  },
});
