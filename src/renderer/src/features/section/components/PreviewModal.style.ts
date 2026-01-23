import styled from "styled-components";
import { font } from "@/shared/config/font";
import { palette } from "@/shared/config/theme";
import Check from "../assets/check.svg";
import Roadmap from "../assets/roadmap.svg";
import Flag from "../assets/flag.svg";
import Arrow from "../assets/arrow.svg";
import Star from "../assets/star.svg";

export const PreviewModalWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  padding: 3rem 5rem;
  gap: 2rem;
`;

export const PreviewModalTop = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1.5rem;
`;

export const PreviewModalIntro = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 2rem;
  width: 100%;
`;

export const PreviewModalTitle = styled.span`
  ${font.display1.bold}
  color: ${({ theme }) => theme.label.normal};
  width: 100%;
  text-align: start;
`;

export const PreviewModalInfo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

export const PreviewModalDescription = styled.p`
  ${font.body.medium}
  color: ${({ theme }) => theme.label.assistive};
`;

export const PreviewModalAction = styled.div<{ $locked?: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  ${font.label.medium}
  color: ${({ $locked }) => ($locked ? palette.neutral["70"] : palette.neutral["99"])};
  background-color: ${({ theme, $locked }) =>
    $locked ? theme.line.neutral : theme.primary.normal};
  border-radius: 0.25rem;
  padding: 0.5rem 2.5rem;
  cursor: ${({ $locked }) => ($locked ? "not-allowed" : "pointer")};
  transition:
    background-color 0.2s ease,
    color 0.2s ease;
`;

export const SectionDivider = styled.div<{ $type: string }>`
  background-color: ${({ theme }) => theme.line.neutral};
  background-color: ${({ theme, $type }) =>
    $type === "Preview" ? theme.line.neutral : theme.line.normal};
  width: 100%;
  height: 0.1rem;
`;

export const PreviewModalBottom = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  gap: 1.6rem;
`;

export const PreviewModalHead = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 1.5rem;
  width: 100%;
  padding: 0.5rem 2.5rem;
  background-color: ${({ theme }) => theme.background.neutral};
  border-radius: 0.75rem;
`;

export const CheckIcon = styled(Check)``;

export const PreviewModalHeadLabel = styled.span`
  ${font.body.medium}
  color: ${({ theme }) => theme.label.alternative};
`;

export const PreviewModalBody = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

export const RoadmapBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 2rem;
  gap: 2.5rem;
  width: 42rem;
  height: 26rem;
  background-color: ${({ theme }) => theme.background.normal};
  border-radius: 1.25rem;
  box-shadow: 0 0 7px 0 ${({ theme }) => theme.line.normal};
`;

export const TargetBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: 17rem;
  height: 26rem;
  background-color: ${({ theme }) => theme.line.neutral};
  border-radius: 1.25rem;
  padding: 1.5rem;
  gap: 2.5rem;
`;

export const RoadmapTop = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 1rem;
  width: 100%;
`;

export const RoadmapBottom = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 2.5rem;
  width: 100%;
`;

export const RoadmapIcon = styled(Roadmap)`
  width: 2rem;
  height: 2rem;
`;

export const RoadmapTitle = styled.span`
  ${font.headline1.medium}
  color: ${({ theme }) => theme.label.assistive};
`;

export const StepCircle = styled.div<{ $active?: boolean }>`
  width: 2.25rem;
  height: 2.25rem;
  border-radius: 50%;
  background-color: ${({ $active, theme }) =>
    $active ? theme.primary.normal : theme.line.neutral};
  color: ${({ $active, theme }) => ($active ? palette.neutral["97"] : theme.label.alternative)};
  ${font.title2.medium};
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1;
`;

export const RoadmapSteps = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  gap: 4.5rem;
  margin-top: 4rem;

  &::before {
    content: "";
    position: absolute;
    top: 50%;
    left: 0;
    right: 0;
    height: 2px;
    background-color: ${({ theme }) => theme.line.neutral};
    z-index: 0;
  }
`;

export const StepWrapper = styled.div`
  position: relative;
  z-index: 1;
`;

export const StepTooltip = styled.div`
  position: absolute;
  bottom: 3rem;
  left: 50%;
  transform: translateX(-50%);
  background-color: ${({ theme }) => theme.line.normal};
  ${font.headline2.medium}
  color: ${palette.neutral["20"]};
  padding: 0.5rem 1rem;
  border-radius: 0.75rem;
  white-space: nowrap;
  width: max-content;
  max-width: none;
  &::after {
    content: "";
    position: absolute;
    top: 100%;
    left: 50%;
    transform: translateX(-50%);
    border-width: 7px 5px 0 5px;
    border-style: solid;
    border-color: ${({ theme }) => theme.line.normal} transparent transparent transparent;
  }
`;

export const StepFlag = styled(Flag)``;

export const RoadmapDescriptionBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  padding: 1.25rem;
  width: 100%;
  height: 5rem;
  background-color: ${({ theme }) => theme.background.neutral};
  border-radius: 0.75rem;
`;

export const RoadmapNumberBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 2.8rem;
  height: 2.8rem;
  background-color: ${({ theme }) => theme.primary.normal};
  border-radius: 0.5rem;
`;

export const StepTitle = styled.span`
  ${font.caption.regular}
  color: ${palette.neutral["90"]};
`;

export const RoadmapNumber = styled.span`
  ${font.title2.medium}
  color: ${palette.neutral["90"]};
`;

export const RoadmapDescription = styled.span`
  ${font.headline2.medium}
  color: ${({ theme }) => theme.label.alternative};
  width: 32rem;
`;

export const RoadmapStepBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
`;

export const ArrowIcon = styled(Arrow)<{ $direction: "left" | "right" }>`
  rotate: ${({ $direction }) => ($direction === "left" ? "0deg" : "180deg")};
`;

export const CurrentStepLabel = styled.span`
  ${font.title2.medium}
  color: ${({ theme }) => theme.primary.normal};
`;

export const StepLabel = styled.div`
  display: flex;
  ${font.title2.medium}
  color: ${({ theme }) => theme.label.alternative};
`;

export const TotalStepLabel = styled.span`
  ${font.title2.medium}
  color: ${({ theme }) => theme.label.alternative};
`;

export const TargetBoxTop = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 2rem;
  width: 100%;
`;

export const TargetLabel = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  ${font.caption.medium}
  color: ${({ theme }) => theme.label.alternative};
  background-color: ${({ theme }) => theme.label.disable};
  width: 6rem;
  height: 2rem;
  border-radius: 1rem;
`;

export const TargetTitle = styled.span`
  ${font.headline1.bold}
  color: ${({ theme }) => theme.label.alternative};
`;

export const TargetBoxIntro = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 0.75rem;
  width: 100%;
`;

export const TargetBoxList = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 0.75rem;
`;

export const TargetItem = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
`;

export const TargetStarWrapper = styled.div`
  width: 1.5rem;
  height: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
`;

export const TargetStar = styled(Star)`
  width: 100%;
  height: 100%;
`;

export const TargetItemText = styled.span`
  ${font.headline2.medium}
  color: ${({ theme }) => theme.label.assistive};
`;

export const ArrowButton = styled.div<{ $disabled: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: ${({ $disabled }) => ($disabled ? 0.3 : 1)};
  cursor: ${({ $disabled }) => ($disabled ? "not-allowed" : "pointer")};
  pointer-events: ${({ $disabled }) => ($disabled ? "none" : "auto")};
  transition: opacity 0.2s ease;

  &:hover:not([disabled]) {
    opacity: 0.8;
  }
`;
