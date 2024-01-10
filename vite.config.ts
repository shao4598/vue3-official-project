import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/vue3-official-project/',
  plugins: [vue()],
  server:{
    host: '0.0.0.0'
  },
  build: {
    sourcemap: true,
  }
})
