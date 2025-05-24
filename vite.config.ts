// vite.config.ts
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
// path.resolve ではなく URL → file path で dirname を作成
import { fileURLToPath, URL } from 'url'

export default defineConfig({
  // GitHub Pages 用にサブパス固定
  base: '/tetris/',
  plugins: [vue()],
  resolve: {
    alias: {
      // `@` を `src/` にマッピング
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
