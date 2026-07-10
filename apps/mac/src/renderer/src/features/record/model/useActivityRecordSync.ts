import { useCallback, useEffect, useRef } from "react";
import type { ActiveApp } from "@/entities/app-monitor";
import {
  matchMonitoredApp,
  type MonitoredApp,
  recordApi,
  recordQueryKeys,
} from "@/entities/record";
import {
  captureSessionEpoch,
  getErrorMessage,
  isSessionEpochCurrent,
  queryClient,
} from "@/shared/lib";

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
  const sessionEpochRef = useRef(captureSessionEpoch());
  const pendingTargetsRef = useRef<Array<string | null>>([]);
  const monitoredAppsRef = useRef<MonitoredApp[] | null>(null);
  const serverSessionRef = useRef<ServerSessionState>({ type: "NONE", appId: null });
  const requiresFrontmostToRestartRef = useRef(false);
  const initializedEpochRef = useRef<number | null>(null);
  const syncingRef = useRef(false);

  const enqueueTarget = useCallback((targetAppName: string | null) => {
    if (!isSessionEpochCurrent(sessionEpochRef.current)) {
      return;
    }

    const queue = pendingTargetsRef.current;
    if (queue.length > 0 && queue[queue.length - 1] === targetAppName) {
      return;
    }

    queue.push(targetAppName);
  }, []);

  const invalidateToday = useCallback(async (epoch: number) => {
    if (!isSessionEpochCurrent(epoch)) {
      return false;
    }

    await queryClient.invalidateQueries({ queryKey: recordQueryKeys.today });
    return isSessionEpochCurrent(epoch);
  }, []);

  const loadMonitoredApps = useCallback(async (epoch: number) => {
    if (!isSessionEpochCurrent(epoch)) {
      return false;
    }

    try {
      const response = await recordApi.getMonitoredApps();
      if (!isSessionEpochCurrent(epoch)) {
        return false;
      }

      if (response.success && response.data?.apps) {
        monitoredAppsRef.current = response.data.apps;
        return true;
      }
    } catch (error) {
      if (!isSessionEpochCurrent(epoch)) {
        return false;
      }

      const errorMessage = getErrorMessage(error, "활동 기록 가능 앱 목록 조회에 실패했습니다.");
      console.error("활동 기록 가능 앱 목록 조회 실패:", errorMessage, error);
    }

    monitoredAppsRef.current = [];
    return true;
  }, []);

  const loadCurrentSession = useCallback(
    async (epoch: number): Promise<ServerSessionState | null> => {
      if (!isSessionEpochCurrent(epoch)) {
        return null;
      }

      try {
        const response = await recordApi.getCurrentRecord();
        if (!isSessionEpochCurrent(epoch)) {
          return null;
        }

        if (!response.success) {
          return { type: "NONE", appId: null };
        }
        return parseServerSession(response.data);
      } catch (error) {
        if (!isSessionEpochCurrent(epoch)) {
          return null;
        }

        const errorMessage = getErrorMessage(error, "현재 기록 세션 조회에 실패했습니다.");
        console.error("현재 기록 세션 조회 실패:", errorMessage, error);
        return { type: "NONE", appId: null };
      }
    },
    []
  );

  const refreshServerSession = useCallback(
    async (epoch: number): Promise<ServerSessionState | null> => {
      const latestSession = await loadCurrentSession(epoch);
      if (!latestSession || !isSessionEpochCurrent(epoch)) {
        return null;
      }

      serverSessionRef.current = latestSession;
      return latestSession;
    },
    [loadCurrentSession]
  );

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

  const stopDevelopSession = useCallback(
    async (epoch: number) => {
      if (!isSessionEpochCurrent(epoch)) {
        return;
      }

      try {
        const stopResponse = await recordApi.stopRecord();
        if (!isSessionEpochCurrent(epoch)) {
          return;
        }

        if (!stopResponse.success) {
          console.error("개발 기록 중지 API 실패 응답:", stopResponse.message);
          await refreshServerSession(epoch);
          if (!isSessionEpochCurrent(epoch)) {
            return;
          }
          return;
        }

        serverSessionRef.current = { type: "NONE", appId: null };
        await invalidateToday(epoch);
        if (!isSessionEpochCurrent(epoch)) {
          return;
        }
      } catch (error) {
        if (!isSessionEpochCurrent(epoch)) {
          return;
        }

        const errorMessage = getErrorMessage(error, "개발 기록 중지에 실패했습니다.");
        console.error("개발 기록 중지 실패:", errorMessage, error);
        await refreshServerSession(epoch);
        if (!isSessionEpochCurrent(epoch)) {
          return;
        }
      }
    },
    [invalidateToday, refreshServerSession]
  );

  const switchDevelopSession = useCallback(
    async (targetAppId: MonitoredApp, epoch: number) => {
      if (!isSessionEpochCurrent(epoch)) {
        return;
      }

      try {
        const switchResponse = await recordApi.switchDevelopApp({ appId: targetAppId });
        if (!isSessionEpochCurrent(epoch)) {
          return;
        }

        const switchedSession = switchResponse.data?.session;
        if (
          !switchResponse.success ||
          !switchedSession ||
          switchedSession.sessionType !== "DEVELOP"
        ) {
          if (!switchResponse.success) {
            console.error("개발 기록 전환 API 실패 응답:", switchResponse.message);
          }
          await refreshServerSession(epoch);
          if (!isSessionEpochCurrent(epoch)) {
            return;
          }
          return;
        }

        serverSessionRef.current = {
          type: "DEVELOP",
          appId: switchedSession.develop.appId,
        };
        await invalidateToday(epoch);
        if (!isSessionEpochCurrent(epoch)) {
          return;
        }
      } catch (error) {
        if (!isSessionEpochCurrent(epoch)) {
          return;
        }

        const errorMessage = getErrorMessage(error, "개발 기록 전환에 실패했습니다.");
        console.error("개발 기록 전환 실패:", errorMessage, error);
        await refreshServerSession(epoch);
        if (!isSessionEpochCurrent(epoch)) {
          return;
        }
      }
    },
    [invalidateToday, refreshServerSession]
  );

  const startDevelopSession = useCallback(
    async (targetAppId: MonitoredApp, epoch: number) => {
      if (!isSessionEpochCurrent(epoch)) {
        return;
      }

      try {
        const startResponse = await recordApi.startRecord({
          sessionType: "DEVELOP",
          subjectId: null,
          taskId: null,
          appId: targetAppId,
        });
        if (!isSessionEpochCurrent(epoch)) {
          return;
        }

        const startedSession = startResponse.data?.session;
        if (!startResponse.success || !startedSession || startedSession.sessionType !== "DEVELOP") {
          if (!startResponse.success) {
            console.error("개발 기록 시작 API 실패 응답:", startResponse.message);
          }
          await refreshServerSession(epoch);
          if (!isSessionEpochCurrent(epoch)) {
            return;
          }
          return;
        }

        serverSessionRef.current = {
          type: "DEVELOP",
          appId: startedSession.develop.appId,
        };
        await invalidateToday(epoch);
        if (!isSessionEpochCurrent(epoch)) {
          return;
        }
      } catch (error) {
        if (!isSessionEpochCurrent(epoch)) {
          return;
        }

        const errorMessage = getErrorMessage(error, "개발 기록 시작에 실패했습니다.");
        console.error("개발 기록 시작 실패:", errorMessage, error);
        await refreshServerSession(epoch);
        if (!isSessionEpochCurrent(epoch)) {
          return;
        }
      }
    },
    [invalidateToday, refreshServerSession]
  );

  const syncServerSession = useCallback(
    async (rawTargetAppName: string | null, epoch: number) => {
      if (!isSessionEpochCurrent(epoch)) {
        return;
      }

      const targetAppId = normalizeTargetAppId(rawTargetAppName);
      const serverSession = await refreshServerSession(epoch);
      if (!serverSession || !isSessionEpochCurrent(epoch)) {
        return;
      }

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

        await stopDevelopSession(epoch);
        if (!isSessionEpochCurrent(epoch)) {
          return;
        }
        return;
      }

      if (serverSession.type === "DEVELOP") {
        if (serverSession.appId === targetAppId) {
          return;
        }
        await switchDevelopSession(targetAppId, epoch);
        if (!isSessionEpochCurrent(epoch)) {
          return;
        }
        return;
      }

      if (!isFrontmostMonitoredApp) {
        return;
      }

      await startDevelopSession(targetAppId, epoch);
      if (!isSessionEpochCurrent(epoch)) {
        return;
      }

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
    const renderSessionEpoch = sessionEpochRef.current;
    const epoch = captureSessionEpoch();
    if (epoch !== renderSessionEpoch || !isSessionEpochCurrent(epoch)) {
      return;
    }

    if (syncingRef.current) {
      return;
    }

    syncingRef.current = true;
    try {
      while (pendingTargetsRef.current.length > 0) {
        if (!isSessionEpochCurrent(epoch)) {
          pendingTargetsRef.current = [];
          return;
        }

        const targetAppName = pendingTargetsRef.current.shift() ?? null;

        if (initializedEpochRef.current !== epoch) {
          monitoredAppsRef.current = null;
          serverSessionRef.current = { type: "NONE", appId: null };
          requiresFrontmostToRestartRef.current = false;

          const monitoredAppsLoaded = await loadMonitoredApps(epoch);
          if (!monitoredAppsLoaded || !isSessionEpochCurrent(epoch)) {
            pendingTargetsRef.current = [];
            return;
          }

          const currentSession = await loadCurrentSession(epoch);
          if (!currentSession || !isSessionEpochCurrent(epoch)) {
            pendingTargetsRef.current = [];
            return;
          }

          serverSessionRef.current = currentSession;
          initializedEpochRef.current = epoch;
        }

        await syncServerSession(targetAppName, epoch);
        if (!isSessionEpochCurrent(epoch)) {
          pendingTargetsRef.current = [];
          return;
        }
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
