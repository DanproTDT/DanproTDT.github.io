// @ts-check
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
    site: 'https://DanproTDT.github.io',
    output: 'static', // Esto es clave para habilitar endpoints dinámicos
    integrations: [tailwind()]
});

