export interface MonitoringSession {
  appName: string;
  startTime: Date;
  endTime?: Date;
  duration: number;
}

export interface ActiveApp {
  appName: string;
  startTime: Date;
  currentDuration: number;
}

export interface TrackedApp {
  appName: string;
  sessionStartTime: Date;
  lastActiveTime: Date;
}
