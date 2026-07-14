import type { ReactNode } from "react";
import { useId } from "react";
import { createPortal } from "react-dom";
import * as S from "./Dialog.style";
import { useModalFocus } from "@/shared/lib";

export interface DialogProps {
  title?: string;
  width: number;
  height: number;
  isOpen: boolean;
  onClose?: () => void;
  closeOnOverlayClick?: boolean;
  closeOnEscape?: boolean;
  showClose?: boolean;
  children?: ReactNode;
  gap?: number;
  fullWidth?: boolean;
  fullHeight?: boolean;
  contentOverflow?: "auto" | "hidden";
  ariaLabel?: string;
}

export const Dialog = ({
  title,
  onClose,
  isOpen,
  width,
  height,
  children,
  gap = 0,
  closeOnOverlayClick = true,
  closeOnEscape = true,
  showClose = true,
  fullWidth = false,
  fullHeight = false,
  contentOverflow = "auto",
  ariaLabel,
}: DialogProps) => {
  const titleId = useId();
  const { containerRef: dialogRef, layerRef } = useModalFocus({
    isOpen,
    onClose,
    closeOnEscape,
  });

  if (!isOpen || typeof document === "undefined") return null;

  return createPortal(
    <S.DialogWrapper ref={layerRef} data-modal-layer>
      <S.DialogOverlay onClick={closeOnOverlayClick ? onClose : undefined} aria-hidden />
      <S.DialogContainer
        ref={dialogRef}
        $width={width}
        $height={height}
        $fullWidth={fullWidth}
        $fullHeight={fullHeight}
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? titleId : undefined}
        aria-label={title ? undefined : (ariaLabel ?? "대화상자")}
        tabIndex={-1}
      >
        {title && (
          <S.DialogTitle id={titleId} tabIndex={-1}>
            {title}
          </S.DialogTitle>
        )}
        {showClose && onClose && (
          <S.CloseButton type="button" onClick={onClose} aria-label="닫기" data-modal-close>
            <S.CloseIcon aria-hidden />
          </S.CloseButton>
        )}
        <S.DialogContent $gap={gap} $overflow={contentOverflow}>
          {children}
        </S.DialogContent>
      </S.DialogContainer>
    </S.DialogWrapper>,
    document.body
  );
};
