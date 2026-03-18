import type { ReactNode } from "react";
import { Tooltip } from "../tooltip";
import type { TooltipPosition } from "../tooltip";
import * as S from "./QuestionTooltip.style";

export interface QuestionTooltipProps {
  content: ReactNode;
  label?: string;
  position?: TooltipPosition;
  maxWidth?: string;
  className?: string;
}

export const QuestionTooltip = ({
  content,
  label = "설명 보기",
  position = "top",
  maxWidth = "24rem",
  className,
}: QuestionTooltipProps) => {
  return (
    <Tooltip content={content} position={position} maxWidth={maxWidth} className={className}>
      <S.Trigger type="button" aria-label={label}>
        ?
      </S.Trigger>
    </Tooltip>
  );
};
