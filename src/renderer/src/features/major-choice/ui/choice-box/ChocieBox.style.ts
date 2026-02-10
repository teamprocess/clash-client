import styled from "styled-components";
import Check from "@/features/major-choice/assets/check.svg";
import NotCheck from "@/features/major-choice/assets/not-check.svg";
import { font } from "@/shared/config/font";

export type ChoiceBoxSize = "sm" | "md" | "lg";

const sizeMap = {
  sm: {
    width: "9rem",
    height: "10.5rem",
  },
  md: {
    width: "11rem",
    height: "12.5rem",
  },
  lg: {
    width: "13rem",
    height: "14.5rem",
  },
};

export const ChoiceBox = styled.div<{
  $isSelected: boolean;
  $size: ChoiceBoxSize;
}>`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;

  background-color: ${({ theme }) => theme.background.normal};
  border-radius: 0.75rem;

  box-shadow: 0 0 6px 0
    ${({ $isSelected, theme }) => ($isSelected ? theme.primary.normal : theme.line.normal)};

  width: ${({ $size }) => sizeMap[$size].width};
  height: ${({ $size }) => sizeMap[$size].height};

  cursor: pointer;
`;

export const ChoiceItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
`;

export const CheckedIcon = styled(Check)`
  position: absolute;
  top: 0.75rem;
  right: 0.75rem;
  width: 1.5rem;
  height: 1.5rem;
`;

export const NotCheckedIcon = styled(NotCheck)`
  position: absolute;
  top: 0.75rem;
  right: 0.75rem;
  width: 1.5rem;
  height: 1.5rem;
`;

export const ChoiceText = styled.span`
  ${font.headline1.medium};
  color: ${({ theme }) => theme.label.alternative};
`;
