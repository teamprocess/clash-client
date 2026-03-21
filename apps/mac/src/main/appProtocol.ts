import { protocol } from "electron";
import { readFile } from "node:fs/promises";
import { extname, join, normalize, sep } from "node:path";

export const APP_PROTOCOL_SCHEME = "app";
export const APP_PROTOCOL_HOST = "clash";
const APP_INDEX_PATH = "index.html";
const CONTENT_TYPES: Record<string, string> = {
  ".css": "text/css; charset=utf-8",
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".png": "image/png",
  ".svg": "image/svg+xml",
  ".woff": "font/woff",
  ".woff2": "font/woff2",
};

protocol.registerSchemesAsPrivileged([
  {
    scheme: APP_PROTOCOL_SCHEME,
    privileges: {
      standard: true,
      secure: true,
      supportFetchAPI: true,
    },
  },
]);

const getRendererDistPath = () => join(__dirname, "../renderer");

const getRendererIndexUrl = () =>
  `${APP_PROTOCOL_SCHEME}://${APP_PROTOCOL_HOST}/${APP_INDEX_PATH}`;
const getRendererIndexPath = () => join(getRendererDistPath(), APP_INDEX_PATH);
const getContentType = (filePath: string) =>
  CONTENT_TYPES[extname(filePath)] ?? "application/octet-stream";
const hasRendererDevServer = () => Boolean(process.env["ELECTRON_RENDERER_URL"]);

const resolveRendererAssetPath = (requestUrl: string) => {
  const url = new URL(requestUrl);
  const requestedPath = decodeURIComponent(url.pathname);
  const relativePath =
    requestedPath === "/" || requestedPath === "" ? APP_INDEX_PATH : requestedPath.replace(/^\/+/, "");
  const rendererDistPath = getRendererDistPath();
  const resolvedPath = normalize(join(rendererDistPath, relativePath));
  const rendererDistPrefix = `${rendererDistPath}${sep}`;

  if (resolvedPath !== rendererDistPath && !resolvedPath.startsWith(rendererDistPrefix)) {
    return getRendererIndexPath();
  }

  // Client-side routes should resolve to the renderer entry.
  if (!extname(relativePath)) {
    return getRendererIndexPath();
  }

  return resolvedPath;
};

let isAppProtocolHandled = false;

export const registerAppProtocol = () => {
  if (hasRendererDevServer() || isAppProtocolHandled) {
    return;
  }

  protocol.handle(APP_PROTOCOL_SCHEME, async request => {
    const filePath = resolveRendererAssetPath(request.url);
    try {
      const file = await readFile(filePath);

      return new Response(file, {
        headers: {
          "content-type": getContentType(filePath),
        },
      });
    } catch (error) {
      console.error("app protocol request failed:", request.url, filePath, error);

      return new Response("Not found", {
        status: 404,
      });
    }
  });

  isAppProtocolHandled = true;
};

export const getRendererEntryUrl = () => {
  const rendererUrl = process.env["ELECTRON_RENDERER_URL"];

  if (rendererUrl) {
    return rendererUrl;
  }

  return getRendererIndexUrl();
};
