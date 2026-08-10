import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  plugins: [
    {
      name: 'beacon-portal-rewrite',
      configureServer(server) {
        server.middlewares.use((req, res, next) => {
          if (req.url) {
            if (req.url === '/master' || req.url.startsWith('/master/') || req.url === '/master/login') {
              if (!req.url.includes('.')) {
                req.url = '/master/index.html';
              }
            } else if (req.url === '/planner' || req.url === '/planner/' || req.url.startsWith('/planner/')) {
              if (!req.url.includes('.')) {
                req.url = '/planner/index.html';
              }
            }
          }
          next();
        });
      }
    }
  ],
  server: {
    allowedHosts: true
  },
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        master: resolve(__dirname, 'master/index.html'),
      }
    }
  }
});


