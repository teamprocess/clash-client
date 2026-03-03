import { resolve } from "path";
import { existsSync, readFileSync } from "fs";
import { defineConfig, loadEnv } from "electron-vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd());
  const isDev = mode === "development";
  const certBaseDir = resolve(__dirname, "certs");
  const hasLocalHttpsCert =
    existsSync(resolve(certBaseDir, "local.clash.kr+3-key.pem")) &&
    existsSync(resolve(certBaseDir, "local.clash.kr+3.pem"));

  return {
    main: {
      define: {
        "process.env.VITE_API_URL": JSON.stringify(env.VITE_API_URL),
        "process.env.VITE_SOCKET_IO_URL": JSON.stringify(env.VITE_SOCKET_IO_URL ?? ""),
      },
    },
    preload: {},
    renderer: {
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
