/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}',
  ],
  theme: {
    extend: {
      colors: {
        'brand-dark': '#212121',
        'brand-light': '#E0E0E0',
        'brand-orange': '#FF6F00',
      }
    },
  },
  plugins: [],
}