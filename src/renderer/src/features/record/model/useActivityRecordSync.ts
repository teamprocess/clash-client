import { useCallback, useEffect, useRef } from "react";
import type { ActiveApp } from "@/entities/app-monitor";
import { recordApi, recordQueryKeys } from "@/entities/record";
import { getErrorMessage, queryClient } from "@/shared/lib";

type ServerSessionState =
  | { type: "NONE"; appName: null }
  | { type: "TASK"; appName: null }
  | { type: "ACTIVITY"; appName: string | null };

const SYNC_POLL_MS = 15000;
const APP_CHANGE_DEBOUNCE_MS = 5000;

const matchMonitoredApp = (appName: string, monitoredApps: string[]) => {
  const loweredName = appName.toLowerCase();
  return (
    monitoredApps.find(candidate => {
      const loweredCandidate = candidate.toLowerCase();
      return loweredName.includes(loweredCandidate) || loweredCandidate.includes(loweredName);
    }) ?? null
  );
};

const parseServerSession = (
  data: Awaited<ReturnType<typeof recordApi.getCurrentRecord>>["data"]
) => {
  if (!data) {
    return { type: "NONE", appName: null } satisfies ServerSessionState;
  }

  if (data.recordType === "TASK") {
    return { type: "TASK", appName: null } satisfies ServerSessionState;
  }

  return {
    type: "ACTIVITY",
    appName: data.activity?.appName ?? null,
  } satisfies ServerSessionState;
};

