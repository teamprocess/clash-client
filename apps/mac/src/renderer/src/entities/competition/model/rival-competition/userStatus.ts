export const USER_STATUS_LABELS = {
  ONLINE: "온라인",
  OFFLINE: "오프라인",
  AWAY: "자리비움",
  RECONNECTING: "자리비움",
} as const;

export type UserStatus = keyof typeof USER_STATUS_LABELS;
