import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
    resolve: {
        alias: {
            '@': resolve(__dirname, 'src')
        }
    },
    server: {
        open: true, // Automatically open the app in the browser
    },
    build: {
        target: 'modules', // Do not transpile JS, output modern ES modules
    },
    esbuild: {
        target: 'esnext', // Set esbuild target to esnext to avoid transpilation by esbuild
    },
    test: {
        globals: true,
        environment: 'jsdom', // Use jsdom for DOM testing
    }
});