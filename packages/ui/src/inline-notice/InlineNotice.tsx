import type { HTMLAttributes } from "react";
import { InlineNoticeRoot } from "./InlineNotice.style";

export type InlineNoticeAppearance = "outline" | "surface";
export type InlineNoticeDensity = "compact" | "regular";
export type InlineNoticeTone = "neutral" | "danger" | "success";

export interface InlineNoticeProps extends HTMLAttributes<HTMLDivElement> {
  appearance?: InlineNoticeAppearance;
  density?: InlineNoticeDensity;
  tone?: InlineNoticeTone;
}

export const InlineNotice = ({
  appearance = "outline",
  density = "compact",
  tone = "neutral",
  ...props
}: InlineNoticeProps) => (
  <InlineNoticeRoot $appearance={appearance} $density={density} $tone={tone} {...props} />
);
