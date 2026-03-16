import { ElectronAPI } from "@electron-toolkit/preload";

interface ActiveApp {
  appName: string;
  startTime: Date;
  currentDuration: number;
}

interface DeepLinkAuthPayload {
  code: string;
  state: string;
  url: string;
}

interface MonitoringSession {
  appName: string;
  startTime: Date;
  endTime?: Date;
  duration: number;
}

interface CursorScreenPoint {
  x: number;
  y: number;
}

interface AppMonitorAPI {
  startMonitoring: () => Promise<void>;
  stopMonitoring: () => Promise<void>;
  getActiveApp: () => Promise<ActiveApp | null>;
  getSessions: () => Promise<MonitoringSession[]>;
  getFrontmostMonitoredApp: () => Promise<string | null>;
  getCursorScreenPoint: () => Promise<CursorScreenPoint>;
  uploadFileToPresignedUrl: (
    uploadUrl: string,
    fileBytes: Uint8Array,
    contentType: string
  ) => Promise<void>;
  openExternalUrl: (url: string) => Promise<void>;
  clearAuthSession: () => Promise<void>;
  onDeepLinkAuth: (callback: (payload: DeepLinkAuthPayload) => void) => () => void;
  onAppChanged: (callback: (app: ActiveApp | null) => void) => () => void;
  onSessionUpdated: (callback: (session: MonitoringSession) => void) => () => void;
}

declare global {
  interface Window {
    electron: ElectronAPI;
    api: AppMonitorAPI;
  }
}
