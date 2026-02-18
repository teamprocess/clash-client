import { app, session } from "electron";
import { is } from "@electron-toolkit/utils";

const DEFAULT_SOCKET_ENDPOINT = "wss://api.clash.kr/socket.io";

const resolveSocketOrigins = (socketEndpoint: string) => {
  const socketOrigin = new URL(socketEndpoint).origin;
  const wsSocketOrigin = socketOrigin.startsWith("https://")
    ? socketOrigin.replace("https://", "wss://")
    : socketOrigin.startsWith("http://")
      ? socketOrigin.replace("http://", "ws://")
      : "";

  return { socketOrigin, wsSocketOrigin };
};

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

export const registerCspHeaders = () => {
  const apiUrl = process.env.VITE_API_URL;
  if (!apiUrl) {
    console.error("VITE_API_URL이 설정되지 않았습니다.");
  }

  const apiOrigin = apiUrl ? new URL(apiUrl).origin : "";
  const socketEndpoint = process.env.VITE_SOCKET_IO_URL || DEFAULT_SOCKET_ENDPOINT;
  const { socketOrigin, wsSocketOrigin } = resolveSocketOrigins(socketEndpoint);

  session.defaultSession.webRequest.onHeadersReceived((details, callback) => {
    callback({
      responseHeaders: {
        ...details.responseHeaders,
        "Content-Security-Policy": [
          `default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.google.com https://www.gstatic.com; style-src 'self' 'unsafe-inline' https://www.gstatic.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data: https://www.gstatic.com; frame-src https://www.google.com; connect-src 'self' ${apiOrigin} ${socketOrigin} ${wsSocketOrigin} https://www.google.com`,
        ],
      },
    });
  });
};
