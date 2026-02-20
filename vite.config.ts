import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'
import mkcert from 'vite-plugin-mkcert'
import fs from 'fs'
import path from 'path'

// В Docker контейнере localhost не видит бэкенд — задаём target через env.
// Без Docker: не задавать или localhost:8080. В Docker: имя сервиса (например backend:8080) или host.docker.internal:8080.
const apiProxyTarget = process.env.VITE_API_PROXY_TARGET || 'http://localhost:8080'

// Для GitHub Pages в production используем имя репозитория как base path.
// В dev-режиме base = "/" чтобы не менять рабочий процесс.
const base = process.env.NODE_ENV === 'production'
  ? '/Development-of-Internet-Applications-Frontend/'
  : '/'

export default defineConfig({
  base,
  plugins: [
    react(),
    mkcert(),
    VitePWA({
      registerType: 'autoUpdate',
      devOptions: {
        enabled: true,
      },
      manifest: {
        name: "RoofMaster",
        short_name: "RoofMaster",
        start_url: base,
        display: "standalone",
        background_color: "#121212",
        theme_color: "#1DB954",
        orientation: "portrait-primary",
        icons: [
          {
            src: `${base}logo192.png`,
            type: "image/png",
            sizes: "192x192",
          },
          {
            src: `${base}logo512.png`,
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
    https: {
      key: fs.readFileSync(path.resolve(__dirname, 'cert.key')),
      cert: fs.readFileSync(path.resolve(__dirname, 'cert.crt')),
    },
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
