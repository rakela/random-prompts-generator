import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig(({ command, mode, ssrBuild }) => {
  // SSR build configuration
  if (ssrBuild) {
    return {
      plugins: [react()],
      build: {
        ssr: true,
        outDir: 'dist-ssr',
        rollupOptions: {
          input: './src/entry-server.jsx',
          output: {
            format: 'cjs'
          }
        }
      },
      ssr: {
        noExternal: ['react-helmet-async']
      }
    }
  }

  // Client build configuration
  return {
    plugins: [react()],
  }
})