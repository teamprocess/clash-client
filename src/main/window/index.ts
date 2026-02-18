import { BrowserWindow, shell } from "electron";
import { join } from "path";
import { is } from "@electron-toolkit/utils";
import ClashIcon from "../../../resources/clash-icon.png?asset";

// 개발/배포 환경에 맞는 렌더러 URL 로드
const loadRenderer = async (mainWindow: BrowserWindow) => {
  if (is.dev && process.env["ELECTRON_RENDERER_URL"]) {
    await mainWindow.loadURL(process.env["ELECTRON_RENDERER_URL"]);
    return;
  }

  await mainWindow.loadFile(join(__dirname, "../renderer/index.html"));
};

// 메인 브라우저 윈도우 생성 + 기본 동작 연결
export const createMainWindow = () => {
  const mainWindow = new BrowserWindow({
    width: 900,
    height: 670,
    show: false,
    autoHideMenuBar: true,
    ...(process.platform === "linux" ? { ClashIcon } : {}),
    webPreferences: {
      preload: join(__dirname, "../preload/index.js"),
      sandbox: false,
    },
  });

  // 준비되면 최대화 후 표시
  mainWindow.on("ready-to-show", () => {
    mainWindow.maximize();
    mainWindow.show();
  });

  mainWindow.webContents.setWindowOpenHandler(details => {
    void shell.openExternal(details.url);
    return { action: "deny" };
  });

  void loadRenderer(mainWindow);

  return mainWindow;
};
