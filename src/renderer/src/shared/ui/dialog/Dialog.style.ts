import styled from "styled-components";
import { font } from "@/shared/config/font";

export const DialogOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
`;

export const DialogContainer = styled.div<{ $width: number; $height: number }>`
  padding: 1.25rem;
  border-radius: 1.25rem;
  width: ${({ $width }) => $width}rem;
  height: ${({ $height }) => $height}rem;
  background-color: ${({ theme }) => theme.background.normal};
  box-shadow: 0 0 7px 0 ${({ theme }) => theme.line.normal};
  position: relative;
  display: flex;
  flex-direction: column;
`;

export const DialogTitle = styled.p`
  ${font.title2.medium}
`;

export const CloseButton = styled.button`
  position: absolute;
  top: 1rem;
  right: 1rem;
  width: 1.5rem;
  height: 1.5rem;
  padding: 0;
  border: none;
  background: transparent;
  cursor: pointer;

  &::before,
  &::after {
    content: "";
    position: absolute;
    top: 50%;
    left: 50%;
    width: 0.85rem;
    height: 0.12rem;
    border-radius: 999px;
    background: ${({ theme }) => theme.label.assistive};
    transform-origin: center;
  }

  &::before {
    transform: translate(-50%, -50%) rotate(45deg);
  }

  &::after {
    transform: translate(-50%, -50%) rotate(-45deg);
  }
`;

export const DialogContent = styled.div<{ $gap: number }>`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  gap: ${({ $gap }) => $gap}rem;
`;
