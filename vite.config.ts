import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: process.env.VITE_ISLAND_PREVIEW === 'true' ? '/ai-island/' : '/ai-town',
  plugins: [react()],
  server: {
    allowedHosts: ['ai-town-your-app-name.fly.dev', 'localhost', '127.0.0.1'],
  },
});
