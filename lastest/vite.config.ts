import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  envDir: '../', // Cargar archivo .env desde la carpeta padre
  build: {
    chunkSizeWarningLimit: 900,
  },
})
