import { useEffect, useState } from "react";

type StartupUpdatePhase = "checking" | "downloading" | "installing" | "ready" | "error";
type StartupPreviewMode = StartupUpdatePhase | "overlay";

export interface StartupUpdateState {
  phase: StartupUpdatePhase;
  version: string | null;
  progressPercent: number | null;
  message?: string;
  detail?: string;
}

const phases: StartupUpdatePhase[] = ["checking", "downloading", "installing", "ready", "error"];

const isPhase = (value: string): value is StartupUpdatePhase => {
  return phases.includes(value as StartupUpdatePhase);
};

const getPreviewValue = (queryKey: string, storageKey: string) => {
  if (typeof window === "undefined") {
    return null;
  }

  const searchParams = new URLSearchParams(window.location.search);
  return searchParams.get(queryKey) ?? window.localStorage.getItem(storageKey);
};

const getPreviewMode = (): StartupPreviewMode | null => {
  if (!import.meta.env.DEV) {
    return null;
  }

  const mode = getPreviewValue("startupPreview", "clash-startup-preview");

  if (!mode) {
    return null;
  }

  if (mode === "overlay") {
    return mode;
  }

  return isPhase(mode) ? mode : null;
};

const getPreviewState = (mode: StartupPreviewMode | null): StartupUpdateState | null => {
  if (!mode) {
    return null;
  }

  if (mode === "overlay") {
    return {
      phase: "ready",
      version: null,
      progressPercent: null,
    };
  }

  const rawProgress = getPreviewValue("startupProgress", "clash-startup-progress");
  const progress = rawProgress ? Number(rawProgress) : null;

  return {
    phase: mode,
    version: getPreviewValue("startupVersion", "clash-startup-version"),
    progressPercent: progress !== null && Number.isFinite(progress) ? progress : null,
    message: getPreviewValue("startupMessage", "clash-startup-message") ?? undefined,
    detail: getPreviewValue("startupDetail", "clash-startup-detail") ?? undefined,
  };
};

export const useStartupUpdateState = () => {
  const previewMode = getPreviewMode();
  const preview = getPreviewState(previewMode);
  const [state, setState] = useState<StartupUpdateState>(() =>
    window.api.getStartupUpdateStateSync()
  );

  useEffect(() => {
    if (preview) {
      return;
    }

    let mounted = true;

    const sync = (next: StartupUpdateState) => {
      if (!mounted) {
        return;
      }

      setState(next);
    };

    const off = window.api.onStartupUpdateStateChanged(sync);

    window.api.getStartupUpdateState().then(sync);

    return () => {
      mounted = false;
      off();
    };
  }, [preview]);

  const retry = async () => {
    await window.api.retryStartupUpdate();
  };

  return { state: preview ?? state, retry, previewMode };
};
