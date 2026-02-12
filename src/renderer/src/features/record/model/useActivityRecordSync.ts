import { useCallback, useEffect, useRef } from "react";
import type { ActiveApp } from "@/entities/app-monitor";
import { matchMonitoredApp, recordApi, recordQueryKeys } from "@/entities/record";
import { getErrorMessage, queryClient } from "@/shared/lib";

type ServerSessionState =
  | { type: "NONE"; appName: null }
  | { type: "TASK"; appName: null }
  | { type: "ACTIVITY"; appName: string | null };

const SYNC_POLL_MS = 15000;
const APP_CHANGE_DEBOUNCE_MS = 5000;

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
  const pendingTargetsRef = useRef<Array<string | null>>([]);
  const monitoredAppsRef = useRef<string[] | null>(null);
  const serverSessionRef = useRef<ServerSessionState>({ type: "NONE", appName: null });
  const initializedRef = useRef(false);
  const syncingRef = useRef(false);

  const enqueueTarget = useCallback((targetAppName: string | null) => {
    const queue = pendingTargetsRef.current;
    const lastTarget = queue.length > 0 ? queue[queue.length - 1] : null;
    if (lastTarget === targetAppName) {
      return;
    }

    queue.push(targetAppName);
  }, []);

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
      return null;
    }

    return matchMonitoredApp(rawAppName, monitoredApps);
  }, []);

  const stopActivitySession = useCallback(async () => {
    try {
      const stopResponse = await recordApi.stopRecord();
      if (!stopResponse.success) {
        console.error("개발 활동 기록 중지 API 실패 응답:", stopResponse.message);
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
          if (!switchResponse.success) {
            console.error("개발 활동 기록 전환 API 실패 응답:", switchResponse.message);
          }
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
          if (!startResponse.success) {
            console.error("개발 활동 기록 시작 API 실패 응답:", startResponse.message);
          }
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
      while (pendingTargetsRef.current.length > 0) {
        const targetAppName = pendingTargetsRef.current.shift() ?? null;

        if (!initializedRef.current) {
          await loadMonitoredApps();
          serverSessionRef.current = await loadCurrentSession();
          initializedRef.current = true;
        }

        await syncServerSession(targetAppName);
      }
    } finally {
      syncingRef.current = false;
    }
  }, [loadCurrentSession, loadMonitoredApps, syncServerSession]);

  useEffect(() => {
    if (!isElectron) {
      return;
    }

    const currentObservedAppName = activeApp?.appName ?? null;
    // IDE/모니터링 대상 앱이 잡히면 즉시 반영 (전환 누락 방지)
    if (currentObservedAppName !== null) {
      enqueueTarget(currentObservedAppName);
      void flushSync();
      return;
    }

    // IDE를 벗어난 경우(null)만 5초 유예 후 중지 처리
    const debounceTimer = setTimeout(() => {
      enqueueTarget(currentObservedAppName);
      void flushSync();
    }, APP_CHANGE_DEBOUNCE_MS);

    return () => clearTimeout(debounceTimer);
  }, [activeApp?.appName, enqueueTarget, flushSync, isElectron]);

  useEffect(() => {
    if (!isElectron) {
      return;
    }

    const timer = setInterval(() => {
      enqueueTarget(activeApp?.appName ?? null);
      void flushSync();
    }, SYNC_POLL_MS);

    return () => clearInterval(timer);
  }, [activeApp?.appName, enqueueTarget, flushSync, isElectron]);
};
