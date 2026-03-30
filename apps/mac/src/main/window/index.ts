import { BrowserWindow, shell } from "electron";
import { join } from "path";
import { getRendererEntryUrl } from "../appProtocol";
import { initializeWindowZoom } from "./zoom";

// 개발/배포 환경에 맞는 렌더러 URL 로드
const loadRenderer = async (mainWindow: BrowserWindow) => {
  const entryUrl = getRendererEntryUrl();

  try {
    await mainWindow.loadURL(entryUrl);
  } catch (error) {
    console.error("renderer entry load failed:", entryUrl, error);
  }
};

// 메인 브라우저 윈도우 생성 + 기본 동작 연결
export const createMainWindow = () => {
  const mainWindow = new BrowserWindow({
    width: 900,
    height: 670,
    show: false,
    autoHideMenuBar: true,
    backgroundColor: "#2a2b2c",
    webPreferences: {
      preload: join(__dirname, "../preload/index.js"),
      sandbox: false,
    },
  });

  initializeWindowZoom(mainWindow);

  const showMainWindow = () => {
    if (mainWindow.isDestroyed() || mainWindow.isVisible()) {
      return;
    }

    mainWindow.maximize();
    mainWindow.show();
  };

  // 준비되면 최대화 후 표시
  mainWindow.on("ready-to-show", showMainWindow);
  mainWindow.webContents.once("did-finish-load", showMainWindow);

  mainWindow.webContents.setWindowOpenHandler(details => {
    void shell.openExternal(details.url);
    return { action: "deny" };
  });

  void loadRenderer(mainWindow);

  return mainWindow;
};
