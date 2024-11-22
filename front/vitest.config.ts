import { fileURLToPath, URL } from 'node:url';
import { mergeConfig, configDefaults } from 'vitest/config';
import { defineConfig } from 'vite';
import viteConfig from './vite.config';

export default defineConfig(() => {
  return mergeConfig(
    viteConfig,
    {
      test: {
        environment: 'jsdom',
        exclude: [...configDefaults.exclude, 'e2e/**'],
        root: fileURLToPath(new URL('./', import.meta.url)),
        alias: {
          '#': fileURLToPath(new URL('./src', import.meta.url)),
          '#components': fileURLToPath(new URL('./src/components', import.meta.url)),
          '#router': fileURLToPath(new URL('./src/router', import.meta.url)),
          '#store': fileURLToPath(new URL('./src/stores', import.meta.url)),
          '#views': fileURLToPath(new URL('./src/views', import.meta.url)),
          '#assets': fileURLToPath(new URL('./src/assets', import.meta.url)),
          '#utils': fileURLToPath(new URL('./src/utils', import.meta.url)),
          '#styles': fileURLToPath(new URL('./src/styles', import.meta.url)),
          '#constants': fileURLToPath(new URL('./src/constants', import.meta.url)),
          '#enums': fileURLToPath(new URL('./src/enums', import.meta.url)),
          '#composables': fileURLToPath(new URL('./src/composables', import.meta.url)),
        },
      },
    }
  );
});