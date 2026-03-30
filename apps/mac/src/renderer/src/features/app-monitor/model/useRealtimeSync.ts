import { useCallback, useEffect, useRef } from "react";
import axios from "axios";
import { io, type Socket } from "socket.io-client";
import { realtimeApi } from "@/shared/api";
import { socketConfig } from "@/shared/config/socket";
import { clearServiceUnavailable, markServiceUnavailable } from "@/shared/lib";
import { invalidateByDomain, invalidateRealtimeQueries } from "./invalidateRealtimeQueries";
import { usePresenceStatus } from "./usePresenceStatus";
import type { PresenceStatus } from "./realtimeSync.types";

const RECONNECT_DELAY_MS = 3000;
const MAX_RECONNECT_ATTEMPTS = 5;
const isOffline = () => typeof navigator !== "undefined" && !navigator.onLine;
const shouldRetrySocketToken = (error: unknown) => {
  if (!axios.isAxiosError(error)) {
    return true;
  }

  if (!error.response) {
    return true;
  }

  return error.response.status >= 500;
};

export const useRealtimeSync = () => {
  const presenceStatus = usePresenceStatus();
  const socketRef = useRef<Socket | null>(null);
  const reconnectTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const reconnectAttemptsRef = useRef(0);
  const isMountedRef = useRef(true);
  const currentPresenceRef = useRef<PresenceStatus>(presenceStatus);
  const sentPresenceRef = useRef<PresenceStatus | null>(null);

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

    const nextPresence = currentPresenceRef.current;
    if (sentPresenceRef.current === nextPresence) {
      return;
    }

    socket.emit(nextPresence === "ONLINE" ? "presence:online" : "presence:away");
    sentPresenceRef.current = nextPresence;
  }, []);

  const resetReconnectAttempts = useCallback(() => {
    reconnectAttemptsRef.current = 0;
  }, []);

  useEffect(() => {
    currentPresenceRef.current = presenceStatus;
    flushPresence();
  }, [flushPresence, presenceStatus]);

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

      if (isOffline()) {
        clearServiceUnavailable();
        return;
      }

      if (reconnectAttemptsRef.current >= MAX_RECONNECT_ATTEMPTS) {
        markServiceUnavailable();
        return;
      }

      reconnectTimerRef.current = setTimeout(() => {
        reconnectTimerRef.current = null;
        reconnectAttemptsRef.current += 1;
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
          query: { token, clientChannel: socketConfig.clientChannel },
          reconnection: false,
        });

        socketRef.current = socket;

        socket.on("connect", () => {
          const reconnected = reconnectAttemptsRef.current > 0;

          clearReconnectTimer();
          clearServiceUnavailable();
          resetReconnectAttempts();
          sentPresenceRef.current = null;

          if (reconnected) {
            void invalidateRealtimeQueries();
          }

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

        if (!shouldRetrySocketToken(error)) {
          return;
        }

        scheduleReconnect();
      }
    };

    clearServiceUnavailable();
    void connect();

    return () => {
      isMountedRef.current = false;
      clearReconnectTimer();
      resetReconnectAttempts();
      disconnect(true);
    };
  }, [clearReconnectTimer, flushPresence, resetReconnectAttempts]);
};
