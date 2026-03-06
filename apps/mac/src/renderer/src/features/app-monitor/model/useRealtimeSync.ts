import { useCallback, useEffect, useRef } from "react";
import { io, type Socket } from "socket.io-client";
import { groupQueryKeys } from "@/entities/group";
import { noticeQueryKeys } from "@/entities/notice";
import { recordQueryKeys, useRecordTodayQuery } from "@/entities/record";
import { realtimeApi } from "@/shared/api";
import { socketConfig } from "@/shared/config/socket";
import { queryClient } from "@/shared/lib";

const RECONNECT_DELAY_MS = 3000;
const AWAY_THRESHOLD_MS = 5 * 60 * 1000;
const PRESENCE_CHECK_INTERVAL_MS = 5000;
const FRONTMOST_APP_POLL_MS = 2000;
const CURSOR_POLL_MS = 60 * 1000;

type PresenceStatus = "ONLINE" | "AWAY";
type CursorScreenPoint = {
  x: number;
  y: number;
};

const invalidateGroupQueries = async () => {
  await Promise.all([
    queryClient.invalidateQueries({ queryKey: groupQueryKeys.allGroups }),
    queryClient.invalidateQueries({ queryKey: groupQueryKeys.myGroups }),
    queryClient.invalidateQueries({ queryKey: groupQueryKeys.groupActivity }),
    queryClient.invalidateQueries({ queryKey: groupQueryKeys.groupDetail }),
  ]);
};

const invalidateCompeteQueries = async () => {
  await Promise.all([
    queryClient.invalidateQueries({ queryKey: ["myRivals"] }),
    queryClient.invalidateQueries({ queryKey: ["compareRivals"] }),
    queryClient.invalidateQueries({ queryKey: ["battleInfo"] }),
    queryClient.invalidateQueries({ queryKey: ["battleDetail"] }),
    queryClient.invalidateQueries({ queryKey: ["battleAnalyze"] }),
    queryClient.invalidateQueries({ queryKey: ["battleList"] }),
    queryClient.invalidateQueries({ queryKey: ["active"] }),
    queryClient.invalidateQueries({ queryKey: ["compare"] }),
    queryClient.invalidateQueries({ queryKey: ["transition"] }),
    queryClient.invalidateQueries({ queryKey: ["myCompare"] }),
    queryClient.invalidateQueries({ queryKey: ["myGrowthRate"] }),
    queryClient.invalidateQueries({ queryKey: ["rivalList"] }),
  ]);
};

const invalidateUserQueries = async () => {
  await Promise.all([
    queryClient.invalidateQueries({ queryKey: ["user"] }),
    queryClient.invalidateQueries({ queryKey: noticeQueryKeys.all }),
  ]);
};

const invalidateRecordQueries = async () => {
  await Promise.all([
    queryClient.invalidateQueries({ queryKey: recordQueryKeys.today }),
    queryClient.invalidateQueries({ queryKey: recordQueryKeys.tasks }),
  ]);
};

const invalidateByDomain = async (domain?: string) => {
  if (domain === "GROUP") {
    await invalidateGroupQueries();
    return;
  }

  if (domain === "COMPETE") {
    await invalidateCompeteQueries();
    return;
  }

  if (domain === "USER") {
    await invalidateUserQueries();
    return;
  }

  if (domain === "RECORD") {
    await invalidateRecordQueries();
  }
};

