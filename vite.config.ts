import { defineConfig } from 'vite'

export default defineConfig({
  server: {
    hmr: {
      overlay: false, // Disable error overlay for better performance
    },
    watch: {
      // Ignore node_modules to reduce file watching overhead
      ignored: ['**/node_modules/**', '**/dist/**'],
    },
  },
  build: {
    target: 'esnext',
    minify: 'esbuild',
    rollupOptions: {
      output: {
        manualChunks: undefined,
      },
    },
  },
  optimizeDeps: {
    include: ['@vercel/analytics'],
    force: false, // Don't force re-optimization on every start
  },
  esbuild: {
    logOverride: { 'this-is-undefined-in-esm': 'silent' },
  },
})
