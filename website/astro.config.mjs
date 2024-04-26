import { defineConfig } from 'astro/config';
import astroDevOnlyRoutes from 'astro-dev-only-routes';
import tailwind from "@astrojs/tailwind";
import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
  integrations: [astroDevOnlyRoutes(), tailwind(), sitemap()],
  site: "https://aryxst.github.io", 
  base: "developer-portfolios"
});