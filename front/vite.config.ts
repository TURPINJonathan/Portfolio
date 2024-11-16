import { fileURLToPath, URL } from 'node:url';

import vue from '@vitejs/plugin-vue';
import { defineConfig } from 'vite';
import vueDevTools from 'vite-plugin-vue-devtools';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(),
  ],
  resolve: {
    alias: {
      '#': fileURLToPath(new URL('./src', import.meta.url)),
      '#components': fileURLToPath(new URL('./src/components', import.meta.url)),
      '#router': fileURLToPath(new URL('./src/router', import.meta.url)),
      '#store': fileURLToPath(new URL('./src/store', import.meta.url)),
      '#views': fileURLToPath(new URL('./src/views', import.meta.url)),
      '#assets': fileURLToPath(new URL('./src/assets', import.meta.url)),
      '#utils': fileURLToPath(new URL('./src/utils', import.meta.url)),
      '#styles': fileURLToPath(new URL('./src/styles', import.meta.url)),
      '#constants': fileURLToPath(new URL('./src/constants', import.meta.url)),
      '#enums': fileURLToPath(new URL('./src/enums', import.meta.url)),
    },
  },
});
