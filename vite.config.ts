import react from '@vitejs/plugin-react'
import { configDefaults, defineConfig } from 'vitest/config'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    // The only chunk above Vite's 500 kB default is the three.js `ThreeView` chunk, which is
    // lazily loaded and split from the entry on purpose, so the limit sits just above it.
    chunkSizeWarningLimit: 600,
  },
  test: {
    environment: 'jsdom',
    setupFiles: ['src/test/setup.ts'],
    css: false,
    exclude: [...configDefaults.exclude, 'design_handoff_room_planner/**'],
  },
})
