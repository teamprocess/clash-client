import styled, { keyframes } from "styled-components";
import { font } from "@/shared/config/font";
import Clash from "./assets/clash-logo.svg";
import Apple from "./assets/apple.svg";

const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(1.5rem);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

export const OnboardingContainer = styled.main`
  position: relative;
  width: 100%;
  min-height: 100vh;
  padding: 2rem 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  background:
    radial-gradient(
      circle at 15% 10%,
      ${({ theme }) => theme.fill.alternative} 0%,
      transparent 35%
    ),
    radial-gradient(circle at 85% 25%, ${({ theme }) => theme.primary.normal} 0%, transparent 32%),
    linear-gradient(
      140deg,
      ${({ theme }) => theme.background.normal} 0%,
      ${({ theme }) => theme.background.alternative} 55%,
      ${({ theme }) => theme.fill.normal} 100%
    );

  &::before {
    content: "";
    position: absolute;
    inset: 0;
    background:
      radial-gradient(circle, ${({ theme }) => theme.line.normal} 1px, transparent 1px) 2rem 3rem /
        8rem 8rem,
      radial-gradient(circle, ${({ theme }) => theme.line.alternative} 1px, transparent 1px) 0 0 /
        9rem 9rem;
    opacity: 0.2;
    pointer-events: none;
  }
`;

export const Hero = styled.section`
  position: relative;
  z-index: 1;
  width: min(68rem, 100%);
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(14rem, 20rem);
  gap: 3rem;
  align-items: center;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  color: ${({ theme }) => theme.label.strong};
  animation: ${fadeInUp} 0.7s ease-out both;
`;

export const ClashLogo = styled(Clash)`
  width: 10.5rem;
  height: auto;
`;

export const Title = styled.h1`
  ${font.display1.bold};
  max-width: 30rem;
  letter-spacing: -0.03em;
  line-height: 1.08;
  font-size: clamp(2rem, 4.6vw, 3.75rem);
  text-transform: uppercase;
`;

export const Description = styled.p`
  ${font.headline1.regular};
  max-width: 32rem;
  color: ${({ theme }) => theme.label.neutral};
  line-height: 1.55;
`;

export const DownloadButton = styled.a`
  ${font.headline2.medium};
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.55rem;
  width: fit-content;
  padding: 0.95rem 1.5rem;
  border-radius: 999px;
  color: ${({ theme }) => theme.label.normal};
  background-color: ${({ theme }) => theme.primary.normal};
  border: 1px solid ${({ theme }) => theme.primary.normal};
  transition:
    transform 0.2s ease,
    opacity 0.2s ease;

  &:hover {
    transform: translateY(-2px);
    opacity: 0.9;
  }

  &:active {
    transform: translateY(0);
  }
`;

export const AppleIcon = styled(Apple)`
  width: 1.35rem;
  height: 1.35rem;
  color: inherit;
  flex-shrink: 0;
`;
