export const SESSION_STORAGE_KEYS = {
  githubPendingState: "clash:github:pending-state",
  profileSyncUntil: "clash:home-ranking-user:profile-sync-until",
} as const;

export const AUTH_SESSION_STORAGE_KEYS = Object.values(SESSION_STORAGE_KEYS);
