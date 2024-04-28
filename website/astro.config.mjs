import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';
import icon from 'astro-icon';

// https://astro.build/config
export default defineConfig({
 devToolbar: { enabled: false },
 integrations: [tailwind(), sitemap(), icon()],
 site: 'https://aryxst.github.io',
 base: 'developer-portfolios',
});
