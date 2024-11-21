import { fileURLToPath } from 'node:url';
import { mergeConfig, defineConfig, configDefaults, ViteUserConfig } from 'vitest/config';
import viteConfig from './vite.config';

const typedViteConfig = viteConfig as ViteUserConfig;

export default mergeConfig(
  typedViteConfig,
  defineConfig({
    test: {
      environment: 'jsdom',
      exclude: [...configDefaults.exclude, 'e2e/**'],
      root: fileURLToPath(new URL('./', import.meta.url)),
    },
  }),
);