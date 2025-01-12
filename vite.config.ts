import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    {
      name: 'copy-manifest',
      generateBundle() {
        this.emitFile({
          type: 'asset',
          fileName: 'manifest.json',
          source: JSON.stringify({
            manifest_version: 3,
            name: "Hello World New Tab",
            version: "1.0.0",
            description: "A simple Hello World new tab extension",
            chrome_url_overrides: {
              newtab: "index.html"
            }
          }, null, 2)
        })
      }
    }
  ],
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: {
        index: 'index.html'
      },
      output: {
        entryFileNames: '[name].js',
        chunkFileNames: '[name].js',
        assetFileNames: '[name].[ext]'
      }
    }
  },
  base: './',
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})
