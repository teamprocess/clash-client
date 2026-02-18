import { ipcMain, shell } from "electron";
import type { AppMonitor } from "../services";

// AppMonitor 및 외부 URL 열기 관련 IPC를 등록합니다.
export const registerIpcHandlers = (getAppMonitor: () => AppMonitor | null) => {
  // 앱 모니터링
  ipcMain.handle("app-monitor:start", async () => {
    await getAppMonitor()?.start();
  });
  ipcMain.handle("app-monitor:stop", () => {
    getAppMonitor()?.stop();
  });

  // 현재 상태 조회
  ipcMain.handle("app-monitor:get-active", () => {
    return getAppMonitor()?.getActiveApp() ?? null;
  });
  ipcMain.handle("app-monitor:get-sessions", () => {
    return getAppMonitor()?.getSessions() ?? [];
  });
  ipcMain.handle("app-monitor:get-frontmost-monitored-app", () => {
    return getAppMonitor()?.getFrontmostMonitoredAppName() ?? null;
  });
  ipcMain.handle("open-external-url", async (_, url: string) => {
    await shell.openExternal(url);
  });
};
