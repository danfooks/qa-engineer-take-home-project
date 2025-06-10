import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  server: {
		origin: 'http://localhost:8000',
		proxy: {
		  '/api': {
			target: 'http://localhost:3000',
			changeOrigin: true,
		  },
		},
	  },
  plugins: [react()],
})
