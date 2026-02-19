import type { MonitoredApp } from "../api/recordApi";

const MONITORED_APP_LABELS: Record<MonitoredApp, string> = {
  VSCODE: "VS Code",
  WEBSTORM: "WebStorm",
  INTELLIJ_IDEA: "IntelliJ IDEA",
  PYCHARM: "PyCharm",
  GOLAND: "GoLand",
  PHPSTORM: "PhpStorm",
  RUBYMINE: "RubyMine",
  CLION: "CLion",
  RIDER: "Rider",
  ANDROID_STUDIO: "Android Studio",
  XCODE: "Xcode",
};

const MONITORED_APP_ALIASES: Record<MonitoredApp, string[]> = {
  VSCODE: ["VS Code", "Code", "Visual Studio Code"],
  WEBSTORM: ["WebStorm"],
  INTELLIJ_IDEA: ["IntelliJ IDEA", "IntelliJ IDEA Ultimate", "IntelliJ IDEA Community"],
  PYCHARM: ["PyCharm", "PyCharm Professional", "PyCharm Community", "PyCharm CE"],
  GOLAND: ["GoLand"],
  PHPSTORM: ["PhpStorm"],
  RUBYMINE: ["RubyMine"],
  CLION: ["CLion"],
  RIDER: ["Rider"],
  ANDROID_STUDIO: ["Android Studio"],
  XCODE: ["Xcode"],
};

const normalize = (value: string) => value.toLowerCase().replace(/[^a-z0-9]/g, "");

const getMatchScore = (observed: string, candidate: string): number => {
  const normalizedObserved = normalize(observed);
  const normalizedCandidate = normalize(candidate);
  if (!normalizedObserved || !normalizedCandidate) {
    return 0;
  }

  if (normalizedObserved === normalizedCandidate) {
    return 2;
  }

  if (
    normalizedObserved.includes(normalizedCandidate) ||
    normalizedCandidate.includes(normalizedObserved)
  ) {
    return 1;
  }

  return 0;
};

const resolveMonitoredApp = (appName: string): MonitoredApp | null => {
  let bestMatch: { appId: MonitoredApp; score: number; candidateLength: number } | null = null;

  const monitoredAppIds = Object.keys(MONITORED_APP_LABELS) as MonitoredApp[];

  for (const appId of monitoredAppIds) {
    const candidates = [appId, MONITORED_APP_LABELS[appId], ...MONITORED_APP_ALIASES[appId]];

    for (const candidate of candidates) {
      const score = getMatchScore(appName, candidate);
      if (score === 0) {
        continue;
      }

      const candidateLength = normalize(candidate).length;
      const isBetterMatch =
        !bestMatch ||
        score > bestMatch.score ||
        (score === bestMatch.score && candidateLength > bestMatch.candidateLength);

      if (isBetterMatch) {
        bestMatch = { appId, score, candidateLength };
      }
    }
  }

  return bestMatch?.appId ?? null;
};

export const getMonitoredAppLabel = (appId: MonitoredApp): string => {
  return MONITORED_APP_LABELS[appId];
};

export const matchMonitoredApp = (
  appName: string,
  monitoredApps: MonitoredApp[]
): MonitoredApp | null => {
  const resolved = resolveMonitoredApp(appName);
  if (!resolved) {
    return null;
  }

  return monitoredApps.includes(resolved) ? resolved : null;
};
