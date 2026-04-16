import { contextBridge, ipcRenderer } from "electron";
import { electronAPI } from "@electron-toolkit/preload";

// 클라이언트 렌더링을 위한 커스텀 API
const api = {
  startMonitoring: () => ipcRenderer.invoke("app-monitor:start"),
  stopMonitoring: () => ipcRenderer.invoke("app-monitor:stop"),
  getActiveApp: () => ipcRenderer.invoke("app-monitor:get-active"),
  getSessions: () => ipcRenderer.invoke("app-monitor:get-sessions"),
  getFrontmostMonitoredApp: () => ipcRenderer.invoke("app-monitor:get-frontmost-monitored-app"),
  getCursorScreenPoint: () => ipcRenderer.invoke("system:get-cursor-screen-point"),
  uploadFileToPresignedUrl: (uploadUrl: string, fileBytes: Uint8Array, contentType: string) =>
    ipcRenderer.invoke("profile-image:upload-to-presigned-url", {
      uploadUrl,
      fileBytes,
      contentType,
    }),

  openExternalUrl: (url: string) => ipcRenderer.invoke("open-external-url", url),
  clearAuthSession: () => ipcRenderer.invoke("auth:clear-session"),
  checkForUpdates: () => ipcRenderer.invoke("app:check-for-updates"),
  getStartupUpdateStateSync: () => ipcRenderer.sendSync("app:get-startup-update-state-sync"),
  getStartupUpdateState: () => ipcRenderer.invoke("app:get-startup-update-state"),
  retryStartupUpdate: () => ipcRenderer.invoke("app:retry-startup-update"),

  onAppChanged: callback => {
    const subscription = (_, app) => callback(app);
    ipcRenderer.on("app-monitor:app-changed", subscription);
    return () => ipcRenderer.removeListener("app-monitor:app-changed", subscription);
  },

  onSessionUpdated: callback => {
    const subscription = (_, session) => callback(session);
    ipcRenderer.on("app-monitor:session-updated", subscription);
    return () => ipcRenderer.removeListener("app-monitor:session-updated", subscription);
  },

  onDeepLinkAuth: callback => {
    const subscription = (_, payload) => callback(payload);
    ipcRenderer.on("deep-link-auth", subscription);
    return () => ipcRenderer.removeListener("deep-link-auth", subscription);
  },

  onStartupUpdateStateChanged: callback => {
    const subscription = (_, state) => callback(state);
    ipcRenderer.on("app:startup-update-state-changed", subscription);
    return () => ipcRenderer.removeListener("app:startup-update-state-changed", subscription);
  },
};

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld("electron", electronAPI);
    contextBridge.exposeInMainWorld("api", api);
  } catch (error) {
    console.error(error);
  }
} else {
  // @ts-ignore (define in dts)
  window.electron = electronAPI;
  // @ts-ignore (define in dts)
  window.api = api;
}
