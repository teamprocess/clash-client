import { useQuery } from "@tanstack/react-query";
import { authApi } from "../api/authApi";

const PROFILE_SYNC_UNTIL_KEY = "clash:user:profile-sync-until";
const PROFILE_SYNC_WINDOW_MS = 3 * 60 * 1000;
const PROFILE_SYNC_INTERVAL_MS = 3000;

const getProfileSyncUntil = (): number | null => {
  if (typeof window === "undefined") {
    return null;
  }

  const raw = window.sessionStorage.getItem(PROFILE_SYNC_UNTIL_KEY);
  if (!raw) {
    return null;
  }

  const parsed = Number(raw);
  return Number.isFinite(parsed) ? parsed : null;
};

const clearProfileSyncWindow = () => {
  if (typeof window === "undefined") {
    return;
  }
  window.sessionStorage.removeItem(PROFILE_SYNC_UNTIL_KEY);
};

export const startUserProfileSyncWindow = (durationMs = PROFILE_SYNC_WINDOW_MS) => {
  if (typeof window === "undefined") {
    return;
  }
  window.sessionStorage.setItem(PROFILE_SYNC_UNTIL_KEY, String(Date.now() + durationMs));
};

export const useGetMyProfile = () => {
  return useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const response = await authApi.getMyProfile();
      return response.data;
    },
    refetchInterval: query => {
      const syncUntil = getProfileSyncUntil();
      if (!syncUntil) {
        return false;
      }

      if (Date.now() >= syncUntil) {
        clearProfileSyncWindow();
        return false;
      }

      const response = query.state.data as
        | Awaited<ReturnType<typeof authApi.getMyProfile>>
        | undefined;
      if (response?.data?.githubLinked) {
        clearProfileSyncWindow();
        return false;
      }

      return PROFILE_SYNC_INTERVAL_MS;
    },
    staleTime: 5 * 60 * 1000,
    retry: false,
  });
};
