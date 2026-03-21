import { app, session } from "electron";
import { is } from "@electron-toolkit/utils";

// 개발 환경 인증서 예외 처리 등록
export const configureCertificateHandling = () => {
  // 개발 환경에서 자체 서명 인증서 허용
  if (is.dev) {
    app.commandLine.appendSwitch("ignore-certificate-errors");
  }

  app.on("certificate-error", (event, _webContents, _url, _error, _certificate, callback) => {
    if (!is.dev) {
      callback(false);
      return;
    }

    event.preventDefault();
    callback(true);
  });
};

export const registerCspHeaders = () => {
  const apiOrigin = process.env.VITE_API_URL ? ` ${new URL(process.env.VITE_API_URL).origin}` : "";
  const socketOrigin = process.env.VITE_SOCKET_IO_URL
    ? ` ${new URL(process.env.VITE_SOCKET_IO_URL).origin}`
    : "";

  session.defaultSession.webRequest.onHeadersReceived((details, callback) => {
    callback({
      responseHeaders: {
        ...details.responseHeaders,
        "Content-Security-Policy": [
          `default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.google.com https://www.gstatic.com; style-src 'self' 'unsafe-inline' https://www.gstatic.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data: https://www.gstatic.com${apiOrigin} https://cdn.clash.kr; frame-src https://www.google.com; connect-src 'self' https://www.google.com${apiOrigin}${socketOrigin} https://cdn.clash.kr`,
        ],
      },
    });
  });
};
