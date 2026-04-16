import styled, { keyframes } from "styled-components";
import { font } from "@clash/design-tokens/font";
import { ClashLoadingIcon } from "@/shared/ui";
import { Button } from "@/shared/ui/button";

const pulse = keyframes`
  0%,
  100% {
    transform: scale(1);
    opacity: 0.88;
  }

  50% {
    transform: scale(1.04);
    opacity: 1;
  }
`;

interface StartupContainerProps {
  $windowMode: "app" | "launcher";
}

export const StartupContainer = styled.main<StartupContainerProps>`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100vh;
  padding: ${({ $windowMode }) => ($windowMode === "launcher" ? "1rem" : "2rem")};
  overflow: hidden;
  -webkit-app-region: ${({ $windowMode }) => ($windowMode === "launcher" ? "drag" : "no-drag")};
`;

export const AmbientGlow = styled.div`
  display: none;
`;

interface PanelProps {
  $windowMode: "app" | "launcher";
}

export const Panel = styled.section<PanelProps>`
  position: relative;
  width: min(19.5rem, 100%);
  padding: 1.5rem 1.35rem 1.2rem;
`;

export const IconBox = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 5.25rem;
  height: 5.25rem;
  margin: 0 auto 1rem;
  border-radius: 50%;
`;

export const LoadingIcon = styled(ClashLoadingIcon)`
  width: 2.7rem;
  height: auto;
  display: block;
  animation: ${pulse} 1.7s ease-in-out infinite;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 0.35rem;
`;

export const Title = styled.h1`
  ${font.headline2.bold}
  color: ${({ theme }) => theme.label.strong};
`;

export const Description = styled.p`
  max-width: 20rem;
  ${font.caption.regular}
  color: ${({ theme }) => theme.label.alternative};
  word-break: keep-all;
  margin-top: 0.25rem;
`;

export const ProgressSection = styled.div`
  width: 100%;
  margin-top: 0.85rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const ProgressMeta = styled.div`
  display: flex;
  justify-content: center;
  ${font.label.medium}
  color: ${({ theme }) => theme.label.neutral};
`;

export const ProgressTrack = styled.div`
  width: 100%;
  height: 0.25rem;
  overflow: hidden;
  border-radius: 999px;
  background: ${({ theme }) => theme.line.alternative};
`;

export const ProgressFill = styled.div<{ $progressPercent: number }>`
  width: ${({ $progressPercent }) => `${$progressPercent}%`};
  height: 100%;
  border-radius: inherit;
  background: ${({ theme }) => theme.primary.normal};
  transition: width 0.2s ease;
`;

export const ActionRow = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  margin-top: 1.25rem;
  -webkit-app-region: no-drag;
`;

export const RetryButton = styled(Button)`
  min-width: 8rem;
  -webkit-app-region: no-drag;
`;

export const StartingContainer = styled.main`
  position: relative;
  width: 100%;
  height: 100vh;
  padding: 4rem;
`;

export const StartingBox = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const StartingIcon = styled(ClashLoadingIcon)`
  width: min(3rem, 14vw);
  height: auto;
  display: block;
  animation: ${pulse} 1.5s ease-in-out infinite;

  @media (max-width: 640px) {
    width: min(3.25rem, 20vw);
  }
`;

export const StartingActionBox = styled.div`
  position: absolute;
  left: 50%;
  bottom: 4rem;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  cursor: default;
  text-align: center;
`;

export const StartingTitle = styled.strong`
  ${font.body.regular}
  color: ${({ theme }) => theme.label.normal};
`;

export const StartingDescription = styled.p`
  ${font.body.regular}
  color: ${({ theme }) => theme.label.alternative};
`;
