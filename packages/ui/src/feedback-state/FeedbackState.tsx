import type { HTMLAttributes } from "react";
import { FeedbackStateRoot } from "./FeedbackState.style";

export type FeedbackStateKind = "loading" | "error" | "empty";
export type FeedbackStateAppearance = "plain" | "dashed" | "surface";
export type FeedbackStateDensity = "compact" | "regular";
export type FeedbackStateTone = "neutral" | "danger" | "success";

export interface FeedbackStateProps extends HTMLAttributes<HTMLDivElement> {
  kind?: FeedbackStateKind;
  appearance?: FeedbackStateAppearance;
  density?: FeedbackStateDensity;
  tone?: FeedbackStateTone;
}

export const FeedbackState = ({
  kind = "empty",
  appearance = "plain",
  density = "regular",
  tone = "neutral",
  role,
  "aria-live": ariaLive,
  "aria-busy": ariaBusy,
  ...props
}: FeedbackStateProps) => (
  <FeedbackStateRoot
    $appearance={appearance}
    $density={density}
    $tone={tone}
    role={role ?? (kind === "loading" ? "status" : kind === "error" ? "alert" : undefined)}
    aria-live={ariaLive ?? (kind === "loading" ? "polite" : undefined)}
    aria-busy={ariaBusy}
    {...props}
  />
);
