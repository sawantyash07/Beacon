import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'

export default defineConfig({
  base: '/planner/',
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    port: 5174,
    strictPort: true,
    proxy: {
      '/api': {
        target: 'http://localhost:3001',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  },
  build: {
    outDir: process.env.VERCEL ? 'dist' : '../../../public/planner',
    emptyOutDir: true,
    rolldownOptions: {
      external: ['canvg', 'dompurify'],
    },
    rollupOptions: {
      external: ['canvg', 'dompurify'],
    },
  },
})
