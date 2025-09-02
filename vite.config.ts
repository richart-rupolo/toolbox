import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path'; // 🔹 esqueceu de importar o path

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    open: true,
  },
  build: {
    sourcemap: true,
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'), // ✅ agora funciona
    },
  },
});
