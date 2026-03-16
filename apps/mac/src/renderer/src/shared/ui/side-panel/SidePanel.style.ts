import styled, { keyframes } from "styled-components";

const fadeIn = keyframes`
  from {
    opacity: 0;
  }

  to {
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

export const Overlay = styled.div<{ $closing: boolean; $position: "absolute" | "fixed" }>`
  position: ${({ $position }) => $position};
  inset: 0;
  display: flex;
  justify-content: flex-end;
  width: 100vw;
  height: 100dvh;
  background-color: rgba(0, 0, 0, 0.52);
  backdrop-filter: blur(4px);
  z-index: 1200;
  animation: ${({ $closing }) => ($closing ? fadeOut : fadeIn)} 0.22s ease forwards;
`;

export const Panel = styled.div<{ $closing: boolean; $width: string }>`
  display: flex;
  flex-direction: column;
  width: ${({ $width }) => $width};
  max-width: 100%;
  height: 100%;
  background-color: ${({ theme }) => theme.background.normal};
  border-left: 1px solid ${({ theme }) => theme.line.alternative};
  animation: ${({ $closing }) => ($closing ? slideOut : slideIn)} 0.24s ease forwards;
  box-shadow: -4px 0 12px rgba(0, 0, 0, 0.12);
`;
