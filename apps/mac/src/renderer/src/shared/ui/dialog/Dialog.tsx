import { ReactNode } from "react";
import * as S from "./Dialog.style";

export interface DialogProps {
  title?: string;
  width: number;
  height: number;
  isOpen: boolean;
  onClose?: () => void;
  showClose?: boolean;
  children?: ReactNode;
  gap?: number;
  fullWidth?: boolean;
  fullHeight?: boolean;
}

export const Dialog = ({
  title,
  onClose,
  isOpen,
  width,
  height,
  children,
  gap = 0,
  showClose = true,
  fullWidth = false,
  fullHeight = false,
}: DialogProps) => {
  if (!isOpen) return null;

  return (
    <S.DialogWrapper>
      <S.DialogOverlay onClick={onClose} aria-hidden />
      <S.DialogContainer
        $width={width}
        $height={height}
        $fullWidth={fullWidth}
        $fullHeight={fullHeight}
        role="dialog"
        aria-modal="true"
      >
        {title && <S.DialogTitle>{title}</S.DialogTitle>}
        {showClose && onClose && (
          <S.CloseButton type="button" onClick={onClose} aria-label="닫기">
            <S.CloseIcon aria-hidden />
          </S.CloseButton>
        )}
        <S.DialogContent $gap={gap}>{children}</S.DialogContent>
      </S.DialogContainer>
    </S.DialogWrapper>
  );
};
