import {defineConfig} from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    host: true,
    port: process.env.PORT || 3000,
    hmr: {
      clientPort: process.env.NGINX_PORT || process.env.PORT || 3000,
    },
  },
  plugins: [react()],
  resolve: {
    alias: {
      '@pages': path.resolve(__dirname, './src/pages'),
      '@components': path.resolve(__dirname, './src/components'),
      '@store': path.resolve(__dirname, './src/store'),
      '@router': path.resolve(__dirname, './src/router'),
      '@utils': path.resolve(__dirname, './src/utils'),
      '@apis': path.resolve(__dirname, './src/apis'),
      '@hooks': path.resolve(__dirname, './src/hooks'),
      '@configs': path.resolve(__dirname, './src/configs'),
      '@models': path.resolve(__dirname, './src/models'),
      '@': path.resolve(__dirname, './src'),
    },
  },
});
