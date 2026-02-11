import { useEffect } from "react";
import { io, type Socket } from "socket.io-client";
import { groupQueryKeys } from "@/entities/group";
import { realtimeApi } from "@/shared/api";
import { socketConfig } from "@/shared/config/socket";
import { queryClient } from "@/shared/lib";

const RECONNECT_DELAY_MS = 3000;

const invalidateRecordGroupQueries = async () => {
  // Record 화면에서 쓰는 그룹 관련 캐시만 다시 조회
  await Promise.all([
    queryClient.invalidateQueries({ queryKey: groupQueryKeys.allGroups }),
    queryClient.invalidateQueries({ queryKey: groupQueryKeys.myGroups }),
    queryClient.invalidateQueries({ queryKey: groupQueryKeys.groupActivity }),
    queryClient.invalidateQueries({ queryKey: groupQueryKeys.groupDetail }),
  ]);
};

export const useRecordRealtime = () => {
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

      // 정상 종료일 때만 away 이벤트를 보내고 정리
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
          // 연결되면 presence를 online으로 맞춤
          socket?.emit("presence:online");
        });

        socket.on("change", (payload: { domain?: string }) => {
          // Record는 GROUP 도메인 변화만 알면 되기 때문에 도메인이 GROUP이 아닌 것은 리턴
          if (payload?.domain !== "GROUP") {
            return;
          }

          void invalidateRecordGroupQueries();
        });

        socket.on("disconnect", reason => {
          // 의도적으로 연결을 종료한 경우
          if (!isActive || reason === "io client disconnect") {
            return;
          }

          scheduleReconnect();
        });

        socket.on("connect_error", error => {
          console.error("기록 실시간 소켓 연결에 실패했습니다.", error);
          scheduleReconnect();
        });
      } catch (error) {
        if (!isActive) {
          return;
        }

        console.error("기록 실시간 토큰 발급 요청에 실패했습니다.", error);
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
