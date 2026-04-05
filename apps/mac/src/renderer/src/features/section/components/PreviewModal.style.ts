import styled from "styled-components";
import { font } from "@clash/design-tokens/font";
import { palette } from "@clash/design-tokens/theme";
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
  padding: 2rem;
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
  align-items: stretch;
  width: 100%;
  gap: 1rem;
`;

export const RoadmapBox = styled.div`
  display: flex;
  flex: 3;
  flex-direction: column;
  justify-content: flex-start;
  align-items: stretch;
  padding: 2rem 2rem 1.75rem;
  gap: 1.75rem;
  width: 42rem;
  height: 26rem;
  background-color: ${({ theme }) => theme.background.normal};
  border-radius: 1.25rem;
  box-shadow: 0 0 7px 0 ${({ theme }) => theme.line.normal};
  min-width: 0;
  overflow: hidden;
  box-sizing: border-box;
`;

export const TargetBox = styled.div`
  display: flex;
  flex: 1;
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
  justify-content: flex-start;
  align-items: stretch;
  gap: 1.5rem;
  flex: 1 1 auto;
  min-height: 0;
  width: 100%;
  min-width: 0;
`;

export const RoadmapIcon = styled(Roadmap)`
  width: 2rem;
  height: 2rem;
`;

export const RoadmapTitle = styled.span`
  ${font.headline1.medium}
  color: ${({ theme }) => theme.label.assistive};
`;

export const RoadmapStepsContainer = styled.div`
  width: 100%;
  max-width: 100%;
  box-sizing: border-box;
  overflow-x: auto;
  overflow-y: hidden;
  padding: 4.75rem 1.5rem 1.25rem;
`;

export const EmptyRoadmapState = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  min-height: 5rem;
  text-align: center;
  ${font.body.medium}
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
  flex-shrink: 0;
`;

export const RoadmapSteps = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  gap: 4.5rem;
  width: max-content;
  padding: 0 1.5rem;

  &::before {
    content: "";
    position: absolute;
    top: 50%;
    left: 1.5rem;
    right: 1.5rem;
    height: 2px;
    background-color: ${({ theme }) => theme.line.neutral};
    z-index: 0;
  }
`;

export const StepWrapper = styled.div`
  position: relative;
  z-index: 1;
  cursor: pointer;
`;

export const StepTooltip = styled.div<{ $align?: "left" | "center" | "right" }>`
  position: absolute;
  bottom: 3rem;
  left: ${({ $align }) => ($align === "right" ? "auto" : $align === "left" ? "0" : "50%")};
  right: ${({ $align }) => ($align === "right" ? "0" : "auto")};
  transform: ${({ $align }) => ($align === "center" ? "translateX(-50%)" : "none")};
  background-color: ${({ theme }) => theme.line.normal};
  ${font.headline2.medium}
  color: ${palette.neutral["20"]};
  padding: 0.5rem 1rem;
  border-radius: 0.75rem;
  white-space: normal;
  width: max-content;
  max-width: 14rem;
  text-align: center;
  word-break: keep-all;
  z-index: 2;

  &::after {
    content: "";
    position: absolute;
    top: 100%;
    left: ${({ $align }) => ($align === "right" ? "auto" : $align === "left" ? "1.5rem" : "50%")};
    right: ${({ $align }) => ($align === "right" ? "1.5rem" : "auto")};
    transform: ${({ $align }) => ($align === "center" ? "translateX(-50%)" : "none")};
    border-width: 7px 5px 0 5px;
    border-style: solid;
    border-color: ${({ theme }) => theme.line.normal} transparent transparent transparent;
  }
`;

export const StepFlag = styled(Flag)``;

export const RoadmapDescriptionBox = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 1rem;
  padding: 1.25rem;
  width: 100%;
  height: 5rem;
  background-color: ${({ theme }) => theme.background.neutral};
  border-radius: 0.75rem;
  min-width: 0;
`;

export const RoadmapNumberBox = styled.button`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 2.8rem;
  height: 2.8rem;
  background-color: ${({ theme }) => theme.primary.normal};
  border-radius: 0.5rem;
  flex-shrink: 0;
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
  flex: 1;
  min-width: 0;
  white-space: normal;
  word-break: keep-all;
`;

export const EmptyRoadmapDescription = styled.span`
  ${font.headline2.medium}
  color: ${({ theme }) => theme.label.assistive};
  text-align: center;
`;

export const RoadmapStepBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  margin-top: auto;
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
  gap: 5px;
`;

export const TotalStepLabel = styled.span`
  ${font.title2.medium}
  color: ${({ theme }) => theme.label.alternative};
`;

export const EmptyStepLabel = styled.span`
  ${font.title2.medium}
  color: ${({ theme }) => theme.label.assistive};
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
  align-items: flex-start;
  gap: 0.75rem;
  width: 100%;
  overflow-y: auto;
`;

export const TargetItem = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  word-break: break-all;
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
  ${font.body.medium}
  color: ${({ theme }) => theme.label.assistive};
`;

export const ArrowButton = styled.button<{ $disabled: boolean }>`
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
