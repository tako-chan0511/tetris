// vite.config.ts
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
// ここを追加！
import { resolve } from 'path'

export default defineConfig({
  // GitHub Pages 用の base、Vercel では自動的に `/`
  base: process.env.VERCEL ? '/' : '/tetris/',
  plugins: [vue()],
  resolve: {
    alias: {
      // `@` で `src/` を参照できるように
      '@': resolve(__dirname, 'src')
    }
  }
})
