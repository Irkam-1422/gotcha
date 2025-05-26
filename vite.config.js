// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    host: true, // 👈 this allows access from your local network
    port: 5173, // optional — defaults to 5173
  },
});
