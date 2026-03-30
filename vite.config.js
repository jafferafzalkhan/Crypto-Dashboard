import { defineConfig } from 'vite';

export default defineConfig({
  server: {
    proxy: {
      '/api/coingecko': {
        target: 'https://api.coingecko.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/coingecko/, ''), // Removes '/api/coingecko' prefix
      },
    },
  },
});