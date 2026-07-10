import styled from "styled-components";
import { font } from "@clash/design-tokens/font";
import type { FieldMessageTone } from "./FieldMessage";

export const FieldMessageRoot = styled.span<{ $tone: FieldMessageTone }>`
  ${font.caption.medium};
  display: block;
  margin-top: 0.5rem;
  color: ${({ theme, $tone }) => {
    const colors: Record<FieldMessageTone, string> = {
      danger: theme.feedback.danger,
      success: theme.feedback.success,
      neutral: theme.label.alternative,
    };

    return colors[$tone];
  }};
`;
