import {
  type AriaRole,
  type RefObject,
  type ReactNode,
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { createPortal } from "react-dom";
import * as S from "./Popover.style";

const VIEWPORT_MARGIN = 8;
const FOCUSABLE_SELECTOR = [
  "a[href]",
  "button:not([disabled])",
  "input:not([disabled])",
  "select:not([disabled])",
  "textarea:not([disabled])",
  "[contenteditable='true']",
  "[tabindex]:not([tabindex='-1'])",
].join(",");

const resolveLength = (value: number | string, anchor: HTMLElement) => {
  if (typeof value === "number") return value;

  const parsedValue = Number.parseFloat(value);
  if (!Number.isFinite(parsedValue)) return 0;

  if (value.endsWith("rem")) {
    return parsedValue * Number.parseFloat(getComputedStyle(document.documentElement).fontSize);
  }

  if (value.endsWith("em")) {
    return parsedValue * Number.parseFloat(getComputedStyle(anchor).fontSize);
  }

  return parsedValue;
};

const getFocusableElements = (container: HTMLElement) =>
  Array.from(container.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR)).filter(
    element =>
      !element.hidden &&
      element.getAttribute("aria-hidden") !== "true" &&
      element.tabIndex >= 0 &&
      !element.closest("[inert]") &&
      element.getClientRects().length > 0
  );

export interface PopoverProps {
  isOpen: boolean;
  onClose?: () => void;
  anchorRef?: RefObject<HTMLElement | null>;
  align?: "start" | "end";
  offset?: number;
  alignOffset?: number | string;
  minWidth?: number | string;
  role?: AriaRole;
  ariaLabel?: string;
  children: ReactNode;
}

