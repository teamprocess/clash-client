import { useEffect, useState } from "react";

const getInitialOnlineState = () => {
  if (typeof navigator === "undefined") {
    return true;
  }

  return navigator.onLine;
};

export const useNetworkStatus = () => {
  const [isOnline, setIsOnline] = useState(getInitialOnlineState);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  return isOnline;
};
