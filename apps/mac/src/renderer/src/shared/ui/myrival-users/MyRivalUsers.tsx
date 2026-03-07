import { useEffect, useMemo, useState } from "react";
import * as S from "@/features/home/ui/rival/Rival.style";
import { formatTime, MyRivalItem } from "@/shared/lib";
import { Tooltip } from "@/shared/ui";

type MonitoredAppId =
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

const normalize = (name: string) => name.toLowerCase().trim().replace(/\s+/g, " ");

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

const resolveMonitoredApp = (appName: string) => {
  const normalizedAppName = normalize(appName);

  for (const app of MONITORED_APPS) {
    if (normalizedAppName === normalize(app.id)) {
      return app;
    }

    const matched = app.aliases.some(alias => isAppNameMatch(appName, alias));

    if (matched) {
      return app;
    }
  }

  return null;
};

const getUsingAppMeta = (usingApp?: string | null, status?: string) => {
  if (status !== "ONLINE") {
    return { Icon: null, label: "" };
  }

  if (!usingApp) {
    return { Icon: null, label: "자리비움" };
  }

  const resolvedApp = resolveMonitoredApp(usingApp);

  if (!resolvedApp) {
    return { Icon: null, label: "자리비움" };
  }

  const Icon = S.IdeIcons[resolvedApp.id as keyof typeof S.IdeIcons] ?? null;

  return {
    Icon,
    label: resolvedApp.name,
  };
};

export const MyRivalUsers = ({ user, getStatus }: MyRivalItem) => {
  const [displayActiveTime, setDisplayActiveTime] = useState<number>(Number(user.activeTime) || 0);

  useEffect(() => {
    if (user.status !== "ONLINE") return;

    const timerId = setInterval(() => {
      setDisplayActiveTime(prev => prev + 1);
    }, 1000);

    return () => clearInterval(timerId);
  }, [user.status]);

  const renderRivalId = (username: string) => {
    return (
      <Tooltip
        content={username}
        position="top"
        maxWidth="10rem"
        wrapperStyle={{ flex: 1, minWidth: 0 }}
      >
        <S.ProfileMention>
          <span>@{username}</span>
        </S.ProfileMention>
      </Tooltip>
    );
  };

  const { Icon, label } = useMemo(
    () => getUsingAppMeta(user.usingApp, user.status),
    [user.usingApp, user.status]
  );

  return (
    <S.ProfileContainer>
      <S.ProfileBox>
        <S.ProfileContent>
          <S.ProfileIcon />
          <S.NameBox>
            <S.ProfileName>{user.name}</S.ProfileName>
            {renderRivalId(user.username)}
          </S.NameBox>
        </S.ProfileContent>
        <S.Status $status={user.status}>{getStatus(user.status)}</S.Status>
      </S.ProfileBox>

      <S.ActiveBox>
        <S.UsingAppContainer>
          {Icon ? <Icon /> : null}
          {label && <S.UsingAppText>{label}</S.UsingAppText>}
        </S.UsingAppContainer>

        <S.ActiveTime $status={user.status}>{formatTime(displayActiveTime)}</S.ActiveTime>
      </S.ActiveBox>
    </S.ProfileContainer>
  );
};
