import { type CSSProperties, type ReactNode, useLayoutEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import * as S from "./Tooltip.style";
import type { TooltipPosition } from "./Tooltip.style";

export interface TooltipProps {
  content: ReactNode;
  children: ReactNode;
  position?: TooltipPosition;
  offset?: number;
  maxWidth?: string;
  disabled?: boolean;
  open?: boolean;
  triggerOnHover?: boolean;
  className?: string;
  wrapperStyle?: CSSProperties;
}

export const Tooltip = ({
  content,
  children,
  position = "top",
  offset = 8,
  maxWidth,
  disabled = false,
  open = false,
  triggerOnHover = true,
  className,
  wrapperStyle,
}: TooltipProps) => {
  const wrapperRef = useRef<HTMLSpanElement>(null);
  const bubbleRef = useRef<HTMLSpanElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const isVisible = open || (triggerOnHover && isHovered);

  useLayoutEffect(() => {
    const bubbleElement = bubbleRef.current;
    const wrapperElement = wrapperRef.current;

    if (!bubbleElement) {
      return;
    }

    if (!isVisible || !wrapperElement) {
      bubbleElement.style.visibility = "hidden";
      bubbleElement.style.opacity = "0";
      return;
    }

    let frameId = 0;

    const updatePosition = () => {
      const wrapperRect = wrapperElement.getBoundingClientRect();
      const bubbleRect = bubbleElement.getBoundingClientRect();

      let top = 0;
      let left = 0;

      switch (position) {
        case "top":
          top = wrapperRect.top - bubbleRect.height - offset;
          left = wrapperRect.left + wrapperRect.width / 2 - bubbleRect.width / 2;
          break;
        case "right":
          top = wrapperRect.top + wrapperRect.height / 2 - bubbleRect.height / 2;
          left = wrapperRect.right + offset;
          break;
        case "bottom":
          top = wrapperRect.bottom + offset;
          left = wrapperRect.left + wrapperRect.width / 2 - bubbleRect.width / 2;
          break;
        case "left":
          top = wrapperRect.top + wrapperRect.height / 2 - bubbleRect.height / 2;
          left = wrapperRect.left - bubbleRect.width - offset;
          break;
      }

      const maxLeft = Math.max(8, window.innerWidth - bubbleRect.width - 8);
      const maxTop = Math.max(8, window.innerHeight - bubbleRect.height - 8);

      bubbleElement.style.left = `${Math.min(Math.max(left, 8), maxLeft)}px`;
      bubbleElement.style.top = `${Math.min(Math.max(top, 8), maxTop)}px`;
      bubbleElement.style.visibility = "visible";
      bubbleElement.style.opacity = "1";
    };

    const schedulePositionUpdate = () => {
      cancelAnimationFrame(frameId);
      frameId = requestAnimationFrame(updatePosition);
    };

    schedulePositionUpdate();

    window.addEventListener("resize", schedulePositionUpdate);
    window.addEventListener("scroll", schedulePositionUpdate, true);

    const resizeObserver =
      typeof ResizeObserver === "undefined"
        ? null
        : new ResizeObserver(() => {
            schedulePositionUpdate();
          });

    resizeObserver?.observe(wrapperElement);
    resizeObserver?.observe(bubbleElement);

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener("resize", schedulePositionUpdate);
      window.removeEventListener("scroll", schedulePositionUpdate, true);
      resizeObserver?.disconnect();
      bubbleElement.style.visibility = "hidden";
      bubbleElement.style.opacity = "0";
    };
  }, [isVisible, offset, position]);

  if (disabled) {
    return <>{children}</>;
  }

  return (
    <S.TooltipWrapper
      ref={wrapperRef}
      className={className}
      style={wrapperStyle}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onFocus={() => setIsHovered(true)}
      onBlur={() => setIsHovered(false)}
    >
      {children}
      {typeof document !== "undefined" &&
        createPortal(
          <S.TooltipBubble ref={bubbleRef} role="tooltip" $maxWidth={maxWidth}>
            {content}
            <S.TooltipArrow $position={position} />
          </S.TooltipBubble>,
          document.body
        )}
    </S.TooltipWrapper>
  );
};
