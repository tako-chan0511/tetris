// src/env.d.ts
/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VERCEL?: string;
  // もし他に VITE_～ の環境変数があればここに書き足してください
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
