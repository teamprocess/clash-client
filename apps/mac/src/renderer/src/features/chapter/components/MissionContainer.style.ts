import styled, { keyframes } from "styled-components";
import { font } from "@clash/design-tokens/font";
import Close from "@/features/profile/assets/close.svg";

const fadeIn = keyframes`
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
`;

const slideIn = keyframes`
  from {
    transform: translateX(2rem);
    opacity: 0;
  }

  to {
    transform: translateX(0);
    opacity: 1;
  }
`;

const fadeOut = keyframes`
  from {
    opacity: 1;
  }

  to {
    opacity: 0;
  }
`;

const slideOut = keyframes`
  from {
    transform: translateX(0);
    opacity: 1;
  }

  to {
    transform: translateX(2rem);
    opacity: 0;
  }
`;

export const MissionContainer = styled.div<{ $closing: boolean }>`
  position: absolute;
  inset: 0;
  display: flex;
  justify-content: flex-end;
  background-color: rgba(0, 0, 0, 0.52);
  backdrop-filter: blur(4px);
  z-index: 220;
  animation: ${({ $closing }) => ($closing ? fadeOut : fadeIn)} 0.22s ease forwards;
`;

export const Panel = styled.div<{ $closing: boolean }>`
  display: flex;
  flex-direction: column;
  width: min(100%, 34rem);
  height: 100%;
  padding: 3rem 2.5rem 2rem;
  background-color: ${({ theme }) => theme.background.normal};
  border-left: 1px solid ${({ theme }) => theme.line.alternative};
  animation: ${({ $closing }) => ($closing ? slideOut : slideIn)} 0.24s ease forwards;
`;

export const PanelHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 1rem;
`;

export const HeaderContent = styled.div`
  flex: 1;
  min-width: 0;
`;

export const PanelEyebrow = styled.span`
  ${font.caption.medium}
  color: ${({ theme }) => theme.primary.normal};
  letter-spacing: 0.08em;
  text-transform: uppercase;
`;

export const MissionTitle = styled.h2`
  ${font.title1.medium}
  color: ${({ theme }) => theme.label.strong};
  margin-top: 0.5rem;
  margin-bottom: 0.875rem;
`;

export const CloseButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 0.875rem;
  color: ${({ theme }) => theme.label.assistive};
  cursor: pointer;
  transition:
    background-color 0.2s ease,
    opacity 0.2s ease;

  &:hover {
    background-color: ${({ theme }) => theme.fill.normal};
    opacity: 0.88;
  }
`;

export const CloseIcon = styled(Close)`
  width: 1.5rem;
  height: 1.5rem;
`;

export const PanelBody = styled.div`
  flex: 1;
  padding: 2rem 0 1.75rem;
`;

export const ProgressRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
  margin-bottom: 0.625rem;
`;

export const ProgressLabel = styled.span`
  ${font.caption.medium}
  color: ${({ theme }) => theme.label.assistive};
`;

export const ProgressValue = styled.span`
  ${font.label.medium}
  color: ${({ theme }) => theme.label.neutral};
`;

export const ProgressAccent = styled.span`
  color: ${({ theme }) => theme.primary.normal};
`;

export const ProgressTrack = styled.div`
  position: relative;
  width: 100%;
  height: 0.72rem;
  background-color: ${({ theme }) => theme.fill.normal};
  border: 1px solid ${({ theme }) => theme.line.alternative};
  border-radius: 999px;
  overflow: hidden;
`;

export const ProgressFill = styled.div<{ $value: number }>`
  position: absolute;
  inset: 0 auto 0 0;
  width: ${({ $value }) => `${$value}%`};
  height: 100%;
  background-color: ${({ theme }) => theme.primary.normal};
  border-radius: inherit;
  transition: width 0.28s ease;
`;

export const ProgressTicks = styled.div`
  position: absolute;
  inset: -0.16rem 0;
  pointer-events: none;
`;

export const ProgressTick = styled.span`
  position: absolute;
  top: 0;
  bottom: 0;
  width: 2px;
  margin-left: -1px;
  border-radius: 999px;
  background-color: ${({ theme }) => theme.background.normal};
`;

export const DescriptionCard = styled.div`
  padding: 1.25rem;
  border-radius: 0.875rem;
  background-color: ${({ theme }) => theme.background.alternative};
  border: 1px solid ${({ theme }) => theme.line.alternative};
`;

export const MissionDescription = styled.p`
  ${font.headline2.regular}
  color: ${({ theme }) => theme.label.neutral};
  line-height: 1.5;
  word-break: keep-all;
  white-space: pre-wrap;
`;

export const PanelFooter = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;
