import { resolve } from "path";
import { readFileSync } from "fs";
import { defineConfig, loadEnv } from "electron-vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd());

  return {
    main: {
      define: {
        "process.env.VITE_API_URL": JSON.stringify(env.VITE_API_URL),
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
      server: {
        https: {
          key: readFileSync(resolve(__dirname, "certs/local.clash.kr+3-key.pem")),
          cert: readFileSync(resolve(__dirname, "certs/local.clash.kr+3.pem")),
        },
        host: "local.clash.kr",
        port: 5173,
      },
    },
  };
});
