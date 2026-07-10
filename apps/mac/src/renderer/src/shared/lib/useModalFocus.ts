import { useEffect, useId, useLayoutEffect, useRef } from "react";

const FOCUSABLE_SELECTOR = [
  "a[href]",
  "button:not([disabled])",
  "input:not([disabled])",
  "select:not([disabled])",
  "textarea:not([disabled])",
  "[tabindex]:not([tabindex='-1'])",
].join(",");

interface OpenModalEntry {
  id: string;
  container: HTMLElement;
  previousFocus: HTMLElement | null;
}

const openModalStack: OpenModalEntry[] = [];
const MODAL_LAYER_BASE = 1300;
let modalLayerSequence = MODAL_LAYER_BASE;
let appRootWasInert = false;
let bodyOverflowBeforeModal = "";

const setAppBackgroundInert = (inert: boolean) => {
  const appRoot = document.getElementById("root");

  if (inert) {
    bodyOverflowBeforeModal = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    if (appRoot) {
      appRootWasInert = appRoot.inert;
      appRoot.inert = true;
    }
  } else {
    document.body.style.overflow = bodyOverflowBeforeModal;
    if (appRoot) {
      appRoot.inert = appRootWasInert;
    }
  }
};

const getFocusableElements = (container: HTMLElement) =>
  Array.from(container.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR)).filter(
    element =>
      !element.hidden &&
      element.tabIndex >= 0 &&
      !element.closest("[inert]") &&
      element.getClientRects().length > 0
  );

interface UseModalFocusOptions {
  isOpen: boolean;
  onClose?: () => void;
  closeOnEscape?: boolean;
}

export const useModalFocus = ({ isOpen, onClose, closeOnEscape = true }: UseModalFocusOptions) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const layerRef = useRef<HTMLDivElement>(null);
  const modalId = useId();
  const onCloseRef = useRef(onClose);
  const closeOnEscapeRef = useRef(closeOnEscape);

  useLayoutEffect(() => {
    if (!isOpen || typeof document === "undefined") return;

    modalLayerSequence += 1;
    if (layerRef.current) {
      layerRef.current.style.zIndex = String(modalLayerSequence);
    }
  }, [isOpen]);

  useEffect(() => {
    onCloseRef.current = onClose;
    closeOnEscapeRef.current = closeOnEscape;
  }, [closeOnEscape, onClose]);

  useEffect(() => {
    if (!isOpen || typeof document === "undefined") return;

    const container = containerRef.current;
    if (!container) return;

    const previousFocus =
      document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const stackEntry: OpenModalEntry = { id: modalId, container, previousFocus };
    openModalStack.push(stackEntry);
    if (openModalStack.length === 1) {
      setAppBackgroundInert(true);
    }

    const focusFrame = window.requestAnimationFrame(() => {
      const focusableElements = getFocusableElements(container);
      const initialFocus =
        container.querySelector<HTMLElement>("[autofocus]") ??
        focusableElements.find(element => !element.hasAttribute("data-modal-close")) ??
        focusableElements[0] ??
        container;

      initialFocus.focus();
    });

    const handleKeyDown = (event: KeyboardEvent) => {
      if (openModalStack[openModalStack.length - 1]?.id !== modalId) return;

      if (event.key === "Escape" && closeOnEscapeRef.current && onCloseRef.current) {
        event.preventDefault();
        event.stopPropagation();
        onCloseRef.current();
        return;
      }

      if (event.key !== "Tab") return;

      const focusableElements = getFocusableElements(container);
      if (focusableElements.length === 0) {
        event.preventDefault();
        container.focus();
        return;
      }

      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];
      const activeElement = document.activeElement;

      if (
        event.shiftKey &&
        (activeElement === firstElement || !container.contains(activeElement))
      ) {
        event.preventDefault();
        lastElement.focus();
      } else if (
        !event.shiftKey &&
        (activeElement === lastElement || !container.contains(activeElement))
      ) {
        event.preventDefault();
        firstElement.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown, true);

    return () => {
      window.cancelAnimationFrame(focusFrame);
      document.removeEventListener("keydown", handleKeyDown, true);
      const stackIndex = openModalStack.findIndex(entry => entry.id === modalId);
      const wasTopmost = stackIndex === openModalStack.length - 1;
      const removedEntry = stackIndex >= 0 ? openModalStack[stackIndex] : undefined;
      if (stackIndex >= 0) {
        openModalStack.splice(stackIndex, 1);
      }

      const childEntry = stackIndex >= 0 ? openModalStack[stackIndex] : undefined;
      if (
        removedEntry &&
        childEntry?.previousFocus &&
        removedEntry.container.contains(childEntry.previousFocus)
      ) {
        childEntry.previousFocus = removedEntry.previousFocus;
      }

      if (openModalStack.length === 0) {
        setAppBackgroundInert(false);
      }

      if (!wasTopmost || !removedEntry) return;

      const restoreTarget = removedEntry.previousFocus;
      if (restoreTarget?.isConnected && !restoreTarget.closest("[inert]")) {
        restoreTarget.focus();
        return;
      }

      const parentContainer = openModalStack[openModalStack.length - 1]?.container;
      const parentFocusTarget = parentContainer
        ? (getFocusableElements(parentContainer)[0] ?? parentContainer)
        : null;
      parentFocusTarget?.focus();
    };
  }, [isOpen, modalId]);

  return { containerRef, layerRef };
};
