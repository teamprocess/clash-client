import styled from "styled-components";
import { font } from "@/shared/config/font";
import { palette } from "@/shared/config/theme";
import CheckImg from "../assets/check.svg";
import LockImg from "../assets/lock.svg";
import Star1Img from "../assets/star1.svg";
import Star2Img from "../assets/star2.svg";
import Star3Img from "../assets/star3.svg";

interface NodeCircleProps {
  $status: "completed" | "current" | "locked";
}

interface IconProps {
  $width: number;
  $height: number;
}

export const NodeGroup = styled.g`
  cursor: pointer;
  transition: transform 0.2s;

  &:hover {
    transform: scale(1.1);
  }
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

export const CheckMark = styled.text`
  font-size: 28px;
  font-weight: bold;
  fill: white;
  user-select: none;
  pointer-events: none;
`;

export const NodeNumber = styled.text`
  ${font.display1.medium};
  fill: ${palette.neutral["97"]};
  user-select: none;
  pointer-events: none;
`;

export const Star = styled.text`
  font-size: 20px;
`;

export const CheckIcon = styled(CheckImg).attrs((props: IconProps) => ({
  width: props.$width,
  height: props.$height,
}))<IconProps>`
  pointer-events: none;
`;

export const LockIcon = styled(LockImg).attrs((props: IconProps) => ({
  width: props.$width,
  height: props.$height,
}))<IconProps>`
  pointer-events: none;
`;

export const Star1Icon = styled(Star1Img).attrs((props: IconProps) => ({
  width: props.$width,
  height: props.$height,
}))<IconProps>`
  pointer-events: none;
`;

export const Star2Icon = styled(Star2Img).attrs((props: IconProps) => ({
  width: props.$width,
  height: props.$height,
}))<IconProps>`
  pointer-events: none;
`;

export const Star3Icon = styled(Star3Img).attrs((props: IconProps) => ({
  width: props.$width,
  height: props.$height,
}))<IconProps>`
  pointer-events: none;
`;
