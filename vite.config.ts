import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// В Docker контейнере localhost не видит бэкенд — задаём target через env.
// Без Docker: не задавать или localhost:8080. В Docker: имя сервиса (например backend:8080) или host.docker.internal:8080.
const apiProxyTarget = process.env.VITE_API_PROXY_TARGET || 'http://localhost:8080'

export default defineConfig({
  plugins: [react()],
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
