import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import { VitePWA }  from 'vite-plugin-pwa'
import { type } from 'node:os'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(),
    VitePWA({
      registerType:  'autoUpdate',
      mainfest: {
        name: 'ショピシェア',
        short_name: 'ショピシェア',
        description: '買い物メモ共有アプリ',
        theme_color: '#42b883',
        background_color: '#fff',
        display: 'standalone',
        icons: [
          {
            scr: '/icons/icon-192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: '/icons/icon-512x512.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      }
    })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
})
