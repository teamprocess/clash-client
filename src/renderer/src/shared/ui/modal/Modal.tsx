import * as S from "./Modal.style";
import { ReactNode } from "react";

interface ModalProps {
  modalTitle?: string;
  $width: number;
  $height: number;
  isOpen: boolean;
  onClose?: () => void;
  children?: ReactNode;
  gap?: number;
}

export const Modal = ({
  modalTitle,
  onClose,
  isOpen,
  $width,
  $height,
  children,
  gap = 0,
}: ModalProps) => {
  if (!isOpen) return null;
  return (
    <S.ModalOverlay>
      <S.ModalContainer $width={$width} $height={$height} $gap={gap}>
        {modalTitle && <S.ModalTitle>{modalTitle}</S.ModalTitle>}
        {onClose && (
          <S.CloseButton onClick={onClose}>
            <S.CloseIcon />
          </S.CloseButton>
        )}
        <S.ModalContent>{children}</S.ModalContent>
      </S.ModalContainer>
    </S.ModalOverlay>
  );
};