export const useActivityRecordSync = (activeApp: ActiveApp | null, isElectron: boolean) => {
  const targetAppNameRef = useRef<string | null>(null);
  const monitoredAppsRef = useRef<string[] | null>(null);
  const serverSessionRef = useRef<ServerSessionState>({ type: "NONE", appName: null });
  const initializedRef = useRef(false);
  const syncingRef = useRef(false);
  const pendingRef = useRef(false);

  const invalidateToday = useCallback(async () => {
    await queryClient.invalidateQueries({ queryKey: recordQueryKeys.today });
  }, []);

  const loadMonitoredApps = useCallback(async () => {
    try {
      const response = await recordApi.getMonitoredApps();
      if (response.success && response.data?.apps) {
        monitoredAppsRef.current = response.data.apps;
        return;
      }
    } catch (error) {
      const errorMessage = getErrorMessage(error, "활동 기록 가능 앱 목록 조회에 실패했습니다.");
      console.error("활동 기록 가능 앱 목록 조회 실패:", errorMessage, error);
    }

    monitoredAppsRef.current = [];
  }, []);

  const loadCurrentSession = useCallback(async (): Promise<ServerSessionState> => {
    try {
      const response = await recordApi.getCurrentRecord();
      if (!response.success) {
        return { type: "NONE", appName: null };
      }
      return parseServerSession(response.data);
    } catch (error) {
      const errorMessage = getErrorMessage(error, "현재 기록 세션 조회에 실패했습니다.");
      console.error("현재 기록 세션 조회 실패:", errorMessage, error);
      return { type: "NONE", appName: null };
    }
  }, []);

  const refreshServerSession = useCallback(async (): Promise<ServerSessionState> => {
    const latestSession = await loadCurrentSession();
    serverSessionRef.current = latestSession;
    return latestSession;
  }, [loadCurrentSession]);

  const normalizeTargetAppName = useCallback((rawAppName: string | null) => {
    if (!rawAppName) {
      return null;
    }

    const monitoredApps = monitoredAppsRef.current;
    if (!monitoredApps || monitoredApps.length === 0) {
      return rawAppName;
    }

    return matchMonitoredApp(rawAppName, monitoredApps) ?? rawAppName;
  }, []);

  const stopActivitySession = useCallback(async () => {
    try {
      const stopResponse = await recordApi.stopRecord();
      if (!stopResponse.success) {
        await refreshServerSession();
        return;
      }

      serverSessionRef.current = { type: "NONE", appName: null };
      await invalidateToday();
    } catch (error) {
      const errorMessage = getErrorMessage(error, "개발 활동 기록 중지에 실패했습니다.");
      console.error("개발 활동 기록 중지 실패:", errorMessage, error);
      await refreshServerSession();
    }
  }, [invalidateToday, refreshServerSession]);

  const switchActivitySession = useCallback(
    async (targetAppName: string) => {
      try {
        const switchResponse = await recordApi.switchActivityApp({ appName: targetAppName });
        const switchedSession = switchResponse.data?.session;
        if (
          !switchResponse.success ||
          !switchedSession ||
          switchedSession.recordType !== "ACTIVITY"
        ) {
          await refreshServerSession();
          return;
        }

        serverSessionRef.current = {
          type: "ACTIVITY",
          appName: switchedSession.activity.appName,
        };
        await invalidateToday();
      } catch (error) {
        const errorMessage = getErrorMessage(error, "개발 활동 기록 전환에 실패했습니다.");
        console.error("개발 활동 기록 전환 실패:", errorMessage, error);
        await refreshServerSession();
      }
    },
    [invalidateToday, refreshServerSession]
  );

  const startActivitySession = useCallback(
    async (targetAppName: string) => {
      try {
        const startResponse = await recordApi.startRecord({
          recordType: "ACTIVITY",
          appName: targetAppName,
        });
        const startedSession = startResponse.data?.session;
        if (!startResponse.success || !startedSession || startedSession.recordType !== "ACTIVITY") {
          await refreshServerSession();
          return;
        }

        serverSessionRef.current = {
          type: "ACTIVITY",
          appName: startedSession.activity.appName,
        };
        await invalidateToday();
      } catch (error) {
        const errorMessage = getErrorMessage(error, "개발 활동 기록 시작에 실패했습니다.");
        console.error("개발 활동 기록 시작 실패:", errorMessage, error);
        await refreshServerSession();
      }
    },
    [invalidateToday, refreshServerSession]
  );

  const syncServerSession = useCallback(
    async (rawTargetAppName: string | null) => {
      const targetAppName = normalizeTargetAppName(rawTargetAppName);
      let serverSession = serverSessionRef.current;

      // TASK 세션이면 활동 자동 기록은 건드리지 않음 (기존 기록 흐름 우선)
      if (serverSession.type === "TASK") {
        serverSession = await refreshServerSession();
        if (serverSession.type === "TASK") {
          return;
        }
      }

      if (targetAppName === null) {
        if (serverSession.type !== "ACTIVITY") {
          return;
        }

        serverSession = await refreshServerSession();
        if (serverSession.type !== "ACTIVITY") {
          return;
        }

        await stopActivitySession();
        return;
      }

      if (serverSession.type === "ACTIVITY" && serverSession.appName === targetAppName) {
        return;
      }

      // start/switch 직전에 서버 최신 세션을 다시 보고 조작 대상이 맞는지 검증
      serverSession = await refreshServerSession();
      if (serverSession.type === "TASK") {
        return;
      }

      if (serverSession.type === "ACTIVITY") {
        if (serverSession.appName === targetAppName) {
          return;
        }
        await switchActivitySession(targetAppName);
        return;
      }

      await startActivitySession(targetAppName);
    },
    [
      normalizeTargetAppName,
      refreshServerSession,
      startActivitySession,
      stopActivitySession,
      switchActivitySession,
    ]
  );

  const flushSync = useCallback(async () => {
    if (syncingRef.current) {
      return;
    }

    syncingRef.current = true;
    try {
      while (pendingRef.current) {
        pendingRef.current = false;

        if (!initializedRef.current) {
          await loadMonitoredApps();
          serverSessionRef.current = await loadCurrentSession();
          initializedRef.current = true;
        }

        await syncServerSession(targetAppNameRef.current);
      }
    } finally {
      syncingRef.current = false;
    }
  }, [loadCurrentSession, loadMonitoredApps, syncServerSession]);

  useEffect(() => {
    if (!isElectron) {
      return;
    }

    const debounceTimer = setTimeout(() => {
      targetAppNameRef.current = activeApp?.appName ?? null;
      pendingRef.current = true;
      void flushSync();
    }, APP_CHANGE_DEBOUNCE_MS);

    return () => clearTimeout(debounceTimer);
  }, [activeApp?.appName, flushSync, isElectron]);

  useEffect(() => {
    if (!isElectron) {
      return;
    }

    const timer = setInterval(() => {
      pendingRef.current = true;
      void flushSync();
    }, SYNC_POLL_MS);

    return () => clearInterval(timer);
  }, [flushSync, isElectron]);
};
