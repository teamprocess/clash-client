import { useCallback, useEffect, useRef } from "react";
import { groupQueryKeys } from "@/entities/group";
import { recordQueryKeys } from "@/entities/record";
import { queryClient } from "@/shared/lib";

const KST_OFFSET_MS = 9 * 60 * 60 * 1000;
const DAILY_REFRESH_HOUR_KST = 6;

const getMillisecondsUntilNextKstRefresh = (nowMs = Date.now()) => {
  const shiftedNow = new Date(nowMs + KST_OFFSET_MS);
  const shiftedTarget = new Date(nowMs + KST_OFFSET_MS);

  shiftedTarget.setUTCHours(DAILY_REFRESH_HOUR_KST, 0, 0, 0);

  if (shiftedTarget.getTime() <= shiftedNow.getTime()) {
    shiftedTarget.setUTCDate(shiftedTarget.getUTCDate() + 1);
  }

  const nextRefreshAt = shiftedTarget.getTime() - KST_OFFSET_MS;
  return Math.max(0, nextRefreshAt - nowMs);
};

const refreshKstDailyQueries = async () => {
  await Promise.all([
    queryClient.invalidateQueries({ queryKey: recordQueryKeys.today }),
    queryClient.invalidateQueries({ queryKey: groupQueryKeys.allGroups }),
    queryClient.invalidateQueries({ queryKey: groupQueryKeys.myGroups }),
    queryClient.invalidateQueries({ queryKey: groupQueryKeys.groupActivity }),
    queryClient.invalidateQueries({ queryKey: groupQueryKeys.groupDetail }),
  ]);
};

export const useDailyRefresh = () => {
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearRefreshTimer = useCallback(() => {
    if (!timerRef.current) {
      return;
    }

    clearTimeout(timerRef.current);
    timerRef.current = null;
  }, []);

  useEffect(() => {
    let cancelled = false;

    const scheduleNextRefresh = () => {
      clearRefreshTimer();

      timerRef.current = setTimeout(() => {
        void refreshKstDailyQueries().finally(() => {
          if (!cancelled) {
            scheduleNextRefresh();
          }
        });
      }, getMillisecondsUntilNextKstRefresh());
    };

    scheduleNextRefresh();

    return () => {
      cancelled = true;
      clearRefreshTimer();
    };
  }, [clearRefreshTimer]);
};
