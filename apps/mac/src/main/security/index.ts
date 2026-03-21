import { app, session } from "electron";
import { is } from "@electron-toolkit/utils";

const FALLBACK_SOCKET_ENDPOINT = "wss://api.clash.kr/socket.io";
const LOCAL_SOCKET_PORT = "9092";
const LOCAL_SOCKET_HOSTS = new Set(["localhost", "127.0.0.1", "local.clash.kr"]);
const DEFAULT_PROFILE_IMAGE_SOURCES = [
  "https://cdn.clash.kr",
  "https://*.amazonaws.com",
  "https://*.cloudfront.net",
];
const DEFAULT_CONNECT_SOURCES = [
  "https://*.clash.kr",
  "wss://*.clash.kr",
];

const parseOrigin = (rawUrl: string | undefined) => {
  if (!rawUrl) {
    return null;
  }

  try {
    return new URL(rawUrl).origin;
  } catch {
    return null;
  }
};

const resolveSocketEndpoint = () => {
  const configuredEndpoint = process.env.VITE_SOCKET_IO_URL?.trim();
  if (configuredEndpoint) {
    return configuredEndpoint;
  }

  const apiUrl = process.env.VITE_API_URL?.trim();
  if (!apiUrl) {
    return FALLBACK_SOCKET_ENDPOINT;
  }

  try {
    const url = new URL(apiUrl);
    const protocol = url.protocol === "https:" ? "wss:" : "ws:";
    const port = LOCAL_SOCKET_HOSTS.has(url.hostname) ? `:${LOCAL_SOCKET_PORT}` : url.port ? `:${url.port}` : "";
    return `${protocol}//${url.hostname}${port}/socket.io`;
  } catch {
    return FALLBACK_SOCKET_ENDPOINT;
  }
};

// 개발 환경 인증서 예외 처리 등록
export const configureCertificateHandling = () => {
  // 개발 환경에서 자체 서명 인증서 허용
  if (is.dev) {
    app.commandLine.appendSwitch("ignore-certificate-errors");
  }

  // 개발 환경에서는 인증서 오류 무시
  app.on("certificate-error", (event, _webContents, _url, _error, _certificate, callback) => {
    if (is.dev) {
      event.preventDefault();
      callback(true);
    } else {
      callback(false);
    }
  });
};

// 응답 헤더에 CSP 주입
export const registerCspHeaders = () => {
  const connectSourceSet = new Set(["'self'", "https://www.google.com"]);
  const imageSourceSet = new Set(["'self'", "data:", "https://www.gstatic.com"]);
  const apiOrigin = parseOrigin(process.env.VITE_API_URL);
  const socketOrigin = parseOrigin(resolveSocketEndpoint());

  for (const source of DEFAULT_CONNECT_SOURCES) {
    connectSourceSet.add(source);
  }

  if (apiOrigin) {
    connectSourceSet.add(apiOrigin);
    imageSourceSet.add(apiOrigin);
  }

  if (socketOrigin) {
    connectSourceSet.add(socketOrigin);
  }

  for (const source of DEFAULT_PROFILE_IMAGE_SOURCES) {
    imageSourceSet.add(source);
    connectSourceSet.add(source);
  }

  const connectSources = Array.from(connectSourceSet).join(" ");
  const imageSources = Array.from(imageSourceSet).join(" ");

  session.defaultSession.webRequest.onHeadersReceived((details, callback) => {
    callback({
      responseHeaders: {
        ...details.responseHeaders,
        "Content-Security-Policy": [
          `default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.google.com https://www.gstatic.com; style-src 'self' 'unsafe-inline' https://www.gstatic.com; font-src 'self' https://fonts.gstatic.com; img-src ${imageSources}; frame-src https://www.google.com; connect-src ${connectSources}`,
        ],
      },
    });
  });
};
