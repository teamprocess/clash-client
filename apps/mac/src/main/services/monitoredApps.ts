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
  | "XCODE"
  | "UNITY";

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
  { id: "VSCODE", name: "Visual Studio Code", aliases: ["VS Code", "Code", "Visual Studio Code"] },
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
  { id: "UNITY", name: "Unity", aliases: ["Unity"] },
];

const normalize = (name: string) => name.toLowerCase().trim().replace(/\s+/g, " ");

const isAppNameMatch = (appName: string, alias: string): boolean => {
  const normalizedAppName = normalize(appName);
  const normalizedAlias = normalize(alias);

  if (normalizedAlias === "code") {
    return (
      normalizedAppName === "code" ||
      normalizedAppName.startsWith("code (") ||
      normalizedAppName.startsWith("code -") ||
      normalizedAppName.startsWith("code-")
    );
  }

  return (
    normalizedAppName === normalizedAlias ||
    normalizedAppName.startsWith(`${normalizedAlias} (`) ||
    normalizedAppName.startsWith(`${normalizedAlias} -`) ||
    normalizedAppName.startsWith(`${normalizedAlias}-`) ||
    normalizedAppName.startsWith(`${normalizedAlias} `)
  );
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
