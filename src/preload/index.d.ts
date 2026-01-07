import { ElectronAPI } from "@electron-toolkit/preload";

interface ActiveApp {
  appName: string;
  startTime: Date;
  currentDuration: number;
}

interface MonitoringSession {
  appName: string;
  startTime: Date;
  endTime?: Date;
  duration: number;
}

interface AppMonitorAPI {
  startMonitoring: () => Promise<void>;
  stopMonitoring: () => Promise<void>;
  getActiveApp: () => Promise<ActiveApp | null>;
  getSessions: () => Promise<MonitoringSession[]>;
  onAppChanged: (callback: (app: ActiveApp | null) => void) => () => void;
  onSessionUpdated: (callback: (session: MonitoringSession) => void) => () => void;
}

declare global {
  interface Window {
    electron: ElectronAPI;
    api: AppMonitorAPI;
  }
}
