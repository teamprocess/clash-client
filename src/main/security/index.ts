import { app, session } from "electron";
import { is } from "@electron-toolkit/utils";

const VITE_API_URL = process.env.VITE_API_URL as string;
const VITE_SOCKET_IO_URL = process.env.VITE_SOCKET_IO_URL as string;
const API_ORIGIN = new URL(VITE_API_URL).origin;
const SOCKET_ORIGIN = new URL(VITE_SOCKET_IO_URL).origin;

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
  const connectSources = ["'self'", API_ORIGIN, SOCKET_ORIGIN, "https://www.google.com"].join(" ");

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
