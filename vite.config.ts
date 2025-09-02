import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import fs from 'fs'

export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',       // слушаем все интерфейсы
    port: 3000,            // порт
    https: {
      key: fs.readFileSync('/home/iazva/Alfred_Projects/refack/hyenasol-main (2)/certs/key.pem'),
      cert: fs.readFileSync('/home/iazva/Alfred_Projects/refack/hyenasol-main (2)/certs/cert.pem'),
    }
  }
})

