// @ts-check
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import node from '@astrojs/node';

export default defineConfig({
    site: 'https://DanproTDT.github.io',
    output: 'server', // Esto es clave para habilitar endpoints dinámicos
    adapter: node({ mode: 'standalone' }),
    integrations: [tailwind()]
});

