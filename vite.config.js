import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',  // 监听所有网络接口
    port: 3520,       // 指定端口
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      'public': path.resolve(__dirname, 'public'),
      'assets': path.resolve(__dirname, 'src/assets')
    }
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    assetsInlineLimit: 4096,
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, 'index.html')
      },
      output: {
        assetFileNames: (assetInfo) => {
          const info = assetInfo.name.split('.')
          const ext = info[info.length - 1]
          if (/\.(png|jpe?g|gif|svg|webp|ico)$/i.test(assetInfo.name)) {
            return `assets/images/[name]-[hash][extname]`
          }
          return `assets/[ext]/[name]-[hash][extname]`
        },
        chunkFileNames: 'assets/js/[name]-[hash].js',
        entryFileNames: 'assets/js/[name]-[hash].js',
      },
    },
    manifest: true,
  },
  publicDir: 'public',
  optimizeDeps: {
    include: ['react', 'react-dom', 'framer-motion'],
  },
})
