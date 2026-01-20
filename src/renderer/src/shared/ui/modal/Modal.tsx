import * as S from "./Modal.style";
import { ReactNode } from "react";

interface ModalProps {
  modalTitle?: string;
  width: number;
  height: number;
  isOpen: boolean;
  onClose?: () => void;
  showClose?: boolean;
  children?: ReactNode;
  gap?: number;
}

export const Modal = ({
  modalTitle,
  onClose,
  isOpen,
  width,
  height,
  children,
  gap = 0,
  showClose = true,
}: ModalProps) => {
  if (!isOpen) return null;
  return (
    <S.ModalOverlay>
      <S.ModalContainer $width={width} $height={height}>
        {modalTitle && <S.ModalTitle>{modalTitle}</S.ModalTitle>}
        {showClose && onClose && (
          <S.CloseButton onClick={onClose}>
            <S.CloseIcon />
          </S.CloseButton>
        )}
        <S.ModalContent $gap={gap}>{children}</S.ModalContent>
      </S.ModalContainer>
    </S.ModalOverlay>
  );
};
