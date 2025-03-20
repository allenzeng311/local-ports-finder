import path from 'path'
import { defineConfig } from 'vite'
import eslintPlugin from 'vite-plugin-eslint'
import fs from 'fs'
import { promisify } from 'util'

const serverPort = 8081
const publishName = 'localPortFinder'

const config = {
  plugins: [
    eslintPlugin({
      include: [
        'src/**/*.js',
        'src/*.js',
      ],
    }),
  ],
  base: './',
  publicDir: 'public',
  resolve: {
    alias: {
      // 将 src 目录设置为 @
      '@': path.resolve(__dirname, 'src'),
    },
  },
  server: {
    port: serverPort,
    historyApiFallback: true,
  },
}

// 将 fs 的 copyFile 方法转换为 Promise 版本
const copyFile = promisify(fs.copyFile)

// 递归复制目录
async function copyDir(src, dest){
  await fs.promises.mkdir(dest, { recursive: true })
  const entries = await fs.promises.readdir(src, { withFileTypes: true })

  for (const entry of entries) {
    const srcPath = path.join(src, entry.name)
    const destPath = path.join(dest, entry.name)

    if (entry.isDirectory()) {
      await copyDir(srcPath, destPath)
    }
    else {
      await copyFile(srcPath, destPath)
    }
  }
}

export default defineConfig(({ command, mode }) => {
  if (command === 'build') {
    if (mode === 'libs') {
      // 专门处理 lib 的打包
      return {
        ...config,
        publicDir: false,
        build: {
          outDir: 'libs',
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
        },
      }
    }
    if (mode === 'docs') {
      return {
        ...config,
        build: {
          outDir: 'docs',
          rollupOptions: {
            input: {
              // 将 index.html 作为入口文件
              main: path.resolve(__dirname, 'index.html'),
            },
            output: {
              entryFileNames: 'assets/[name].js',
              assetFileNames: 'assets/[name].[ext]',
            },
          },
        },
        plugins: [
          ...config.plugins,
          {
            name: 'copy-libs-to-docs',
            closeBundle: async() => {
              const srcDir = path.resolve(__dirname, 'libs')
              const destDir = path.resolve(__dirname, 'docs/libs/')
              await copyDir(srcDir, destDir)
              console.log(`Copied files from ${srcDir} to ${destDir}`)
            },
          },
        ],
      }
    }
  }
  return config
})
