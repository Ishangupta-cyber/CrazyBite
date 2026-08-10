import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],

  // `vite dev` api/swiggy.js serverless function nahi chalata, isliye dev mein
  // wahi /api/swiggy?url=... request yahan se Swiggy pe proxy kar dete hain.
  // Production pe Vercel asli function use karta hai.
  server: {
    proxy: {
      '/api/swiggy': {
        target: 'https://www.swiggy.com',
        changeOrigin: true,
        headers: {
          'User-Agent':
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36',
        },
        rewrite: (path) => {
          const encoded = new URL(path, 'http://localhost').searchParams.get('url')
          const target = new URL(encoded)
          return target.pathname + target.search
        },
      },
    },
  },
})
