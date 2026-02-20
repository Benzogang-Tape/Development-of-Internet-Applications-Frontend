import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

// В Docker контейнере localhost не видит бэкенд — задаём target через env.
// Без Docker: не задавать или localhost:8080. В Docker: имя сервиса (например backend:8080) или host.docker.internal:8080.
const apiProxyTarget = process.env.VITE_API_PROXY_TARGET || 'http://localhost:8080'

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      devOptions: {
        enabled: true,
      },
      manifest: {
        name: "RoofMaster",
        short_name: "RoofMaster",
        start_url: "/",
        display: "standalone",
        background_color: "#121212",
        theme_color: "#1DB954",
        orientation: "portrait-primary",
        icons: [
          {
            src: "/logo192.png",
            type: "image/png",
            sizes: "192x192",
          },
          {
            src: "/logo512.png",
            type: "image/png",
            sizes: "512x512",
          },
        ],
      },
    }),
  ],
  server: {
    port: 3000,
    strictPort: true,
    host: true,
    watch: {
      usePolling: true,
    },
    proxy: {
      '/api': {
        target: apiProxyTarget,
        changeOrigin: true,
        secure: false,
      }
    }
  }
})
