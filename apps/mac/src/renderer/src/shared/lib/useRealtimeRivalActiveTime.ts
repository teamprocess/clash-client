import { useEffect, useState } from "react";

interface UseRealtimeRivalActiveTimeOptions {
  activeTime: number;
  isStudying: boolean;
}

export const useRealtimeRivalActiveTime = ({
  activeTime,
  isStudying,
}: UseRealtimeRivalActiveTimeOptions) => {
  const timerKey = `${activeTime}:${isStudying}`;
  const [timerState, setTimerState] = useState(() => ({
    key: timerKey,
    elapsedSeconds: 0,
  }));

  useEffect(() => {
    if (!isStudying) {
      return;
    }

    const startedAt = Date.now();

    const timerId = window.setInterval(() => {
      setTimerState({
        key: timerKey,
        elapsedSeconds: Math.floor((Date.now() - startedAt) / 1000),
      });
    }, 1000);

    return () => window.clearInterval(timerId);
  }, [timerKey, isStudying]);

  const elapsedSeconds = timerState.key === timerKey ? timerState.elapsedSeconds : 0;

  return activeTime + elapsedSeconds;
};
