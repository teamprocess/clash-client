import { useCallback, useEffect, useRef } from "react";
import type { ActiveApp } from "@/entities/app-monitor";
import {
  matchMonitoredApp,
  type MonitoredApp,
  recordApi,
  recordQueryKeys,
} from "@/entities/record";
import { getErrorMessage, queryClient } from "@/shared/lib";

type ServerSessionState =
  | { type: "NONE"; appId: null }
  | { type: "TASK"; appId: null }
  | { type: "DEVELOP"; appId: MonitoredApp | null };

const SYNC_POLL_MS = 15000;

const parseServerSession = (
  data: Awaited<ReturnType<typeof recordApi.getCurrentRecord>>["data"]
) => {
  if (!data) {
    return { type: "NONE", appId: null } satisfies ServerSessionState;
  }

  if (data.sessionType === "TASK") {
    return { type: "TASK", appId: null } satisfies ServerSessionState;
  }

  return {
    type: "DEVELOP",
    appId: data.develop?.appId ?? null,
  } satisfies ServerSessionState;
};

export const useActivityRecordSync = (
  activeApp: ActiveApp | null,
  isElectron: boolean,
  isFrontmostMonitoredApp: boolean,
  isReady: boolean
) => {
  const pendingTargetsRef = useRef<Array<string | null>>([]);
  const monitoredAppsRef = useRef<MonitoredApp[] | null>(null);
  const serverSessionRef = useRef<ServerSessionState>({ type: "NONE", appId: null });
  const requiresFrontmostToRestartRef = useRef(false);
  const initializedRef = useRef(false);
  const syncingRef = useRef(false);

  const enqueueTarget = useCallback((targetAppName: string | null) => {
    const queue = pendingTargetsRef.current;
    if (queue.length > 0 && queue[queue.length - 1] === targetAppName) {
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
        return { type: "NONE", appId: null };
      }
      return parseServerSession(response.data);
    } catch (error) {
      const errorMessage = getErrorMessage(error, "현재 기록 세션 조회에 실패했습니다.");
      console.error("현재 기록 세션 조회 실패:", errorMessage, error);
      return { type: "NONE", appId: null };
    }
  }, []);

  const refreshServerSession = useCallback(async (): Promise<ServerSessionState> => {
    const latestSession = await loadCurrentSession();
    serverSessionRef.current = latestSession;
    return latestSession;
  }, [loadCurrentSession]);

  const normalizeTargetAppId = useCallback((rawAppName: string | null) => {
    if (!rawAppName) {
      return null;
    }

    const monitoredApps = monitoredAppsRef.current;
    if (!monitoredApps || monitoredApps.length === 0) {
      return null;
    }

    return matchMonitoredApp(rawAppName, monitoredApps);
  }, []);

  const stopDevelopSession = useCallback(async () => {
    try {
      const stopResponse = await recordApi.stopRecord();
      if (!stopResponse.success) {
        console.error("개발 기록 중지 API 실패 응답:", stopResponse.message);
        await refreshServerSession();
        return;
      }

      serverSessionRef.current = { type: "NONE", appId: null };
      await invalidateToday();
    } catch (error) {
      const errorMessage = getErrorMessage(error, "개발 기록 중지에 실패했습니다.");
      console.error("개발 기록 중지 실패:", errorMessage, error);
      await refreshServerSession();
    }
  }, [invalidateToday, refreshServerSession]);

  const switchDevelopSession = useCallback(
    async (targetAppId: MonitoredApp) => {
      try {
        const switchResponse = await recordApi.switchDevelopApp({ appId: targetAppId });
        const switchedSession = switchResponse.data?.session;
        if (
          !switchResponse.success ||
          !switchedSession ||
          switchedSession.sessionType !== "DEVELOP"
        ) {
          if (!switchResponse.success) {
            console.error("개발 기록 전환 API 실패 응답:", switchResponse.message);
          }
          await refreshServerSession();
          return;
        }

        serverSessionRef.current = {
          type: "DEVELOP",
          appId: switchedSession.develop.appId,
        };
        await invalidateToday();
      } catch (error) {
        const errorMessage = getErrorMessage(error, "개발 기록 전환에 실패했습니다.");
        console.error("개발 기록 전환 실패:", errorMessage, error);
        await refreshServerSession();
      }
    },
    [invalidateToday, refreshServerSession]
  );

  const startDevelopSession = useCallback(
    async (targetAppId: MonitoredApp) => {
      try {
        const startResponse = await recordApi.startRecord({
          sessionType: "DEVELOP",
          subjectId: null,
          taskId: null,
          appId: targetAppId,
        });
        const startedSession = startResponse.data?.session;
        if (!startResponse.success || !startedSession || startedSession.sessionType !== "DEVELOP") {
          if (!startResponse.success) {
            console.error("개발 기록 시작 API 실패 응답:", startResponse.message);
          }
          await refreshServerSession();
          return;
        }

        serverSessionRef.current = {
          type: "DEVELOP",
          appId: startedSession.develop.appId,
        };
        await invalidateToday();
      } catch (error) {
        const errorMessage = getErrorMessage(error, "개발 기록 시작에 실패했습니다.");
        console.error("개발 기록 시작 실패:", errorMessage, error);
        await refreshServerSession();
      }
    },
    [invalidateToday, refreshServerSession]
  );

  const syncServerSession = useCallback(
    async (rawTargetAppName: string | null) => {
      const targetAppId = normalizeTargetAppId(rawTargetAppName);
      const serverSession = await refreshServerSession();

      if (serverSession.type === "TASK") {
        requiresFrontmostToRestartRef.current = true;
        return;
      }

      if (serverSession.type === "DEVELOP") {
        requiresFrontmostToRestartRef.current = false;
      } else if (requiresFrontmostToRestartRef.current && !isFrontmostMonitoredApp) {
        return;
      }

      if (targetAppId === null) {
        if (serverSession.type !== "DEVELOP") {
          return;
        }

        await stopDevelopSession();
        return;
      }

      if (serverSession.type === "DEVELOP") {
        if (serverSession.appId === targetAppId) {
          return;
        }
        await switchDevelopSession(targetAppId);
        return;
      }

      if (!isFrontmostMonitoredApp) {
        return;
      }

      await startDevelopSession(targetAppId);
      requiresFrontmostToRestartRef.current = false;
    },
    [
      isFrontmostMonitoredApp,
      normalizeTargetAppId,
      refreshServerSession,
      startDevelopSession,
      stopDevelopSession,
      switchDevelopSession,
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
    if (!isElectron || !isReady) {
      return;
    }

    const currentObservedAppName = activeApp?.appName ?? null;
    enqueueTarget(currentObservedAppName);
    void flushSync();
  }, [activeApp?.appName, enqueueTarget, flushSync, isElectron, isReady]);

  useEffect(() => {
    if (!isElectron || !isReady) {
      return;
    }

    const timer = setInterval(() => {
      enqueueTarget(activeApp?.appName ?? null);
      void flushSync();
    }, SYNC_POLL_MS);

    return () => clearInterval(timer);
  }, [activeApp?.appName, enqueueTarget, flushSync, isElectron, isReady]);
};
