import * as S from "./Modal.style";
import { ReactNode } from "react";

interface ModalProps {
  modalTitle?: string;
  $width: number;
  $height: number;
  isOpen: boolean;
  onClose?: () => void;
  children?: ReactNode;
}

export const Modal = ({ modalTitle, onClose, isOpen, $width, $height, children }: ModalProps) => {
  if (!isOpen) return null;
  return (
    <S.ModalOverlay>
      <S.ModalContainer $width={$width} $height={$height}>
        <S.ModalHeader>
          {modalTitle && <S.ModalTitle>{modalTitle}</S.ModalTitle>}
          {onClose && (
            <S.CloseButton onClick={onClose}>
              <S.CloseIcon />
            </S.CloseButton>
          )}
        </S.ModalHeader>
        <S.ModalContent>{children}</S.ModalContent>
      </S.ModalContainer>
    </S.ModalOverlay>
  );
};
