import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import svgr from 'vite-plugin-svgr';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    svgr({
      include: '**/*.svg?react',
    }),
  ],
  base: '/superhero-db-web-app/',
  resolve: {
    alias: {
      '~': path.resolve(__dirname, 'src'),
      '@superhero-db-web-app/shared': path.resolve(__dirname, '../shared/src'),
    },
  },
});
