/// <reference types="vite/client" />

declare global {
  // eslint-disable-next-line @typescript-eslint/consistent-type-definitions
  interface ImportMetaEnv {
    readonly VITE_API_URL: string
  }

  // eslint-disable-next-line @typescript-eslint/consistent-type-definitions
  interface ImportMeta {
    readonly env: ImportMetaEnv
  }
}

export {}
