import react from '@vitejs/plugin-react'
import { configDefaults, defineConfig } from 'vitest/config'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    setupFiles: ['src/test/setup.ts'],
    css: false,
    exclude: [...configDefaults.exclude, 'design_handoff_room_planner/**'],
    // Task 1 only: there are no tests yet. Task 2 removes this.
    passWithNoTests: true,
  },
})
