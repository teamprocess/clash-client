import { app, session } from "electron";
import { is } from "@electron-toolkit/utils";

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
  const apiOrigin = parseOrigin(process.env.VITE_API_URL);
  const socketOrigin = parseOrigin(process.env.VITE_SOCKET_IO_URL);

  if (apiOrigin) {
    connectSourceSet.add(apiOrigin);
  }

  if (socketOrigin) {
    connectSourceSet.add(socketOrigin);
  }

  const connectSources = Array.from(connectSourceSet).join(" ");

  session.defaultSession.webRequest.onHeadersReceived((details, callback) => {
    callback({
      responseHeaders: {
        ...details.responseHeaders,
        "Content-Security-Policy": [
          `default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.google.com https://www.gstatic.com; style-src 'self' 'unsafe-inline' https://www.gstatic.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data: https://www.gstatic.com; frame-src https://www.google.com; connect-src ${connectSources}`,
        ],
      },
    });
  });
};
