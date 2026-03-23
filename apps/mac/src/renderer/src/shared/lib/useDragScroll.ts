import { useEffect, useRef, type MouseEvent as ReactMouseEvent } from "react";

type DragState = {
  x: number;
  y: number;
  left: number;
  top: number;
  moved: boolean;
};

const DRAG_THRESHOLD_PX = 2;

const setDraggingStyles = () => {
  document.body.style.cursor = "grabbing";
  document.body.style.userSelect = "none";
};

const resetDraggingStyles = () => {
  document.body.style.cursor = "";
  document.body.style.userSelect = "";
};

export const useDragScroll = <T extends HTMLElement>() => {
  const dragStateRef = useRef<DragState | null>(null);
  const suppressClickRef = useRef(false);
  const cleanupRef = useRef<() => void>(() => {});

  const onMouseDown = (event: ReactMouseEvent<T>) => {
    if (event.button !== 0) return;

    cleanupRef.current();

    const container = event.currentTarget;
    dragStateRef.current = {
      x: event.clientX,
      y: event.clientY,
      left: container.scrollLeft,
      top: container.scrollTop,
      moved: false,
    };
    suppressClickRef.current = false;

    const removeListeners = () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("blur", handleMouseUp);
    };

    const stopDragging = (shouldSuppressClick: boolean) => {
      if (shouldSuppressClick && dragStateRef.current?.moved) {
        suppressClickRef.current = true;
      }

      dragStateRef.current = null;
      removeListeners();
      resetDraggingStyles();
      cleanupRef.current = () => {};
    };

    const handleMouseMove = ({ clientX, clientY }: MouseEvent) => {
      const dragState = dragStateRef.current;
      if (!dragState) return;

      const deltaX = clientX - dragState.x;
      const deltaY = clientY - dragState.y;

      if (!dragState.moved && Math.abs(deltaX) < DRAG_THRESHOLD_PX && Math.abs(deltaY) < DRAG_THRESHOLD_PX) {
        return;
      }

      dragState.moved = true;
      setDraggingStyles();
      container.scrollLeft = dragState.left - deltaX;
      container.scrollTop = dragState.top - deltaY;
    };

    const handleMouseUp = () => {
      stopDragging(true);
    };

    cleanupRef.current = () => {
      stopDragging(false);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
    window.addEventListener("blur", handleMouseUp);
  };

  const onClickCapture = (event: ReactMouseEvent<T>) => {
    if (!suppressClickRef.current) return;

    suppressClickRef.current = false;
    event.preventDefault();
    event.stopPropagation();
  };

  useEffect(() => {
    return () => {
      cleanupRef.current();
      resetDraggingStyles();
    };
  }, []);

  return { onMouseDown, onClickCapture };
};
