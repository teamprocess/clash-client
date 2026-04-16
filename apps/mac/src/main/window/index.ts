import { BrowserWindow, shell } from "electron";
import { join } from "path";
import { getRendererEntryUrl } from "../appProtocol";
import { IS_DEV_CHANNEL } from "../runtimeProfile";
import { initializeWindowZoom } from "./zoom";

interface RendererQueryParams {
  appLaunch?: string;
  startupWindow?: string;
}

interface CreateMainWindowOptions {
  appLaunch?: boolean;
}

const buildRendererEntryUrl = (queryParams?: RendererQueryParams) => {
  const entryUrl = getRendererEntryUrl();
  const url = new URL(entryUrl);

  if (queryParams) {
    Object.entries(queryParams).forEach(([key, value]) => {
      if (!value) {
        return;
      }

      url.searchParams.set(key, value);
    });
  }

  return url.toString();
};

// 개발/배포 환경에 맞는 렌더러 URL 로드
const loadRenderer = async (window: BrowserWindow, queryParams?: RendererQueryParams) => {
  const entryUrl = buildRendererEntryUrl(queryParams);

  try {
    await window.loadURL(entryUrl);
  } catch (error) {
    console.error("renderer entry load failed:", entryUrl, error);
  }
};

const registerExternalLinkHandler = (window: BrowserWindow) => {
  window.webContents.setWindowOpenHandler(details => {
    shell.openExternal(details.url);
    return { action: "deny" };
  });
};

const registerDevToolsGuard = (window: BrowserWindow) => {
  if (!IS_DEV_CHANNEL) {
    window.webContents.on("devtools-opened", () => {
      window.webContents.closeDevTools();
    });
  }
};

// 메인 브라우저 윈도우 생성 + 기본 동작 연결
export const createMainWindow = ({ appLaunch = false }: CreateMainWindowOptions = {}) => {
  const mainWindow = new BrowserWindow({
    width: 900,
    height: 670,
    show: false,
    autoHideMenuBar: true,
    backgroundColor: "#2a2b2c",
    webPreferences: {
      preload: join(__dirname, "../preload/index.js"),
      sandbox: false,
      devTools: IS_DEV_CHANNEL,
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

  registerExternalLinkHandler(mainWindow);
  registerDevToolsGuard(mainWindow);

  loadRenderer(mainWindow, appLaunch ? { appLaunch: "1" } : undefined);

  return mainWindow;
};

export const createStartupWindow = () => {
  const startupWindow = new BrowserWindow({
    width: 372,
    height: 404,
    show: false,
    frame: false,
    transparent: true,
    useContentSize: true,
    resizable: false,
    fullscreenable: false,
    minimizable: false,
    maximizable: false,
    movable: false,
    alwaysOnTop: true,
    skipTaskbar: true,
    hiddenInMissionControl: true,
    acceptFirstMouse: true,
    backgroundColor: "#00000000",
    hasShadow: true,
    titleBarStyle: "hidden",
    trafficLightPosition: { x: -100, y: -100 },
    webPreferences: {
      preload: join(__dirname, "../preload/index.js"),
      sandbox: false,
      devTools: IS_DEV_CHANNEL,
    },
  });

  startupWindow.once("ready-to-show", () => {
    if (!startupWindow.isDestroyed()) {
      startupWindow.setAlwaysOnTop(true, "floating");
      startupWindow.show();
    }
  });

  registerExternalLinkHandler(startupWindow);
  registerDevToolsGuard(startupWindow);

  void loadRenderer(startupWindow, { startupWindow: "1" });

  return startupWindow;
};