export const Popover = ({
  isOpen,
  onClose,
  anchorRef,
  align = "end",
  offset = 8,
  alignOffset = 0,
  minWidth = "7rem",
  role,
  ariaLabel,
  children,
}: PopoverProps) => {
  const popoverRef = useRef<HTMLDivElement>(null);
  const restoreFocusRef = useRef(true);
  const triggerFocusRef = useRef<HTMLElement | null>(null);
  const [portalHost, setPortalHost] = useState<HTMLElement | null>(null);

  useLayoutEffect(() => {
    let isActive = true;

    queueMicrotask(() => {
      if (!isActive) return;
      if (!isOpen || typeof document === "undefined") {
        setPortalHost(null);
        return;
      }

      const dialogHost = anchorRef?.current?.closest<HTMLElement>("[role='dialog']");
      setPortalHost(dialogHost ?? document.body);
    });

    return () => {
      isActive = false;
    };
  }, [anchorRef, isOpen]);

  const updatePosition = useCallback(() => {
    const anchor = anchorRef?.current;
    const popover = popoverRef.current;
    if (!anchor || !popover) return;

    const anchorRect = anchor.getBoundingClientRect();
    const popoverRect = popover.getBoundingClientRect();
    const viewportWidth = document.documentElement.clientWidth;
    const viewportHeight = window.innerHeight;
    const alignOffsetInPixels = resolveLength(alignOffset, anchor);
    const maxPopoverWidth = Math.max(0, viewportWidth - VIEWPORT_MARGIN * 2);
    const popoverWidth = Math.min(
      Math.max(popoverRect.width, popover.scrollWidth),
      maxPopoverWidth
    );
    const naturalPopoverHeight = Math.max(popoverRect.height, popover.scrollHeight);

    const preferredLeft =
      align === "end"
        ? anchorRect.right - popoverWidth - alignOffsetInPixels
        : anchorRect.left + alignOffsetInPixels;
    const left = Math.min(
      Math.max(preferredLeft, VIEWPORT_MARGIN),
      Math.max(VIEWPORT_MARGIN, viewportWidth - popoverWidth - VIEWPORT_MARGIN)
    );

    const belowTop = anchorRect.bottom + offset;
    const availableBelow = Math.max(0, viewportHeight - belowTop - VIEWPORT_MARGIN);
    const availableAbove = Math.max(0, anchorRect.top - offset - VIEWPORT_MARGIN);
    const opensAbove = naturalPopoverHeight > availableBelow && availableAbove > availableBelow;
    const maxHeight = opensAbove ? availableAbove : availableBelow;
    const renderedHeight = Math.min(naturalPopoverHeight, maxHeight);
    const top = opensAbove
      ? Math.max(VIEWPORT_MARGIN, anchorRect.top - offset - renderedHeight)
      : belowTop;

    popover.style.top = `${top}px`;
    popover.style.left = `${left}px`;
    popover.style.maxHeight = `${maxHeight}px`;
    popover.style.visibility = "visible";
  }, [align, alignOffset, anchorRef, offset]);

  useLayoutEffect(() => {
    const anchor = anchorRef?.current;
    const popover = popoverRef.current;
    if (!isOpen || !portalHost || !anchor || !popover) return;

    updatePosition();

    const resizeObserver = new ResizeObserver(updatePosition);
    resizeObserver.observe(anchor);
    resizeObserver.observe(popover);
    window.addEventListener("resize", updatePosition);
    document.addEventListener("scroll", updatePosition, true);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener("resize", updatePosition);
      document.removeEventListener("scroll", updatePosition, true);
    };
  }, [anchorRef, isOpen, portalHost, updatePosition]);

  useEffect(() => {
    const popover = popoverRef.current;
    if (!isOpen || !portalHost || !popover) return;

    const previousFocus =
      document.activeElement instanceof HTMLElement ? document.activeElement : null;
    triggerFocusRef.current = previousFocus;
    restoreFocusRef.current = true;

    const focusFrame = window.requestAnimationFrame(() => {
      const initialFocus =
        popover.querySelector<HTMLElement>("[autofocus]") ??
        getFocusableElements(popover)[0] ??
        popover;
      initialFocus.focus();
    });

    return () => {
      window.cancelAnimationFrame(focusFrame);
      if (!restoreFocusRef.current) return;

      const activeElement = document.activeElement;
      if (
        (activeElement === document.body || popover.contains(activeElement)) &&
        previousFocus?.isConnected
      ) {
        previousFocus.focus();
      }
    };
  }, [isOpen, portalHost]);

  useEffect(() => {
    if (!isOpen || !portalHost || !onClose) return;

    const handlePointerDown = (event: PointerEvent) => {
      const target = event.target;
      if (!(target instanceof Node)) return;

      if (popoverRef.current?.contains(target) || anchorRef?.current?.contains(target)) {
        return;
      }

      restoreFocusRef.current = false;
      onClose();
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;

      const target = event.target;
      if (
        target instanceof Node &&
        !popoverRef.current?.contains(target) &&
        !anchorRef?.current?.contains(target)
      ) {
        return;
      }

      event.preventDefault();
      event.stopPropagation();
      restoreFocusRef.current = true;
      onClose();
    };

    document.addEventListener("pointerdown", handlePointerDown);
    window.addEventListener("keydown", handleEscape, true);

    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      window.removeEventListener("keydown", handleEscape, true);
    };
  }, [anchorRef, isOpen, onClose, portalHost]);

  if (!isOpen || !portalHost) return null;

  const handleBlur = (event: React.FocusEvent<HTMLDivElement>) => {
    const nextTarget = event.relatedTarget;
    if (
      nextTarget instanceof Node &&
      (event.currentTarget.contains(nextTarget) || anchorRef?.current?.contains(nextTarget))
    ) {
      return;
    }

    restoreFocusRef.current = false;
    onClose?.();
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Tab" && (role === "menu" || role === "dialog")) {
      const popoverFocusables = getFocusableElements(event.currentTarget);
      const activeElement = document.activeElement;
      const firstElement = popoverFocusables[0];
      const lastElement = popoverFocusables[popoverFocusables.length - 1];
      const isLeavingDialog =
        role === "dialog" &&
        (popoverFocusables.length === 0 ||
          (event.shiftKey
            ? activeElement === firstElement || !event.currentTarget.contains(activeElement)
            : activeElement === lastElement || !event.currentTarget.contains(activeElement)));

      if (role === "dialog" && !isLeavingDialog) {
        return;
      }

      event.preventDefault();
      restoreFocusRef.current = false;

      const documentFocusables = getFocusableElements(document.body).filter(
        element => !event.currentTarget.contains(element)
      );
      const trigger = triggerFocusRef.current;
      const triggerIndex = trigger ? documentFocusables.indexOf(trigger) : -1;
      const nextIndex = event.shiftKey ? triggerIndex - 1 : triggerIndex + 1;
      const nextElement = documentFocusables[nextIndex] ?? trigger;

      onClose?.();
      window.requestAnimationFrame(() => nextElement?.focus());
      return;
    }

    if (role !== "menu") {
      return;
    }

    if (!["ArrowDown", "ArrowUp", "Home", "End"].includes(event.key)) return;

    const menuItems = Array.from(
      event.currentTarget.querySelectorAll<HTMLElement>("[role='menuitem']:not([disabled])")
    ).filter(element => element.getClientRects().length > 0);
    if (menuItems.length === 0) return;

    event.preventDefault();
    const currentIndex = menuItems.indexOf(document.activeElement as HTMLElement);
    if (event.key === "Home") {
      menuItems[0].focus();
    } else if (event.key === "End") {
      menuItems[menuItems.length - 1].focus();
    } else if (event.key === "ArrowDown") {
      menuItems[currentIndex < 0 ? 0 : (currentIndex + 1) % menuItems.length].focus();
    } else {
      menuItems[
        currentIndex < 0
          ? menuItems.length - 1
          : (currentIndex - 1 + menuItems.length) % menuItems.length
      ].focus();
    }
  };

  return createPortal(
    <S.PopoverContainer
      ref={popoverRef}
      $minWidth={minWidth}
      role={role}
      aria-label={ariaLabel}
      tabIndex={-1}
      onBlur={handleBlur}
      onKeyDown={handleKeyDown}
    >
      {children}
    </S.PopoverContainer>,
    portalHost
  );
};
