/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_URL: string;
  readonly VITE_SOCKET_IO_URL?: string;
  readonly VITE_RECAPTCHA_SITE_KEY?: string;
  readonly VITE_GITHUB_CLIENT_ID?: string;
  readonly VITE_GITHUB_OAUTH_SCOPE?: string;
  readonly VITE_GITHUB_OAUTH_BASE_URL?: string;
  readonly VITE_GITHUB_OAUTH_REDIRECT_URI?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
