import type { HTMLAttributes } from "react";
import { ViewportColumnRoot } from "./ViewportColumn.style";

export type ViewportMode = "fixed" | "dynamic";
export type ViewportColumnOverflow = "visible" | "auto" | "hidden";

export interface ViewportColumnProps extends HTMLAttributes<HTMLDivElement> {
  viewport?: ViewportMode;
  overflowY?: ViewportColumnOverflow;
}

export const ViewportColumn = ({
  viewport = "fixed",
  overflowY = "visible",
  ...props
}: ViewportColumnProps) => (
  <ViewportColumnRoot $viewport={viewport} $overflowY={overflowY} {...props} />
);
