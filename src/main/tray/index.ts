import { existsSync } from "fs";
import { join } from "path";
import { app, BrowserWindow, Menu, Tray, nativeImage } from "electron";

interface RegisterTrayParams {
  getMainWindow: () => BrowserWindow | null;
}

let tray: Tray | null = null;
let isQuitting = false;

const TRAY_ICON_SIZE = 18;

const resolveTrayIconPath = () => {
  const candidates = [
    join(process.resourcesPath, "app.asar.unpacked/resources/clash-icon.png"),
    join(process.resourcesPath, "app.asar.unpacked/resources/clash-icon.icns"),
    join(process.resourcesPath, "resources/clash-icon.png"),
    join(process.resourcesPath, "resources/clash-icon.icns"),
    join(process.cwd(), "resources/clash-icon.png"),
    join(process.cwd(), "resources/clash-icon.icns"),
    join(__dirname, "../../resources/clash-icon.png"),
    join(__dirname, "../../resources/clash-icon.icns"),
  ];

  return candidates.find(path => existsSync(path)) ?? null;
};

const createTrayIcon = () => {
  const iconPath = resolveTrayIconPath();
  if (!iconPath) {
    return null;
  }

  const icon = nativeImage.createFromPath(iconPath);
  if (icon.isEmpty()) {
    return null;
  }

  return icon.resize({
    width: TRAY_ICON_SIZE,
    height: TRAY_ICON_SIZE,
  });
};

const focusMainWindow = (window: BrowserWindow | null) => {
  if (!window || window.isDestroyed()) {
    return;
  }

  if (window.isMinimized()) {
    window.restore();
  }

  window.show();
  window.focus();
};

// 창 닫기 시 숨김, 트레이에서 다시 열기/종료
export const registerTray = ({ getMainWindow }: RegisterTrayParams) => {
  if (process.platform !== "darwin" || tray) {
    return;
  }

  const icon = createTrayIcon();
  if (!icon) {
    console.error("트레이 아이콘을 로드하지 못해 트레이 기능을 비활성화합니다.");
    return;
  }

  const openMainWindow = () => {
    focusMainWindow(getMainWindow());
  };

  tray = new Tray(icon);
  tray.setToolTip("Clash");
  tray.setContextMenu(
    Menu.buildFromTemplate([
      { label: "열기", click: openMainWindow },
      { type: "separator" },
      {
        label: "종료",
        click: () => {
          isQuitting = true;
          app.quit();
        },
      },
    ])
  );
  tray.on("click", openMainWindow);

  app.on("before-quit", () => {
    isQuitting = true;
  });

  app.on("will-quit", () => {
    tray?.destroy();
    tray = null;
  });

  app.on("browser-window-created", (_, window) => {
    window.on("close", event => {
      const mainWindow = getMainWindow();
      if (!mainWindow || window !== mainWindow) {
        return;
      }

      if (isQuitting) {
        return;
      }

      event.preventDefault();
      mainWindow.hide();
    });
  });
};
