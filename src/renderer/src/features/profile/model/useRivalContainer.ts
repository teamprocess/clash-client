export type UserStatus = "ONLINE" | "OFFLINE" | "AWAY";

export type RivalAppKey = "vscode";
export type RivalProfileKey = "default";

export type RivalsResponse = {
  id: number;
  name: string;
  status: UserStatus;
  time: string;
  appName: string;
  appKey: RivalAppKey;
  profileKey: RivalProfileKey;
};

const rivals: RivalsResponse[] = [
  {
    id: 1,
    name: "황정빈",
    status: "ONLINE",
    time: "03:32:12",
    appName: "Visual Studio Code",
    appKey: "vscode",
    profileKey: "default",
  },
  {
    id: 2,
    name: "황정빈",
    status: "OFFLINE",
    time: "03:32:12",
    appName: "Visual Studio Code",
    appKey: "vscode",
    profileKey: "default",
  },
  {
    id: 3,
    name: "황정빈",
    status: "AWAY",
    time: "03:32:12",
    appName: "Visual Studio Code",
    appKey: "vscode",
    profileKey: "default",
  },
  {
    id: 4,
    name: "황정빈",
    status: "ONLINE",
    time: "03:32:12",
    appName: "Visual Studio Code",
    appKey: "vscode",
    profileKey: "default",
  },
];

export const useRivalContainer = () => {
  const maxRivals = 4;
  return { rivals, maxRivals };
};
