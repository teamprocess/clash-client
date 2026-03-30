import { useSyncExternalStore } from "react";

let isServiceUnavailable = false;
const listeners = new Set<() => void>();

const emitChange = () => {
  listeners.forEach(listener => listener());
};

const subscribe = (listener: () => void) => {
  listeners.add(listener);

  return () => {
    listeners.delete(listener);
  };
};

const getSnapshot = () => isServiceUnavailable;

const setServiceUnavailable = (nextValue: boolean) => {
  if (isServiceUnavailable === nextValue) {
    return;
  }

  isServiceUnavailable = nextValue;
  emitChange();
};

export const markServiceUnavailable = () => {
  setServiceUnavailable(true);
};

export const clearServiceUnavailable = () => {
  setServiceUnavailable(false);
};

export const useServiceUnavailable = () => {
  return useSyncExternalStore(subscribe, getSnapshot, getSnapshot);
};
