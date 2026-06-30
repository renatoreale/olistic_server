import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  server: {
    host: "::",
    port: 8080,
    hmr: { overlay: false },
  },
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      includeAssets: ["favicon.ico", "favicon.png", "apple-touch-icon-180x180.png", "pwa-icon.svg"],
      manifest: {
        name: "Numflame",
        short_name: "Numflame",
        description: "La tua mappa numerologica personalizzata e la tua Anima Gemella",
        theme_color: "#1a0533",
        background_color: "#0d0a14",
        display: "standalone",
        orientation: "portrait",
        scope: "/",
        start_url: "/",
        lang: "it",
        icons: [
          { src: "numflame-64x64.png",            sizes: "64x64",   type: "image/png" },
          { src: "numflame-192x192.png",           sizes: "192x192", type: "image/png" },
          { src: "numflame-512x512.png",           sizes: "512x512", type: "image/png", purpose: "any" },
          { src: "numflame-maskable-512x512.png",  sizes: "512x512", type: "image/png", purpose: "maskable" },
        ],
        categories: ["lifestyle", "entertainment"],
      },
      workbox: {
        globPatterns: ["**/*.{js,css,html,ico,png,svg,woff2}"],
        maximumFileSizeToCacheInBytes: 4 * 1024 * 1024,
        // Never cache Supabase requests — auth/storage/functions must always hit the network
        navigateFallback: null,
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/[a-z]+\.supabase\.co\/.*/i,
            handler: "NetworkOnly",
          },
          {
            urlPattern: /^https:\/\/openrouter\.ai\/.*/i,
            handler: "NetworkOnly",
          },
        ],
      },
      devOptions: { enabled: false },
    }),
  ],
  resolve: {
    alias: { "@": path.resolve(__dirname, "./src") },
  },
});
