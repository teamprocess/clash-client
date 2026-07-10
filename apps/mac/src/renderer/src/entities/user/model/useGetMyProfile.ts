import { useQuery } from "@tanstack/react-query";
import { authApi } from "../api/authApi";
import type { GetMyProfileResponse } from "../api/authApi";
import { SESSION_STORAGE_KEYS } from "@/shared/config/sessionStorage";

export const userQueryKeys = {
  all: ["user"] as const,
  profile: ["user"] as const,
};

export const PROFILE_SYNC_UNTIL_KEY = SESSION_STORAGE_KEYS.profileSyncUntil;
const PROFILE_SYNC_WINDOW_MS = 3 * 60 * 1000;
export const PROFILE_SYNC_INTERVAL_MS = 3000;

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
    queryKey: userQueryKeys.profile,
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

      const profile = query.state.data as GetMyProfileResponse | null;
      if (profile?.githubLinked) {
        clearProfileSyncWindow();
        return false;
      }

      return PROFILE_SYNC_INTERVAL_MS;
    },
    staleTime: 5 * 60 * 1000,
    retry: false,
  });
};
