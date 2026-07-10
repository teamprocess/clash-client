import { useCallback, useEffect, useRef, useState } from "react";
import { useRecordTodayQuery } from "@/entities/record";
import type { CursorScreenPoint, PresenceStatus } from "./realtimeSync.types";

const AWAY_THRESHOLD_MS = 5 * 60 * 1000;
const PRESENCE_CHECK_INTERVAL_MS = 5000;
const CURSOR_POLL_MS = 60 * 1000;

export const usePresenceStatus = (isDeveloping: boolean) => {
  const { data: todayResponse } = useRecordTodayQuery();
  const hasActiveRecordSession =
    !!todayResponse?.success &&
    !!todayResponse.data?.sessions.some(session => session.endedAt === null);

  const [presenceStatus, setPresenceStatus] = useState<PresenceStatus>("ONLINE");
  const lastCursorMovedAtRef = useRef(0);
  const cursorPointRef = useRef<CursorScreenPoint | null>(null);
  const hasActiveRecordSessionRef = useRef(hasActiveRecordSession);
  const isDevelopingRef = useRef(isDeveloping);
  const wasExemptFromAwayRef = useRef(hasActiveRecordSession || isDeveloping);

  const updatePresenceStatus = useCallback((nextStatus: PresenceStatus) => {
    setPresenceStatus(previousStatus =>
      previousStatus === nextStatus ? previousStatus : nextStatus
    );
  }, []);

  const syncPresence = useCallback(() => {
    const now = Date.now();

    if (lastCursorMovedAtRef.current === 0) {
      lastCursorMovedAtRef.current = now;
    }

    const isExemptFromAway = hasActiveRecordSessionRef.current || isDevelopingRef.current;

    if (isExemptFromAway) {
      wasExemptFromAwayRef.current = true;
      updatePresenceStatus("ONLINE");
      return;
    }

    if (wasExemptFromAwayRef.current) {
      lastCursorMovedAtRef.current = now;
      wasExemptFromAwayRef.current = false;
    }

    updatePresenceStatus(
      now - lastCursorMovedAtRef.current >= AWAY_THRESHOLD_MS ? "AWAY" : "ONLINE"
    );
  }, [updatePresenceStatus]);

  useEffect(() => {
    hasActiveRecordSessionRef.current = hasActiveRecordSession;
    isDevelopingRef.current = isDeveloping;

    const timer = setTimeout(() => {
      syncPresence();
    }, 0);

    return () => {
      clearTimeout(timer);
    };
  }, [hasActiveRecordSession, isDeveloping, syncPresence]);

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

        if (previousPoint === null || previousPoint.x !== point.x || previousPoint.y !== point.y) {
          lastCursorMovedAtRef.current = Date.now();
          updatePresenceStatus("ONLINE");
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
  }, [updatePresenceStatus]);

  useEffect(() => {
    const timer = setTimeout(() => {
      syncPresence();
    }, 0);

    const interval = setInterval(() => {
      syncPresence();
    }, PRESENCE_CHECK_INTERVAL_MS);

    return () => {
      clearTimeout(timer);
      clearInterval(interval);
    };
  }, [syncPresence]);

  return presenceStatus;
};