export const useRealtimeSync = () => {
  const { data: todayResponse } = useRecordTodayQuery();
  const hasActiveRecordSession =
    !!todayResponse?.success &&
    !!todayResponse.data?.sessions.some(session => session.endedAt === null);

  const socketRef = useRef<Socket | null>(null);
  const reconnectTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isMountedRef = useRef(true);
  const desiredPresenceRef = useRef<PresenceStatus>("ONLINE");
  const sentPresenceRef = useRef<PresenceStatus | null>(null);
  const lastCursorMovedAtRef = useRef(0);
  const cursorPointRef = useRef<CursorScreenPoint | null>(null);
  const hasActiveRecordSessionRef = useRef(hasActiveRecordSession);
  const isDevelopingRef = useRef(false);
  const wasExemptFromAwayRef = useRef(hasActiveRecordSession);

  const clearReconnectTimer = useCallback(() => {
    if (!reconnectTimerRef.current) {
      return;
    }

    clearTimeout(reconnectTimerRef.current);
    reconnectTimerRef.current = null;
  }, []);

  const flushPresence = useCallback(() => {
    const socket = socketRef.current;
    if (!socket?.connected) {
      return;
    }

    const nextPresence = desiredPresenceRef.current;
    if (sentPresenceRef.current === nextPresence) {
      return;
    }

    socket.emit(nextPresence === "ONLINE" ? "presence:online" : "presence:away");
    sentPresenceRef.current = nextPresence;
  }, []);

  const setDesiredPresence = useCallback(
    (presence: PresenceStatus) => {
      desiredPresenceRef.current = presence;
      flushPresence();
    },
    [flushPresence]
  );

  const syncPresence = useCallback(() => {
    const now = Date.now();

    if (lastCursorMovedAtRef.current === 0) {
      lastCursorMovedAtRef.current = now;
    }

    const isExemptFromAway = hasActiveRecordSessionRef.current || isDevelopingRef.current;

    if (isExemptFromAway) {
      wasExemptFromAwayRef.current = true;
      setDesiredPresence("ONLINE");
      return;
    }

    if (wasExemptFromAwayRef.current) {
      lastCursorMovedAtRef.current = now;
      wasExemptFromAwayRef.current = false;
    }

    setDesiredPresence(
      now - lastCursorMovedAtRef.current >= AWAY_THRESHOLD_MS ? "AWAY" : "ONLINE"
    );
  }, [setDesiredPresence]);

  useEffect(() => {
    hasActiveRecordSessionRef.current = hasActiveRecordSession;
    syncPresence();
  }, [hasActiveRecordSession, syncPresence]);

  useEffect(() => {
    isMountedRef.current = true;

    const disconnect = (notifyAway: boolean) => {
      const socket = socketRef.current;
      if (!socket) {
        return;
      }

      if (notifyAway && socket.connected) {
        socket.emit("presence:away");
      }

      socket.removeAllListeners();
      socket.disconnect();
      socketRef.current = null;
      sentPresenceRef.current = null;
    };

    const scheduleReconnect = () => {
      if (!isMountedRef.current || reconnectTimerRef.current) {
        return;
      }

      reconnectTimerRef.current = setTimeout(() => {
        reconnectTimerRef.current = null;
        void connect();
      }, RECONNECT_DELAY_MS);
    };

    const connect = async () => {
      disconnect(false);

      try {
        const { success, data } = await realtimeApi.createSocketToken();
        const token = data?.token;

        if (!isMountedRef.current) {
          return;
        }

        if (!success || !token) {
          scheduleReconnect();
          return;
        }

        const socket = io(socketConfig.origin, {
          path: socketConfig.path,
          transports: ["websocket", "polling"],
          withCredentials: true,
          query: { token },
          reconnection: false,
        });

        socketRef.current = socket;

        socket.on("connect", () => {
          sentPresenceRef.current = null;
          flushPresence();
        });

        socket.on("change", (payload: { domain?: string }) => {
          void invalidateByDomain(payload?.domain);
        });

        socket.on("disconnect", reason => {
          sentPresenceRef.current = null;

          if (!isMountedRef.current || reason === "io client disconnect") {
            return;
          }

          scheduleReconnect();
        });

        socket.on("connect_error", error => {
          sentPresenceRef.current = null;
          console.error("실시간 소켓 연결에 실패했습니다.", error);
          scheduleReconnect();
        });
      } catch (error) {
        if (!isMountedRef.current) {
          return;
        }

        console.error("실시간 토큰 발급 요청에 실패했습니다.", error);
        scheduleReconnect();
      }
    };

    void connect();

    return () => {
      isMountedRef.current = false;
      clearReconnectTimer();
      disconnect(true);
    };
  }, [clearReconnectTimer, flushPresence]);

  useEffect(() => {
    if (typeof window === "undefined" || !window.api) {
      return;
    }

    window.api.startMonitoring().catch(error => {
      console.error("앱 모니터링을 시작하는데 실패했습니다:", error);
    });
  }, []);

  useEffect(() => {
    if (typeof window === "undefined" || !window.api) {
      return;
    }

    let cancelled = false;

    const refreshFrontmostMonitoredApp = async () => {
      try {
        const appName = await window.api.getFrontmostMonitoredApp();
        if (cancelled) {
          return;
        }

        const isDeveloping = appName !== null;
        if (isDevelopingRef.current === isDeveloping) {
          return;
        }

        isDevelopingRef.current = isDeveloping;
        syncPresence();
      } catch (error) {
        if (cancelled) {
          return;
        }

        if (isDevelopingRef.current) {
          isDevelopingRef.current = false;
          syncPresence();
        }
        console.error("전면 개발 앱 조회 실패:", error);
      }
    };

    void refreshFrontmostMonitoredApp();
    const interval = setInterval(() => {
      void refreshFrontmostMonitoredApp();
    }, FRONTMOST_APP_POLL_MS);

    return () => {
      cancelled = true;
      clearInterval(interval);
    };
  }, [syncPresence]);

  useEffect(() => {
    if (typeof window === "undefined" || !window.api) {
      return;
    }

    let cancelled = false;

    const refreshCursorPoint = async () => {
      try {
        const point = await window.api.getCursorScreenPoint();
        if (cancelled) {
          return;
        }

        const previousPoint = cursorPointRef.current;
        cursorPointRef.current = point;

        if (
          previousPoint === null ||
          previousPoint.x !== point.x ||
          previousPoint.y !== point.y
        ) {
          lastCursorMovedAtRef.current = Date.now();
          setDesiredPresence("ONLINE");
        }
      } catch (error) {
        if (cancelled) {
          return;
        }

        console.error("커서 위치 조회 실패:", error);
      }
    };

    void refreshCursorPoint();
    const interval = setInterval(() => {
      void refreshCursorPoint();
    }, CURSOR_POLL_MS);

    return () => {
      cancelled = true;
      clearInterval(interval);
    };
  }, [setDesiredPresence]);

  useEffect(() => {
    syncPresence();

    const interval = setInterval(() => {
      syncPresence();
    }, PRESENCE_CHECK_INTERVAL_MS);

    return () => {
      clearInterval(interval);
    };
  }, [syncPresence]);
};
