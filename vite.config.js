import path from 'path'
import { defineConfig } from 'vite'
import eslintPlugin from 'vite-plugin-eslint'

const serverPort = 8081
const publishName = 'localPortFinder'

const config = {
  plugins: [
    eslintPlugin({ include: ['src/**/*.js', 'src/*.js']}),
  ],
  base: './',
  publicDir: 'public',
  resolve: { alias: { '@': path.resolve(__dirname, 'src') }},
  server: {
    port: serverPort,
    historyApiFallback: true,
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    assetsInlineLimit: 4096,
    cssCodeSplit: true,
    brotliSize: false,
    sourcemap: false,
    minify: 'terser',
    lib: {
      entry: path.resolve(__dirname, 'src/index.js'),
      name: publishName,
      fileName: format => {
        if (format === 'es') {
          return `${publishName}.es.js`
        }
        if (format === 'umd') {
          return `${publishName}.umd.js`
        }
        return publishName
      },
      formats: ['es', 'umd'],
    },
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },
    rollupOptions: {
      output: {
        compact: true,
        entryFileNames: 'localPortFinder.[format].js',
      },
    },
  },
}

export default defineConfig(({ command, mode }) => config)
