import type { BrowserWindow } from "electron";
import { getAppPreferences, updateAppPreferences } from "../preferences";

const DEFAULT_ZOOM_FACTOR = 1;
const MIN_ZOOM_FACTOR = 0.5;
const MAX_ZOOM_FACTOR = 3;
const ZOOM_STEP = 0.1;

const isValidZoomFactor = (value: unknown): value is number =>
  typeof value === "number" && Number.isFinite(value) && value > 0;

const clampZoomFactor = (value: number) =>
  Math.min(MAX_ZOOM_FACTOR, Math.max(MIN_ZOOM_FACTOR, value));

const normalizeZoomFactor = (value: number) => Math.round(clampZoomFactor(value) * 100) / 100;

const getSavedZoomFactor = () => {
  const zoomFactor = getAppPreferences().zoomFactor;

  if (!isValidZoomFactor(zoomFactor)) {
    return DEFAULT_ZOOM_FACTOR;
  }

  return normalizeZoomFactor(zoomFactor);
};

const isWindowAvailable = (window: BrowserWindow | null | undefined): window is BrowserWindow => {
  if (!window) {
    return false;
  }

  return !window.isDestroyed() && !window.webContents.isDestroyed();
};

const persistWindowZoomFactor = (window: BrowserWindow) => {
  updateAppPreferences({
    zoomFactor: normalizeZoomFactor(window.webContents.getZoomFactor()),
  });
};

const setWindowZoomFactor = (window: BrowserWindow, zoomFactor: number) => {
  const normalizedZoomFactor = normalizeZoomFactor(zoomFactor);

  window.webContents.setZoomFactor(normalizedZoomFactor);
  updateAppPreferences({ zoomFactor: normalizedZoomFactor });
};

export const initializeWindowZoom = (window: BrowserWindow) => {
  setWindowZoomFactor(window, getSavedZoomFactor());

  window.webContents.on("zoom-changed", (event, zoomDirection) => {
    event.preventDefault();

    const zoomDelta = zoomDirection === "in" ? ZOOM_STEP : -ZOOM_STEP;
    const nextZoomFactor = window.webContents.getZoomFactor() + zoomDelta;
    setWindowZoomFactor(window, nextZoomFactor);
  });

  window.on("hide", () => {
    if (!window.webContents.isDestroyed()) {
      persistWindowZoomFactor(window);
    }
  });
};

export const zoomInWindow = (window: BrowserWindow | null | undefined) => {
  if (!isWindowAvailable(window)) {
    return;
  }

  setWindowZoomFactor(window, window.webContents.getZoomFactor() + ZOOM_STEP);
};

export const zoomOutWindow = (window: BrowserWindow | null | undefined) => {
  if (!isWindowAvailable(window)) {
    return;
  }

  setWindowZoomFactor(window, window.webContents.getZoomFactor() - ZOOM_STEP);
};

export const resetWindowZoom = (window: BrowserWindow | null | undefined) => {
  if (!isWindowAvailable(window)) {
    return;
  }

  setWindowZoomFactor(window, DEFAULT_ZOOM_FACTOR);
};
