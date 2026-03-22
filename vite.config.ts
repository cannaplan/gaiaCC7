import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    port: 3000,
    open: true,
    proxy: {
      '/api': {
        target: 'http://localhost:3001',
        changeOrigin: true,
      },
    },
  },
  build: {
    outDir: 'dist/client',
    sourcemap: true,
  },
});

// Server config export (for npm run build:server)
export const serverConfig = defineConfig({
  configFile: false,
  plugins: [],
  build: {
    outDir: 'dist/server',
    lib: {
      entry: path.resolve(__dirname, 'src/server/index.ts'),
      name: 'Server',
      formats: ['es'],
    },
    rollupOptions: {
      external: ['express', 'react', 'react-dom'],
      output: {
        globals: {
          express: 'express',
          react: 'React',
          'react-dom': 'ReactDOM',
        },
      },
    },
  },
});
