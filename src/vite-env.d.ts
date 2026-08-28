/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_TWIN_URL: string;
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}
