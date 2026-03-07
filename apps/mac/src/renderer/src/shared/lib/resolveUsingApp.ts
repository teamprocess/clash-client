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

export interface ResolvedUsingApp {
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
];

// 문자열 정규화
const normalize = (name: string) => name.toLowerCase().trim().replace(/\s+/g, " ");

// 앱 이름 매칭
const isAppNameMatch = (appName: string, alias: string) => {
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

// 원본 앱 이름을 공통 앱 정보로 변환
export const resolveUsingApp = (appName?: string | null): ResolvedUsingApp | null => {
  if (!appName) return null;

  const normalizedAppName = normalize(appName);

  for (const app of MONITORED_APPS) {
    if (normalizedAppName === normalize(app.id)) {
      return { id: app.id, name: app.name };
    }

    const matched = app.aliases.some(alias => isAppNameMatch(appName, alias));

    if (matched) {
      return { id: app.id, name: app.name };
    }
  }

  return null;
};
