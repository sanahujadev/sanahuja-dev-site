import { defineConfig, envField } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
  integrations: [sitemap()],
  vite: {
    plugins: [tailwindcss()],
    esbuild: {
      exclude: ['console']
    }
  },
  i18n: {
    defaultLocale: "es",
    locales: ["es", "en"],
    routing: {
      prefixDefaultLocale: false,
    },
  },
  env: {
    schema: {
      PUBLIC_TURNSTILE_SITE_KEY: envField.string({
        context: "client",
        access: "public",
      }),
      API_URL: envField.string({ context: "client", access: "public" }),
      API_KEY: envField.string({ context: "client", access: "public" }),
      PUBLIC_GTM_ID: envField.string({
        context: "client",
        access: "public",
      }),
    },
  },
  site: "https://www.sanahuja.dev",
});
