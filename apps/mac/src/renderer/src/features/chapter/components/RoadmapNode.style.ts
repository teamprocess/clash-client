import styled from "styled-components";
import { font } from "@clash/design-tokens/font";
import { palette } from "@clash/design-tokens/theme";
import CheckImg from "../assets/check.svg";
import LockImg from "../assets/lock.svg";
import Star1Img from "../assets/star1.svg";
import Star2Img from "../assets/star2.svg";
import Star3Img from "../assets/star3.svg";

interface NodeCircleProps {
  $status: "completed" | "current" | "locked";
}

export const NodeGroup = styled.g`
  cursor: pointer;
  transition: transform 0.2s;
`;

export const NodeCircle = styled.circle<NodeCircleProps>`
  fill: ${({ $status, theme }) =>
    $status === "completed"
      ? theme.label.assistive
      : $status === "current"
        ? theme.primary.normal
        : theme.background.neutral};

  stroke: ${({ $status, theme }) =>
    $status === "completed"
      ? theme.line.normal
      : $status === "current"
        ? theme.primary.normal
        : theme.line.neutral};

  stroke-width: 5;
`;

export const NodeNumber = styled.text`
  ${font.display1.medium};
  fill: ${palette.neutral["97"]};
  user-select: none;
  pointer-events: none;
  dominant-baseline: middle;
`;

export const CheckIcon = styled(CheckImg)`
  pointer-events: none;
`;

export const LockIcon = styled(LockImg)`
  pointer-events: none;
`;

export const Star1Icon = styled(Star1Img)`
  pointer-events: none;
`;

export const Star2Icon = styled(Star2Img)`
  pointer-events: none;
`;

export const Star3Icon = styled(Star3Img)`
  pointer-events: none;
`;
