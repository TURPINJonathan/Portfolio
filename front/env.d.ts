/// <reference types="vite/client" />
/// <reference types="vite/types/importMeta.d.ts" />
interface ImportMetaEnv {
  readonly VITE_API_URL_DEV: string;
  readonly VITE_API_URL_PROD: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}