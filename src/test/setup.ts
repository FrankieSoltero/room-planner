import '@testing-library/jest-dom/vitest'

// jsdom has no ResizeObserver; components that measure themselves need a no-op stand-in.
if (typeof globalThis.ResizeObserver === 'undefined') {
  class NoopResizeObserver implements ResizeObserver {
    observe(): void {}
    unobserve(): void {}
    disconnect(): void {}
  }
  globalThis.ResizeObserver = NoopResizeObserver
}
