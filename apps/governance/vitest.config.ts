import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    setupFiles: ['vitest.setup.ts'],
    deps: {
      moduleDirectories: [path.resolve('../../packages'), 'node_modules'],
    }
  },
  // resolve: {
  //   alias: {
  //     'ui-helpers': path.resolve(__dirname, '../../packages/ui-helpers/src')
  //   }
  // }
})
