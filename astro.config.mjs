// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import starlightFullViewMode from 'starlight-fullview-mode';
import mermaid from 'astro-mermaid';
import catppuccin from "@catppuccin/starlight";
import starlightImageZoom from 'starlight-image-zoom';
import react from '@astrojs/react';
import { fileURLToPath } from 'node:url';
import { unified } from '@astrojs/markdown-remark';
import starlightCodeblockFullscreen from 'starlight-codeblock-fullscreen'

import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
    site: 'https://sogmax.github.io',
    base: '/vmQuest',
    trailingSlash: 'always',
    output: 'static',

    vite: {
        resolve: {
            alias: {
                '@': fileURLToPath(new URL('./src', import.meta.url)),
            },
        },

        plugins: [tailwindcss()],
    },

    markdown: {
        processor: unified()
    },

    integrations: [
        react(),
        starlight({
            plugins: [
                starlightFullViewMode(),
                catppuccin(),
                starlightImageZoom(),
                starlightCodeblockFullscreen(),
            ],
            title: 'Vm Quest',
            logo: {
                light: './src/assets/logo.svg',
                dark: './src/assets/dark-logo.svg',
            },
            social: [
                {
                    icon: 'linkedin',
                    label: 'LinkedIn',
                    href: 'https://www.linkedin.com/in/ernesto-de-la-rosa-zamora',
                },
            ],
            defaultLocale: 'es',
            locales: {
                en: {
                    label: 'English',
                    lang: 'en',
                },
                es: {
                    label: 'Español',
                    lang: 'es',
                },
            },
            sidebar: [
                {
                    label: 'Comienza Aquí',
                    translations: { en: 'Start Here' },
                    items: [
                        { autogenerate: { directory: 'getting-started' } }
                    ]
                },
                {
                    label: 'scripts-utiles',
                    translations: { en: 'Scripts' },
                    collapsed: true,
                    items: [
                        { autogenerate: { directory: 'scripts-utiles' } }
                    ]
                },
                {
                    label: 'DockerLabs',
                    translations: { en: 'DockerLabs' },
                    collapsed: true,
                    items: [
                        { autogenerate: { directory: 'DockerLabs' } }
                    ]
                },
                {
                    label: 'HackMyVM',
                    translations: { en: 'HackMyVM' },
                    collapsed: true,
                    items: [
                        { autogenerate: { directory: 'HackMyVM' } }
                    ]
                },
                {
                    label: 'VulnHub',
                    translations: { en: 'VulnHub' },
                    collapsed: true,
                    items: [
                        { autogenerate: { directory: 'Vulnhub' } }
                    ]
                },
                {
                    label: 'Crackmes',
                    translations: { en: 'Crackmes' },
                    collapsed: true,
                    items: [
                        { autogenerate: { directory: 'Crackmes' } }
                    ]
                },
            ],
        }),
        mermaid({
            theme: 'forest',
            autoTheme: true,
            mermaidConfig: {
                flowchart: {
                    curve: 'basis',
                },
            },
        }),
    ],
});