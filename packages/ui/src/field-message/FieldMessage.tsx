import type { HTMLAttributes } from "react";
import { FieldMessageRoot } from "./FieldMessage.style";

export type FieldMessageTone = "danger" | "success" | "neutral";

export interface FieldMessageProps extends HTMLAttributes<HTMLSpanElement> {
  tone?: FieldMessageTone;
}

export const FieldMessage = ({ tone = "danger", ...props }: FieldMessageProps) => (
  <FieldMessageRoot $tone={tone} {...props} />
);
