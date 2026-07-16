import type { ElectronAPI } from "@electron-toolkit/preload";
import type { HelpContentKey } from "../shared/helpContent";

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

type StartupUpdatePhase = "checking" | "downloading" | "installing" | "ready" | "error";

interface StartupUpdateState {
  phase: StartupUpdatePhase;
  version: string | null;
  progressPercent: number | null;
  message?: string;
  detail?: string;
}

interface HelpContentUpdatedPayload {
  key: HelpContentKey;
  content: string;
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
  setBadgeCount: (count: number) => Promise<boolean>;
  clearAuthSession: () => Promise<void>;
  persistDevAuthSession: () => Promise<void>;
  checkForUpdates: () => Promise<void>;
  getStartupUpdateStateSync: () => StartupUpdateState;
  getStartupUpdateState: () => Promise<StartupUpdateState>;
  retryStartupUpdate: () => Promise<StartupUpdateState>;
  getHelpContent: (key: HelpContentKey) => Promise<string>;
  onDeepLinkAuth: (callback: (payload: DeepLinkAuthPayload) => void) => () => void;
  onAppChanged: (callback: (app: ActiveApp | null) => void) => () => void;
  onSessionUpdated: (callback: (session: MonitoringSession) => void) => () => void;
  onStartupUpdateStateChanged: (callback: (state: StartupUpdateState) => void) => () => void;
  onHelpContentUpdated: (callback: (payload: HelpContentUpdatedPayload) => void) => () => void;
}

declare global {
  interface Window {
    electron: ElectronAPI;
    api: AppMonitorAPI;
  }
}
