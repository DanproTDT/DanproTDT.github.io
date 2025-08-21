// @ts-check
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
    site: 'https://DanproTDT.github.io',
    output: 'static',
    integrations: [tailwind()]
});

