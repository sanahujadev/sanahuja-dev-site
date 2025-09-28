/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}',
  ],
  theme: {
    extend: {
      colors: {
        'brand-dark': 'var(--color-brand-dark)',
        'brand-light': 'var(--color-brand-light)',
        'brand-orange': 'var(--color-brand-orange)',
        'bg-canvas': 'var(--color-bg-canvas)',
        'bg-canvas-dark': 'var(--color-bg-canvas-dark)',
        'bg-surface': 'var(--color-bg-surface)',
        'bg-surface-dark': 'var(--color-bg-surface-dark)',
        'text-default': 'var(--color-text-default)',
        'text-default-dark': 'var(--color-text-default-dark)',
        'text-muted': 'var(--color-text-muted)',
        'text-muted-dark': 'var(--color-text-muted-dark)',
        'text-on-primary': 'var(--color-text-on-primary)',
        'border-default': 'var(--color-border-default)',
        'border-default-dark': 'var(--color-border-default-dark)',
      }
    },
  },
  plugins: [],
}