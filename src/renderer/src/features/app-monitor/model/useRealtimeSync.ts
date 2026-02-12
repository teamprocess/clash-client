import { useEffect } from "react";
import { io, type Socket } from "socket.io-client";
import { groupQueryKeys } from "@/entities/group";
import { realtimeApi } from "@/shared/api";
import { socketConfig } from "@/shared/config/socket";
import { queryClient } from "@/shared/lib";

const RECONNECT_DELAY_MS = 3000;

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
  await queryClient.invalidateQueries({ queryKey: ["user"] });
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
  }
};

export const useRealtimeSync = () => {
  useEffect(() => {
    let isActive = true;
    let socket: Socket | null = null;
    let reconnectTimer: ReturnType<typeof setTimeout> | null = null;

    const clearReconnectTimer = () => {
      if (!reconnectTimer) {
        return;
      }

      clearTimeout(reconnectTimer);
      reconnectTimer = null;
    };

    const disconnect = (notifyAway: boolean) => {
      if (!socket) {
        return;
      }

      if (notifyAway && socket.connected) {
        socket.emit("presence:away");
      }

      socket.removeAllListeners();
      socket.disconnect();
      socket = null;
    };

    const scheduleReconnect = () => {
      if (!isActive || reconnectTimer) {
        return;
      }

      reconnectTimer = setTimeout(() => {
        reconnectTimer = null;
        void connect();
      }, RECONNECT_DELAY_MS);
    };

    const connect = async () => {
      disconnect(false);

      try {
        const { success, data } = await realtimeApi.createSocketToken();
        const token = data?.token;

        if (!isActive) {
          return;
        }

        if (!success || !token) {
          scheduleReconnect();
          return;
        }

        socket = io(socketConfig.origin, {
          path: socketConfig.path,
          transports: ["websocket", "polling"],
          withCredentials: true,
          query: { token },
          reconnection: false,
        });

        socket.on("connect", () => {
          socket?.emit("presence:online");
        });

        socket.on("change", (payload: { domain?: string }) => {
          void invalidateByDomain(payload?.domain);
        });

        socket.on("disconnect", reason => {
          if (!isActive || reason === "io client disconnect") {
            return;
          }

          scheduleReconnect();
        });

        socket.on("connect_error", error => {
          console.error("실시간 소켓 연결에 실패했습니다.", error);
          scheduleReconnect();
        });
      } catch (error) {
        if (!isActive) {
          return;
        }

        console.error("실시간 토큰 발급 요청에 실패했습니다.", error);
        scheduleReconnect();
      }
    };

    void connect();

    return () => {
      isActive = false;
      clearReconnectTimer();
      disconnect(true);
    };
  }, []);
};
