import styled from "styled-components";
import Close from "@/features/home/assets/home/no.svg";
import { font } from "@/shared/config/font";

export const ModalOverlay = styled.div`
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

export const ModalContainer = styled.div<{ $width: number; $height: number }>`
  padding: 1.25rem;
  border-radius: 1.25rem;
  width: ${({ $width }) => $width}rem;
  height: ${({ $height }) => $height}rem;
  background-color: ${({ theme }) => theme.background.normal};
  position: relative;
  display: flex;
`;

export const ModalTitle = styled.p`
  ${font.title2.medium}
`;

export const CloseIcon = styled(Close)``;

export const CloseButton = styled.div`
  position: absolute;
  top: 1rem;
  right: 1rem;
  cursor: pointer;
`;

export const ModalContent = styled.div<{ $gap: number }>`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  gap: ${({ $gap }) => $gap}rem;
`;
