import { type CSSProperties, type ReactNode } from "react";
import * as S from "./Tooltip.style";
import type { TooltipPosition } from "./Tooltip.style";

export interface TooltipProps {
  content: ReactNode;
  children: ReactNode;
  position?: TooltipPosition;
  offset?: number;
  maxWidth?: string;
  disabled?: boolean;
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
  className,
  wrapperStyle,
}: TooltipProps) => {
  if (disabled) {
    return <>{children}</>;
  }

  return (
    <S.TooltipWrapper className={className} style={wrapperStyle}>
      {children}
      <S.TooltipBubble
        role="tooltip"
        data-role="tooltip-bubble"
        $position={position}
        $offset={offset}
        $maxWidth={maxWidth}
      >
        {content}
        <S.TooltipArrow $position={position} />
      </S.TooltipBubble>
    </S.TooltipWrapper>
  );
};
