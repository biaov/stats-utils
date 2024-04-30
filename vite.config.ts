import { UserConfig } from 'vite'
import { resolve } from 'path'
import { VitePluginNode } from 'vite-plugin-node'
import { port } from './src/config'

const plugins = []
process.env.NODE_ENV !== 'production' &&
  plugins.push(
    ...VitePluginNode({
      adapter: 'express',
      appPath: './src/app.ts',
      exportName: 'app',
      tsCompiler: 'esbuild'
    })
  )
const config: UserConfig = {
  root: __dirname,
  resolve: {
    alias: {
      '@': resolve(__dirname, './src')
    }
  },
  plugins,
  optimizeDeps: {
    exclude: ['sequelize']
  },
  server: {
    host: '0.0.0.0',
    port
  },
  build: {
    target: 'node20',
    outDir: resolve(__dirname, './dist'),
    lib: {
      entry: resolve(__dirname, './src/index.ts'),
      formats: ['es']
    },
    rollupOptions: {
      external: ['path', 'child_process', 'fs', 'axios', 'dayjs', 'express', 'https', 'dom-parser'],
      output: {
        entryFileNames: '[name].js'
      }
    },
    minify: 'terser'
  }
}

export default config
