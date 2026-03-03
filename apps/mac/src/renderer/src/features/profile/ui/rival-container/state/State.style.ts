import styled, { css } from "styled-components";
import { palette } from "@/shared/config/theme";
import { font } from "@/shared/config/font";

export type Status = "online" | "offline" | "away";

const styles = {
  online: css`
    background: ${palette.green[50]};
    color: ${palette.neutral[5]};
  `,
  offline: css`
    background: ${({ theme }) => theme.label.assistive};
    color: ${({ theme }) => theme.background.alternative};
  `,
  away: css`
    background: ${palette.yellow[50]};
    color: ${palette.neutral[5]};
  `,
} as const;

export const StateTag = styled.div<{ $status: Status }>`
  width: 3.25rem;
  height: 1.25rem;
  border-radius: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  ${font.caption.bold};
  ${({ $status }) => styles[$status]}
`;
