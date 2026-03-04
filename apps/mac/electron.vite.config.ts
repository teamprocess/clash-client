import { resolve } from "path";
import { existsSync, readFileSync } from "fs";
import { defineConfig, loadEnv } from "electron-vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";

export default defineConfig(({ mode }) => {
  const workspaceRoot = resolve(__dirname, "../..");
  const appRoot = __dirname;
  const env = {
    ...loadEnv(mode, workspaceRoot),
    ...loadEnv(mode, appRoot),
  };
  const isDev = mode === "development";
  const certBaseDir = resolve(__dirname, "certs");
  const hasLocalHttpsCert =
    existsSync(resolve(certBaseDir, "local.clash.kr+3-key.pem")) &&
    existsSync(resolve(certBaseDir, "local.clash.kr+3.pem"));
  const rendererEnvDefine = {
    "import.meta.env.VITE_API_URL": JSON.stringify(env.VITE_API_URL ?? ""),
    "import.meta.env.VITE_SOCKET_IO_URL": JSON.stringify(env.VITE_SOCKET_IO_URL ?? ""),
    "import.meta.env.VITE_RECAPTCHA_SITE_KEY": JSON.stringify(env.VITE_RECAPTCHA_SITE_KEY ?? ""),
    "import.meta.env.VITE_GITHUB_CLIENT_ID": JSON.stringify(env.VITE_GITHUB_CLIENT_ID ?? ""),
    "import.meta.env.VITE_GITHUB_OAUTH_SCOPE": JSON.stringify(env.VITE_GITHUB_OAUTH_SCOPE ?? ""),
    "import.meta.env.VITE_GITHUB_OAUTH_BASE_URL": JSON.stringify(
      env.VITE_GITHUB_OAUTH_BASE_URL ?? ""
    ),
    "import.meta.env.VITE_GITHUB_OAUTH_REDIRECT_URI": JSON.stringify(
      env.VITE_GITHUB_OAUTH_REDIRECT_URI ?? ""
    ),
  };

  return {
    main: {
      define: {
        "process.env.VITE_API_URL": JSON.stringify(env.VITE_API_URL ?? ""),
        "process.env.VITE_SOCKET_IO_URL": JSON.stringify(env.VITE_SOCKET_IO_URL ?? ""),
      },
    },
    preload: {},
    renderer: {
      define: rendererEnvDefine,
      resolve: {
        alias: {
          "@": resolve("src/renderer/src"),
        },
      },
      plugins: [
        react(),
        svgr({
          svgrOptions: {
            exportType: "default",
            ref: true,
            svgo: false,
            titleProp: true,
          },
          include: "**/*.svg",
        }),
      ],
      ...(isDev
        ? {
            server: hasLocalHttpsCert
              ? {
                  https: {
                    key: readFileSync(resolve(certBaseDir, "local.clash.kr+3-key.pem")),
                    cert: readFileSync(resolve(certBaseDir, "local.clash.kr+3.pem")),
                  },
                  host: "local.clash.kr",
                  port: 5173,
                }
              : {
                  host: "127.0.0.1",
                  port: 5173,
                },
          }
        : {}),
    },
  };
});
