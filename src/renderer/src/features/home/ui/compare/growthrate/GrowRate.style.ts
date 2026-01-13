import styled from "styled-components";
import { font } from "@/shared/config/font";
import { palette } from "@/shared/config/theme";
import Arrow from "@/features/home/assets/home/arrow.svg";
import { ArrowDegProps } from "@/features/home/model/useCompare";

export const GrowthWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 0.25rem;
`;

export const GrowthValue = styled.span<{ $status: "up" | "down" | "same" }>`
  ${font.label.bold};
  display: flex;
  flex-direction: row;
  padding: 0.15rem 0.75rem;
  gap: 0.25rem;
  align-items: center;
  color: ${palette.neutral[99]};
  background-color: ${({ $status }) => {
    if ($status === "up") return palette.green[40];
    if ($status === "down") return palette.red[50];
    return ({ theme }) => theme.label.assistive; // 동일 시 회색
  }};
  border-radius: 999px;
`;

export const GrowthRateArrowIcon = styled(Arrow)<ArrowDegProps>`
  width: 1rem;
  height: 1rem;
  transform: rotate(${({ $deg }) => $deg || 0}deg);
  path {
    fill: ${palette.neutral[99]};
  }
`;
