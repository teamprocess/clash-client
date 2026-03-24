export type MajorScoreKey = "web" | "server";
export type SupportedMajorItem = "WEB" | "SERVER";

export const majorScoreToItem: Record<MajorScoreKey, SupportedMajorItem> = {
  web: "WEB",
  server: "SERVER",
};

export const majorLabels: Record<SupportedMajorItem, string> = {
  WEB: "웹",
  SERVER: "서버",
};
