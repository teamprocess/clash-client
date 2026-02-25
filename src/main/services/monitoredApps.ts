export type MonitoredAppId =
  | "VSCODE"
  | "WEBSTORM"
  | "INTELLIJ_IDEA"
  | "PYCHARM"
  | "GOLAND"
  | "PHPSTORM"
  | "RUBYMINE"
  | "CLION"
  | "RIDER"
  | "ANDROID_STUDIO"
  | "XCODE";

interface MonitoredAppDefinition {
  id: MonitoredAppId;
  name: string;
  aliases: string[];
}

export interface MonitoredAppInfo {
  id: MonitoredAppId;
  name: string;
}

const MONITORED_APPS: MonitoredAppDefinition[] = [
  { id: "VSCODE", name: "VS Code", aliases: ["VS Code", "Code", "Visual Studio Code"] },
  { id: "WEBSTORM", name: "WebStorm", aliases: ["WebStorm"] },
  {
    id: "INTELLIJ_IDEA",
    name: "IntelliJ IDEA",
    aliases: ["IntelliJ IDEA", "IntelliJ IDEA Ultimate", "IntelliJ IDEA Community"],
  },
  {
    id: "PYCHARM",
    name: "PyCharm",
    aliases: ["PyCharm", "PyCharm Professional", "PyCharm Community", "PyCharm CE"],
  },
  { id: "GOLAND", name: "GoLand", aliases: ["GoLand"] },
  { id: "PHPSTORM", name: "PhpStorm", aliases: ["PhpStorm"] },
  { id: "RUBYMINE", name: "RubyMine", aliases: ["RubyMine"] },
  { id: "CLION", name: "CLion", aliases: ["CLion"] },
  { id: "RIDER", name: "Rider", aliases: ["Rider"] },
  { id: "ANDROID_STUDIO", name: "Android Studio", aliases: ["Android Studio"] },
  { id: "XCODE", name: "Xcode", aliases: ["Xcode"] },
];

const isAppNameMatch = (left: string, right: string): boolean => {
  const normalizedLeft = left.toLowerCase();
  const normalizedRight = right.toLowerCase();
  return normalizedLeft.includes(normalizedRight) || normalizedRight.includes(normalizedLeft);
};

// 원본 앱 이름을 모니터링 앱 정보(id/name)로 정규화
export const resolveMonitoredApp = (appName: string): MonitoredAppInfo | null => {
  for (const app of MONITORED_APPS) {
    const matched = app.aliases.some(alias => isAppNameMatch(appName, alias));
    if (matched) {
      return { id: app.id, name: app.name };
    }
  }

  return null;
};

// 기존 호출부 호환을 위한 이름 조회
export const resolveMonitoredAppName = (appName: string): string | null => {
  return resolveMonitoredApp(appName)?.name ?? null;
};

// 서버 전송용 앱 id 조회
export const resolveMonitoredAppId = (appName: string): MonitoredAppId | null => {
  return resolveMonitoredApp(appName)?.id ?? null;
};

// 추적 이름과 실행 중 이름이 같은 앱인지 비교
export const isSameMonitoredAppName = (trackedAppName: string, runningAppName: string): boolean => {
  const trackedApp = resolveMonitoredApp(trackedAppName);
  const runningApp = resolveMonitoredApp(runningAppName);
  if (!trackedApp || !runningApp) {
    return false;
  }

  return trackedApp.id === runningApp.id;
};
