import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      'react-router-dom': 'react-router-dom/dist/react-router-dom.development.js',
      '@': resolve(__dirname, 'src'),
    },
  },
});